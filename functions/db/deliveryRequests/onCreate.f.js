const functions = require('firebase-functions');
// TODO set up admin
// TODO import Enums..
const enums = require('../../../src/Enums.js');

exports = module.exports = functions.database.ref('/delivery_requests/{pushId}').onCreate(event => {
    const requestKey = event.params.pushId;
    const request = event.data.val();
    console.info('New recurring request added: ' + requestKey);
    console.info(enums.DateTimeFormat.DATE)
    
    // var raStatus = request.receivingAgency;
    // if (raStatus.accepted) {
    //     console.error('ERROR: RA shouldn\'t be confirmed upon request.');
    
    // } else {
    //     // create the notification obj
    //     var notification = {
    //         type: NotificationType.RECURRING_PICKUP_REQUEST,
    //         content: requestKey
    //     };

    //     // If a specific RA was requested, send the notification regardless of availabilities
    //     var forceNotify = (raStatus.pending.length === 1);

    //     // Add notification to all available RAs' accounts in the pending list
    //     for (let key in raStatus.pending) {

    //     }
    // }

    return request;
});