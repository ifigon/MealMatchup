const nodemailer = require('nodemailer');
const functions = require('firebase-functions');
const EmailTypes = require('./Enums.js').EmailTypes;

// Configure the email transport using the default SMTP transport and the MealMatchup gmail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

/*
 * This utility should be used to send emails instead of sending them directly to users.
 * This allows us to query user email preferences to determine if they should be sent an 
 * email before actually sending it to them.
 *
 * String userId: recipient user account ID as it appears in Firebase
 * Object messageConfig: https://nodemailer.com/message/
 *      Note: email address will be filled based on userId. Passed "To" field is overwritten.
 *
 * EmailTypes emailType (defined in Enums.js)
*/
function sendMail(messageConfig, userId, emailType = EmailTypes.LOW_PRIORITY) {
    functions.database.ref('/accounts/{userId}').once('value')
        .then((snap) => {
            let accountInfo = snap.val();
            sendMailWithAccountInfo(messageConfig, accountInfo, emailType);
        })
        .catch((error) => console.error(error));
}

/*
 * Same as sendMail() but saves us a database call if the caller has already queried 
 * the user account.
 *
 * This utility should be used to send emails instead of sending them directly to users.
 * This allows us to check user email preferences to determine if they should be sent an 
 * email before actually sending it to them.
 *
 * Object accountInfo: user account info stored in /accounts/{accountId}
 * Object messageConfig: https://nodemailer.com/message/
 *      Note: email address will be filled based on Firebase record. 
 *            Passed "To" field is overwritten.
 * EmailTypes emailType (defined in Enums.js)
*/
function sendMailWithAccountInfo(messageConfig, accountInfo, emailType = EmailTypes.LOW_PRIORITY) {
    // check that this user wants to receive this email
    if (!emailPreferencesAllow(accountInfo, emailType)) {
        return;
    }
    
    console.info(accountInfo);
    
    let message = {
        ...messageConfig,
        from: `"MealMatchup" ${gmailEmail}`,
        to: accountInfo.email,
    };

    console.info(message);

    // TODO: remove. This is testing.
    message.to = 'ifigon@outlook.com';

    mailTransport.sendMail(message, (err, info) => {
        console.info(err);
        console.info(info);
    });
}

function emailPreferencesAllow(accountInfo, emailType) {
    // TODO: return (accountInfo.whateverWeCallEmailPrefs allow email type)
    return true;
}

function testFunc() {
    console.info('test func call success!');
}
module.exports = {
    sendMail: sendMail,
    sendMailWithAccountInfo: sendMailWithAccountInfo,
    testFunc: testFunc,
};