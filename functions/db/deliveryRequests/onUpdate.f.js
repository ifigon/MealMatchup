const functions = require('firebase-functions');
const enums = require('../../Enums.js');

/*
 * Listener 1
 * When the "receivingAgency" field of a DeliveryRequest changes:
 *  1. requested/pending -> claimed:
 *      send notifications to appropriate DGs
 *  2. pending list changed:
 *      do nothing
 *  No other changes should be allowed.
 *
 * Listener 2
 * When the "delivererGroup" field of a DeliveryRequest changes:
 *  TODO
 */
exports = module.exports = functions.database
    .ref('/delivery_requests/{umbrellaId}/{pushId}')
    .onUpdate((change, context) => {
        console.info('Recurring request changed: ' + context.params.pushId);

        if (change.after.val().status !== enums.RequestStatus.PENDING) {
            return Promise.reject(
                new Error('Request should still have pending status upon changes.'));
        }

        const requestRef = change.after.ref;
        const accountsRef = requestRef.parent.parent.parent.child('accounts');

        // Listener 1
        if (!change.before.child('receivingAgency').hasChild('claimed') && 
            change.after.child('receivingAgency').hasChild('claimed')) {

            console.info('Listener 1 triggered: a RA claimed -> send notifications to DGs');
            return sendRequestToDGs(change.after, accountsRef);
        }

        console.info('Nothing was triggered.');
        return null;
    });

// Main function for Listener 1
function sendRequestToDGs(requestSnap, accountsRef) {
    var requestKey = requestSnap.key;
    var request = requestSnap.val();
    var dgInfo = request.delivererGroup;

    if (dgInfo.claimed) {
        return Promise.reject(
            new Error('DG shouldn\'t be confirmed upon request.'));
    }

    if (!dgInfo.requested && !dgInfo.pending) {
        return Promise.reject(new Error('No DGs in the request to notify.'));
    }

    // create pickup request notification
    var notification = {
        type: enums.NotificationType.RECURRING_PICKUP_REQUEST,
        content: requestKey
    };

    if (dgInfo.requested) {
        console.info('A specific DG requested: ' + dgInfo.requested);
        return pushNotification(accountsRef, dgInfo.requested, notification, 'DG');
    }

    console.info('No specific DG requested, ' + dgInfo.pending.length + ' pending DGs');

    var promises = [];
    for (let dg in dgInfo.pending) {
        promises.push(
            pushNotification(accountsRef, dgInfo.pending[dg], notification, 'DG'));
    }

    return Promise.all(promises);
}

function pushNotification(accountsRef, accountId, notification, label) {
    var promise = accountsRef.child(accountId).child('notifications').push(notification);
    console.info('Notified ' + label + ' "' + accountId + '": '
        + JSON.stringify(notification));
    return promise;
}