import firebase from '../../FirebaseConfig.js';
import { NotificationType } from '../../Enums.js';

/* 
 * This is a backend file that handles recurring pickup requests.
 *
 * Recurring Pickup Request General Flow:
 *   1. DA requests a recurring pickup
 *   2. Send notifications to RAs -> a RA claims
 *   3. Send notifications to DGs -> a DG claims
 *   4. Send confirm notification back to DA.
 *   5. Create the actual Delivery objects.
 *
 * Cases/Scenarios:
 * Receiving Agencies
 *   1. DA requested a specific RA:
 *      a. Send notification to the RA regardless of availabilities
 *         i. If RA claims, continue down the flow.
 *         ii. If RA rejects, send "request failed" back to DA
 *   2. DA didn't specify a RA:
 *      a. Send notification to all RAs with matching availabilities
 *         i. If one RA claims, continue down the flow.
 *         ii. If all RA rejects, send "request failed" back to DA
 *         iii. If no one RA claims until X day before start date, send "request expired" back to DA 
 *
 * Deliverer Groups
 *   After a RA claims, the cases are the same as RA's above (without availabilities aspect).
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
    var raStatus = request.receivingAgency;
    if (!raStatus.accepted) {
        // create the notification obj
        var notification = {
            type: NotificationType.RECURRING_PICKUP_REQUEST,
            content: requestSnap.key
        };

        // If a specific RA was requested, send the notification regardless of availabilities
        var forceNotify = (raStatus.pending.length == 1);
        console.log("forceNotify=" + forceNotify);

        // Add notification to all available RAs' accounts in the pending list
        for (let i = 0; i < raStatus.pending.length; i++) {
            accountsRef.child(raStatus.pending[i]).once('value').then(function (raSnap) {
                if (forceNotify || isAvailable(raSnap.val(), request)) {
                    notifyAccount(raSnap.val(), notification);

                    console.log("notified " + raSnap.key);
                }
            });
        }

    } else {
        console.log("ERROR: RA shouldn't be confirmed upon request.");
    }
});



/************************************************************************
                            Helper Functions
*************************************************************************/

// Common Helper function
// Add the given notification to the given account if it doesn't exist already
function notifyAccount(account, notification) {
    // TODO
    console.log("Add notification");
    console.log(account);
    console.log(notification);
}

// Helper function for Listener 1
// Check if the given RA is available for the pickup request
function isAvailable(ra, request) {
    // TODO
    return true;
}
