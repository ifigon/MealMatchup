const functions = require('firebase-functions');
const enums = require('../../Enums.js');
const utils = require('../../Utils.js');

/*
 * Listeners based on changes to recurring pickup requests:
 *
 * Listener 1: handle RA responses for recurring pickup requests
 * Cases:
 *  A) a RA claimed:
 *      Change: 'receivingAgency' changed from requested/pending to claimed
 *      Action: send notifications to DGs
 *  B) all RAs rejected:
 *      Change: 'status' changed from PENDING to REJECTED_RA
 *      Action: send notification back to DA
 *  C) no RA responded in time:
 *      TODO: to be handled by a different scheduled function
 *
 * Listener 2: handle DG responses for recurring pickup requests
 * TODO
 */
exports = module.exports = functions.database
    .ref('/delivery_requests/{umbrellaId}/{pushId}')
    .onUpdate((change, context) => {
        console.info('Recurring request changed: ' + context.params.pushId);



        console.info(context);
        console.info(change.before.val());
        console.info(change.after.val());



        // once a request is not in pending status, it shouldn't be changed anymore
        if (change.before.val().status !== enums.RequestStatus.PENDING) {
            return Promise.reject(
                new Error('Changes were made to a non-pending pickup request.'));
        }

        // get db refs. TODO: set up Admin SDK
        const requestRef = change.after.ref;
        const accountsRef = requestRef.parent.parent.parent.child('accounts');
        const dasRef = accountsRef.parent.child('donating_agencies');

        // Listener 1 triggers
        if (raClaimed(change)) {
            // case A
            return sendRequestToDGs(accountsRef, change.after);
        } else if (raRejected(change)) {
            // case B
            return utils.notifyRequestDA(dasRef, change.after, 
                enums.NotificationType.RECURRING_PICKUP_REJECTED_RA);
        }

        // TODO: Listener 2

        console.info('Nothing was triggered.');
        return null;
    });

// ----------------------- Listener 1 funcs -----------------------
// case A trigger
function raClaimed(change) {
    return !change.before.child('receivingAgency').hasChild('claimed') && 
        change.after.child('receivingAgency').hasChild('claimed');
}

// case B trigger
function raRejected(change) {
    return change.before.val().status === enums.RequestStatus.PENDING &&
        change.after.val().status === enums.RequestStatus.REJECTED_RA;
}

// case A handler
function sendRequestToDGs(accountsRef, requestSnap) {
    let requestKey = requestSnap.key;
    let request = requestSnap.val();
    let dgInfo = request.delivererGroup;
    
    console.info('Listener 1 triggered: a RA claimed -> send notifications to DGs');

    if (request.status !== enums.RequestStatus.PENDING) {
        return Promise.reject(
            new Error('Request should still have pending status when a RA claimed.'));
    }

    if (dgInfo.claimed) {
        return Promise.reject(
            new Error('DG shouldn\'t be confirmed upon request.'));
    }

    if (!dgInfo.requested && !dgInfo.pending) {
        return Promise.reject(new Error('No DGs in the request to notify.'));
    }

    let pending = [];
    if (dgInfo.requested) {
        pending.push(dgInfo.requested);
        console.info('A specific DG requested: ' + dgInfo.requested);
    } else {
        pending = dgInfo.pending;
        console.info('No specific DG requested, ' + pending.length + ' pending DGs');
    }

    let notification = {
        type: enums.NotificationType.RECURRING_PICKUP_REQUEST,
        content: requestKey
    };
    let promises = [];
    for (let dg in pending) {
        let dgRef = accountsRef.child(pending[dg]);
        promises.push(utils.pushNotification(dgRef, notification, 'DG'));
    }

    return Promise.all(promises);
}

// case B handler: utils.notifyRequestDA
// ----------------------- End Listener 1 -----------------------
