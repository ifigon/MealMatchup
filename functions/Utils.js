const admin = require('firebase-admin');
admin.initializeApp();

// Push the given notification obj to account.notifications
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const enums = require('./Enums.js');

var pushNotification = function (label, acctRef, notification, templateId) {
    let promise = acctRef.child('notifications').push(notification);

    console.info('Notified ' + label + ' "' + acctRef.key + '": ', notification);
    var path = ('accounts/' + acctRef.key + '/email');
    console.log(path);
    // If it is a donating agency, have to first get the primary contact from firebase
    if(label === 'DA') {
        primaryContactPath = ('donating_agencies/' + acctRef.key + '/primaryContact');
        // Get the primary contact account ID from firebase
        admin.database().ref(primaryContactPath).once('value').then(snapshot => {
            // Set path to primary contact email
            path = ('accounts/' + snapshot.val() + '/email');
            // Get the donation agency email notification settings
            let daSettingPath = ('accounts/' + snapshot.val() + '/settings/' + templateId);
            admin.database().ref(daSettingPath).once('value').then(snapshot => {
                // If the value is true (they want an email notification, then send an email 
                // by calling emailNotification passing in the email address and template
                if(snapshot.val()) { 
                    admin.database().ref(path).once('value').then(snapshot => {
                        return emailNotification(snapshot.val(), templateId);
                    })
                        .catch(err => {
                            console.log(err);
                        });  
                    return promise;
                } else {
                    console.log('the party does not want to receive notification for this');
                    return 'no email wanted';
                }
            })
                .catch(err => {
                    console.log(err);
                });  
            return promise;
        })
            .catch(err => {
                console.log(err);
            });  
        return promise;
    }
    // Get the path to the email setting (true of false if they want notifications)
    let emailSettingPath = ('accounts/' + acctRef.key + '/settings/' + templateId);
    // Get the value of if they want an email notification or not
    admin.database().ref(emailSettingPath).once('value').then(snapshot => {
        // If the value is true (they want an email notification, then send an email 
        // by calling emailNotification passing in the email address and template
        if(snapshot.val()) {
            admin.database().ref(path).once('value').then(snapshot => {
                return emailNotification(snapshot.val(), templateId);
            })
                .catch(err => {
                    console.log(err);
                });  
            return promise;
        } else {
            console.log('the party does not want to receive notification for this');
            return 'no email wanted';
        }
    })
        .catch(err => {
            console.log(err);
        });  
    return promise;

};

// Create a notification obj for the given pickup request and notification
// type and pushes it to the account
var notifyRequestUpdate = function (label, acctRef, requestPath, notifType, templateId) {
    let notification = {
        type: notifType,
        content: requestPath
    };
    return pushNotification(label, acctRef, notification, templateId);
};

// Takes in the email contact to be emailed and also which sendgrid email template to use
// Returns an email message object based on what emailContent is passed.
var emailNotification = function (email, templateId) {
    // templateID = String(templateId);
    // email to be replaced with email parameter
    let gmail = functions.config().email_login.email;
    let password = functions.config().email_login.password;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: gmail,
            pass: password,
        }
    });
        
    var mailOptions = selectTemplates(templateId, email);       
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    return;
};

var selectTemplates = function (templateId, email) {
    console.log(email);
    let email_content = {};
    // template IDs are the same as the fields in the firebase DB so that they can be access easily
    if(templateId === 'confirmationNotification') {
        email_content = {
            from: 'noreplymealmatchup.com',
            to: email,
            subject: enums.EmailTemplate.EMAIL_ALL.subject,
            html: enums.EmailTemplate.EMAIL_ALL.html
        };
    } else if(templateId === 'raUnavailableNotification') {
        email_content = {
            from: 'noreplymealmatchup.com',
            to: email,
            subject: enums.EmailTemplate.NO_AVAILABLE_RAS.subject,
            html: enums.EmailTemplate.NO_AVAILABLE_RAS.html
        };
    } else if(templateId === 'raSpecifiedNotification') {
        email_content = {
            from: 'noreplymealmatchup.com', 
            to: email,
            subject: enums.EmailTemplate.SPECIFIED_RA.subject,
            html: enums.EmailTemplate.SPECIFIED_RA.html
        };
        
    } else if(templateId === 'dgUnavailableNotification') {
        email_content = {
            from: 'noreplymealmatchup.com',
            to: email,
            subject: enums.EmailTemplate.DG_REJECTION.subject,
            html: enums.EmailTemplate.DG_REJECTION.html
        };
    } else if(templateId === 'raUnspecifiedNotification') {  
        email_content = {
            from: 'noreplymealmatchup.com',
            to: email,
            subject: enums.EmailTemplate.EMAIL_RAS.subject,
            html: enums.EmailTemplate.EMAIL_RAS.html
        };
    } else if(templateId === 'dgRequestNotification') {  
        email_content = {
            from: 'noreplymealmatchup.com',
            to: email,
            subject: enums.EmailTemplate.DG_REQUEST.subject,
            html: enums.EmailTemplate.DG_REQUEST.html
        };
    }
    return email_content;
};
module.exports = {
    pushNotification: pushNotification,
    notifyRequestUpdate: notifyRequestUpdate,
    emailNotification: emailNotification
};