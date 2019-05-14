const admin = require('firebase-admin');
admin.initializeApp();

// Push the given notification obj to account.notifications
const sgMail = require('@sendgrid/mail');
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
    console.log(email);
    // templateID = String(templateId);
    // email to be replaced with email parameter
    const msgbody = {
        to: email,
        from: 'no-replymealmatchup@email.com',
        subject: 'Delivery Confirmation',
        templateId: templateId,
    };        
    sgMail.send(msgbody)
        .then(() => console.log('email sent succcessfully :)'))
        .catch((error) => {
            console.log(error);
            return;
        });
    return;
};

module.exports = {
    pushNotification: pushNotification,
    notifyRequestUpdate: notifyRequestUpdate,
    emailNotification: emailNotification
};