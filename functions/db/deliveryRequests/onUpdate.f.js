const functions = require('firebase-functions');
const enums = require('../../Enums.js');
const utils = require('../../Utils.js');

const nt = enums.NotificationType;

/*
 * Listeners based on changes to recurring pickup requests:
 *
 * LISTENER 1: handle RA responses for recurring pickup requests
 * Cases
 *  A) a RA claimed:
 *      Change: 'receivingAgency' changed from requested/pending to claimed
 *      Action: send notifications to DGs
 *  B) all RAs rejected:
 *      Change: 'status' changed from PENDING to REJECTED_RA
 *      Action: send notification back to DA
 *  C) no RA responded in time:
 *      TODO: to be handled by a different scheduled function
 *
 * LISTENER 2: handle DG responses for recurring pickup requests
 * Cases
 *  A) a DG claimed:
 *      Changes:
 *          i. 'delivererGroup' changed from requested/pending to claimed
 *          ii. 'status' changed from PENDING to CONFIRMED
 *      Actions:
 *          i. create delivery objects
 *          ii. send CONFIRMED notifications to DA, RA, DG
 *  B) all DGs rejected:
 *      Change: 'status' changed from PENDING to REJECTED_DG
 *      Action: send notification back to DA and RA
 *  C) no DG respondid in time:
 *      TODO: to be handled by a different scheduled function
 */
exports = module.exports = functions.database
    .ref('/delivery_requests/{umbrellaId}/{pushId}')
    .onUpdate((change, context) => {
        console.info('Recurring request changed: ' + context.params.pushId);
        // TODO remove debug logging
        console.debug(change.before.val());
        console.debug(change.after.val());

        // once a request is not in pending status, it shouldn't be changed anymore
        if (change.before.val().status !== enums.RequestStatus.PENDING) {
            return Promise.reject(
                new Error('Changes were made to a non-pending pickup request.'));
        }

        // get db refs. TODO: set up Admin SDK
        let requestSnap = change.after;
        let request = requestSnap.val();
        const rootRef = change.after.ref.parent.parent.parent;
        const accountsRef = rootRef.child('accounts');
        const daRef = rootRef.child(`donating_agencies/${request.donatingAgency}`);


        // ------------- Listener 1 triggers -------------
        if (raClaimed(change)) {  // case A
            return sendRequestToDGs(accountsRef, requestSnap);
        }

        if (raRejected(change)) {  // case B
            console.info('Listener1: all RA rejected -> send notification to DA');
            return utils.notifyRequestUpdate(
                'DA', daRef, requestSnap.key, nt.RECURRING_PICKUP_REJECTED_RA);
        }
        // --------------- Listener 1 end ---------------


        // ------------- Listener 2 triggers -------------
        if (dgClaimed(change)) {  // case A
            // make sure the deliveries are created before we notify accounts
            return createDeliveries(rootRef, requestSnap)
                .then(() => {
                    console.info('Notifying all parties of the confirmed delivery');

                    let raRef = accountsRef.child(request.receivingAgency.claimed);
                    let dgRef = accountsRef.child(request.delivererGroup.claimed);
                    let accounts = [
                        {label: 'DA', ref: daRef},
                        {label: 'RA', ref: raRef},
                        {label: 'DG', ref: dgRef},
                    ];
                    return multiNotify(accounts, requestSnap.key, nt.RECURRING_PICKUP_CONFIRMED);
                });
        }

        if (dgRejected(change)) {  // case B
            console.info('Listener2: all DGs rejected -> send notifications to DA and RA');

            let raRef = accountsRef.child(request.receivingAgency.claimed);
            let accounts = [
                {label: 'DA', ref: daRef},
                {label: 'RA', ref: raRef},
            ];
            return multiNotify(accounts, requestSnap.key, nt.RECURRING_PICKUP_REJECTED_DG);
        }
        // --------------- Listener 2 end ---------------


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
    let request = requestSnap.val();
    let dgInfo = request.delivererGroup;
    
    console.info('Listener1: a RA claimed -> send notifications to DGs');

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

    let promises = [];
    for (let dg in pending) {
        let dgRef = accountsRef.child(pending[dg]);
        promises.push(
            utils.notifyRequestUpdate(
                'DG', dgRef, requestSnap.key, nt.RECURRING_PICKUP_REQUEST));
    }

    return Promise.all(promises);
}

// ----------------------- End Listener 1 -----------------------

// ----------------------- Listener 2 funcs -----------------------
// case A trigger
function dgClaimed(change) {
    let claimed = !change.before.child('delivererGroup').hasChild('claimed') && 
        change.after.child('delivererGroup').hasChild('claimed');
    let confirmed = change.before.val().status === enums.RequestStatus.PENDING &&
        change.after.val().status === enums.RequestStatus.CONFIRMED;
    return claimed && confirmed;
}

// case B trigger
function dgRejected(change) {
    return change.before.val().status === enums.RequestStatus.PENDING &&
        change.after.val().status === enums.RequestStatus.REJECTED_DG;
}

// case A handler
function createDeliveries(rootRef, requestSnap) {
    console.info('Listener2: DG claimed -> create delivery objects');
    let request = requestSnap.val();
    let dsRef = rootRef.child(`deliveries/${request.umbrella}`);

    let step = -1;  // num days to step by
    if (request.repeats === enums.RequestRepeatType.WEEKLY) {
        step = 7;
    } else if (request.repeats === enums.RequestRepeatType.BIWEEKLY) {
        step = 14;
    } else {
        return Promise.reject(
            new Error('Repeats other when weekly and biweekly are not supported yet'));
    }

    // TODO: calc duration and fill out common fields in delivery
    let duration = moment();
    let delivery = {};

    let promises = [];
    let cur = moment(request.startTimestamp);
    while (cur.valueOf() <= request.endTimestamp) {
        // TODO update delivery

        promises.push(dsRef.push(delivery));

        cur.add(step, 'days');
    }

    return Promise.resolve();
}
// ----------------------- End Listener 2 -----------------------

function multiNotify(accounts, reqKey, notifType) {
    let promises = [];
    for (let acc in accounts) {
        promises.push(
            utils.notifyRequestUpdate(acc.label, acc.ref, reqKey, notifType));
    }
    return Promise.all(promises);
}
