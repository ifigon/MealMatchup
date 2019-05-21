const admin = require('firebase-admin');
admin.initializeApp();
// const sgMail = require('@sendgrid/mail');
// const sgMail = require('@sendgrid/mail');
// Push the given notification obj to account.notifications
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');


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
    if(templateId === 'email_all') {
        email_content = {
            from: 'noreplymealmatchup.com',
            to: email,
            subject: 'Meal Matchup Delivery Confirmation',
            html:'<html> <head> <title></title> </head> <body><p>Hello,</p><div> </div><span>The delivery that you are a part of has been confirmed by all 3 parties. To see the updated status of the delivery, please login here: </span><a href="https://www.mealmatchup.org/">https://www.mealmatchup.org/</a><span>.</span><p>Thank you!</p><p>Meal Matchup</p></body></html>'
        };
    } else if(templateId === 'no_available_RAs') {
        email_content = {
            from: 'noreplymealmatchup.com',
            to: email,
            subject: 'Meal Matchup Delivery Cancelation',
            html:'<html> <head> <title></title> </head> <body><p>Hello,</p><div> </div><span>All receiving agencies are unable at the time requested for pickup. Please login here: </span><a href="https://www.mealmatchup.org/">https://www.mealmatchup.org/</a><span> if you would like to see more or schedule for a different pick-up date/time.</span><p>Thank you!</p><p>Meal Matchup</p></body></html>'
        };
    } else if(templateId === 'specified_RA') {
        email_content = {
            from: 'noreplymealmatchup.com',
            to: email,
            subject: 'Meal Matchup Donation Request',
            html:'<html> <head> <title></title> </head> <body><p>Hello,</p><div> </div><span>A donation agency has specified you to receive their donation agency. Please login at </span><a href="https://www.mealmatchup.org/">https://www.mealmatchup.org/</a><span> to either confirm or deny this delivery request.</span><p>Thank you!</p><p>Meal Matchup</p></body></html>'
        };
    } else if(templateId === 'DG_rejection') {
        email_content = {
            from: 'noreplymealmatchup.com',
            to: email,
            subject: 'Meal Matchup Delivery Cancelation',
            html:'<html> <head> <title></title> </head> <body><p>Hello,</p><div> </div><span>A delivery group is unable to make the delivery at the requested time. You can see more by going to the notification by logging in at </span><a href="https://www.mealmatchup.org/">https://www.mealmatchup.org/</a><span>.</span><p>Thank you!</p><p>Meal Matchup</p></body></html>'
        };
    } else if(templateId === 'email_RAs') {  
        email_content = {
            from: 'noreplymealmatchup.com',
            to: email,
            subject: 'Meal Matchup New Delivery Request',
            html:'<html> <head> <title></title> </head> <body><p>Hello,</p><div> </div><span>A donation agency just requested your availability for an upcoming donation. Please login at </span><a href="https://www.mealmatchup.org/">https://www.mealmatchup.org/</a><span> to reject or accept the donation.</span><p>Thank you!</p><p>Meal Matchup</p></body></html>'
        };
    }
    return email_content;
};
module.exports = {
    pushNotification: pushNotification,
    notifyRequestUpdate: notifyRequestUpdate,
    emailNotification: emailNotification
};