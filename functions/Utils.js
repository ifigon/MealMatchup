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
    // If it is a donating agency, have to first get the primary contact from firebase
    if(label === 'DA') {
        primaryContactPath = ('donating_agencies/' + acctRef.key + '/primaryContact');
        // Get the primary contact account ID from firebase
        admin.database().ref(primaryContactPath).once('value').then(snapshot => {
            // Set path to primary contact email
            path = ('accounts/' + snapshot.val() + '/email');
            // Send an email with updated path
            admin.database().ref(path).once('value').then(snapshot => {
                return emailNotification(snapshot.val(), templateId);
            })
                .catch(err => {
                    console.log(err);
                });  
            return path;
        })
            .catch(err => {
                console.log(err);
            });  
        return promise;
    }

    admin.database().ref(path).once('value').then(snapshot => {
        return emailNotification(snapshot.val(), templateId);
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
    if(templateId === 'email_all') {
        email_content = {
            from: 'noreplymealmatchup.com',
            to: email,
            subject: enums.EmailTemplate.EMAIL_ALL.subject,
            html: enums.EmailTemplate.EMAIL_ALL.html
        };
    } else if(templateId === 'no_available_RAs') {
        email_content = {
            from: 'noreplymealmatchup.com',
            to: email,
            subject: enums.EmailTemplate.NO_AVAILABLE_RAS.subject,
            html: enums.EmailTemplate.NO_AVAILABLE_RAS.html
        };
    } else if(templateId === 'specified_RA') {
        email_content = {
            from: 'noreplymealmatchup.com', 
            to: email,
            subject: enums.EmailTemplate.SPECIFIED_RA.subject,
            html: enums.EmailTemplate.SPECIFIED_RA.html
        };
        
    } else if(templateId === 'DG_rejection') {
        email_content = {
            from: 'noreplymealmatchup.com',
            to: email,
            subject: enums.EmailTemplate.DG_REJECTION.subject,
            html: enums.EmailTemplate.DG_REJECTION.html
        };
    } else if(templateId === 'email_RAs') {  
        email_content = {
            from: 'noreplymealmatchup.com',
            to: email,
            subject: enums.EmailTemplate.EMAIL_RAS.subject,
            html: enums.EmailTemplate.EMAIL_RAS.html
        };
    } else if(templateId === 'dg_request') {  
        email_content = {
            from: 'noreplymealmatchup.com',
            to: email,
            subject: enums.EmailTemplate.DG_REJECTION.subject,
            html: enums.EmailTemplate.DG_REJECTION.html
        };
    }
    return email_content;
};
module.exports = {
    pushNotification: pushNotification,
    notifyRequestUpdate: notifyRequestUpdate,
    emailNotification: emailNotification
};