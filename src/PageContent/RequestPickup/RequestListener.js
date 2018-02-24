import firebase from '../../FirebaseConfig.js';
import { NotificationType } from '../../Enums.js';

/* 
 * This is a backend file that handles recurring pickup requests.
 *
 * Recurring Pickup Request Flow:
 *   1. DA requests a recurring pickup -> DeliveryRequest added to 'delivery_requests'
 *   2. Send notifications to RAs -> a RA claims
 *   3. Send notifications to DGs -> a DG claims
 *   4. Send confirm notification back to DA.
 *   5. Create the actual Delivery objects.
 */


var accountsRef = firebase.database().ref('accounts');
var requestsRef = firebase.database().ref('delivery_requests');


// LISTENER 1: new recurring pickup requests
requestsRef.on('child_added', function(requestSnap) {
    // TODO delete if startDate is in the past?
    var request = requestSnap.val();

    console.log(requestSnap.key);
    console.log(request);

    // check receiving agency
    var ra = request.receivingAgency;
    if (!ra.confirmed) {
        // create the notification obj
        var notification = {
            type: NotificationType.RECURRING_PICKUP_REQUEST,
            content: requestSnap.key
        };

        if (ra.uid) {  // a specific RA was requested, send the notification regardless
            // of its availabilities
            accountsRef.child(ra.uid).once('value').then(function (raSnap) {
                addNotification(raSnap.val(), notification);
            });

            console.log("send to " + ra.uid);

        } else {  // send the notification to all RAs with matching availabilities
            // grab all RAs in this school
            var raListRef = accountsRef.child(request.school).child('receivingAgencies');
            raListRef.once('value').then(function (listSnap) {

                var raList = listSnap.val();
                for (let i = 0; i < raList.length; i++) {
                    accountsRef.child(raList[i]).once('value').then(function (raSnap) {
                        if (isAvailable(raSnap.val(), request)) {
                            addNotification(raSnap.val(), notification);
                        }
                    });
                }
            });

            console.log("send to all");
        }

    } else {
        console.log("ERROR: RA shouldn't be confirmed upon request.");
    }
});



/************************************************************************
                            Helper Functions
*************************************************************************/

// Helper function for Listener 1
// Add the given notification to the given RA if it doesn't exist
function addNotification(ra, notification) {
    // TODO
    console.log("Add notification");
    console.log(ra);
    console.log(notification);
}

// Helper function for Listener 1
// Check if the given RA is available for the pickup request
function isAvailable(ra, request) {
    // TODO
    return true;
}
