// Cloud functions for Firebase SDK to create cloud functions and setup triggers
const functions = require('firebase-functions');
const enums = require('../../Enums.js');

// Firebase Admin SDK to access Firebase Realtime Database
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = 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
sgMail.setApiKey(SENDGRID_API_KEY);

// Everytime a delivery gets, trigger this to send an email.
// exports.sendEmail = functions.firestore
exports = module.exports = functions.database

    .document('deliveries').onCreate(event => {
        const deliverer = event.params.delivererGroup
        const donatingAgency = event.params.daContact
        const receivingAgency = event.params.receivingAgency
        // Checking to make sure I grabbed right things
        console.log(deliverer)
        console.log(donatingAgency)
        console.log(receivingAgency)
        let userId = firebase.auth().currentUser.uid
        if(userId) {
            firebase.database().ref("accounts")
            delivererRef = ("accounts/" + deliverer + "/email")
            delivererEmail = firebase.database().ref(delivererRef)
            donatingAgencyRef = ("accounts/" + donatingAgency + "/email")
            donatingAgencyEmail = firebase.database().ref(donatingAgencyRef)
            RaRef = "accounts/" + receivingAgency + "/email"
            RaEmail = firebase.database().ref(RaRef)
            console.log(delivererEmail)
            console.log(donatingAgencyRef)
            console.log(RaRef)
            // Email content (just test content for now, will add in actual email content when test works correctly)
            const msgbody = {
                to: "lucaswoo15@gmail.com",
                from: "lucaswoo23@yahoo.com",
                subject: "Delivery Confirmation",
                text: "test test #test",
                // Firebase data sent to sendgrid to use in email
                // substitutionWrappers: ['{{', '}}'],
                // substitutions: {
                //     Name: firebase.database().ref("accounts/" + deliverer + "/name"),
                //     Notes: EventSource.params.notes,                    
                // }
            }
        }
    // Sends the message object
    return sgMail.send(msgbody)
    })
    // logs if the email is sent or not.
    .then(() => console.log("email sent!"))
    .catch((err) => console.log(err))


