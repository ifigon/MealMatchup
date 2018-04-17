const functions = require('firebase-functions');
const enums = require('../../Enums.js');
const moment = require('moment-timezone');
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
 *      Change: 'receivingAgency' changed from having requested/pending to nonexistent
 *      Action: 
 *          i. set 'status' to REJECTED_RA
 *          ii. send notification back to DA
 *  C) no RA responded in time:
 *      TODO: to be handled by a different scheduled function
 *
 * LISTENER 2: handle DG responses for recurring pickup requests
 * Cases
 *  A) a DG claimed:
 *      Changes: 'delivererGroup' changed from requested/pending to claimed
 *      Actions:
 *          i. create delivery objects
 *          ii. update request's 'spawnedDeliveries' and 'status'
 *          iii. send CONFIRMED notifications to DA, RA, DG
 *  B) all DGs rejected:
 *      Change: 'delivererGroup' changed from having requested/pending to nonexistent
 *      Action: 
 *          i. set 'status' to REJECTED_DG
 *          ii. send notification back to DA and RA
 *  C) no DG respondid in time:
 *      TODO: to be handled by a different scheduled function
 */
exports = module.exports = functions.database
    .ref('/delivery_requests/{umbrellaId}/{pushId}')
    .onUpdate((change, context) => {
        console.info('Recurring request changed: ' + context.params.pushId);

        // once a request is not in pending status, it shouldn't be changed anymore
        // just a sanity check
        if (change.before.val().status !== enums.RequestStatus.PENDING) {
            return Promise.reject(
                new Error('Changes were made to a non-pending pickup request.'));
        }

        let requestSnap = change.after;
        let request = requestSnap.val();

        // get db refs. TODO: set up Admin SDK
        const rootRef = change.after.ref.parent.parent.parent;
        const accountsRef = rootRef.child('accounts');
        const daRef = rootRef.child(`donating_agencies/${request.donatingAgency}`);

        // ------------- Listener 1 triggers -------------
        if (wasClaimedBy('receivingAgency', change)) {  // case A
            return sendRequestToDGs(accountsRef, requestSnap);
        }

        if (wasRejectedByAll('receivingAgency', change)) {  // case B
            return handleRejection(
                enums.RequestStatus.REJECTED_RA, requestSnap, accountsRef, daRef);
        }
        // --------------- Listener 1 end ---------------


        // ------------- Listener 2 triggers -------------
        if (wasClaimedBy('delivererGroup', change)) {  // case A
            // make sure the deliveries are created before we notify accounts
            return createDeliveries(rootRef, requestSnap)
                .then(() => {
                    return notifyConfirmAll(requestSnap, accountsRef, daRef);
                });
        }

        if (wasRejectedByAll('delivererGroup', change)) {  // case B
            return handleRejection(
                enums.RequestStatus.REJECTED_DG, requestSnap, accountsRef, daRef);
        }
        // --------------- Listener 2 end ---------------


        console.info('Nothing was triggered.');
        return null;
    });

// ----------------------- Common triggers & handlers -----------------------
// Listener 1 & 2 case A trigger
function wasClaimedBy(agencyType, change) {
    return !change.before.child(agencyType).hasChild('claimed') && 
        change.after.child(agencyType).hasChild('claimed');
}

// Listener 1 & 2 case B trigger
function wasRejectedByAll(agencyType, change) {
    return change.before.hasChild(agencyType) &&
        (change.before.child(agencyType).hasChild('requested') ||
            change.before.child(agencyType).hasChild('pending')) &&
        !change.after.hasChild(agencyType);
}

// Listener 1 & 2 case B handler
function handleRejection(rejectType, requestSnap, accountsRef, daRef) {
    let accounts = [ { label: 'DA', ref: daRef } ];
    let notifType = null;

    if (rejectType === enums.RequestStatus.REJECTED_RA) {
        console.info('Listener1: all RA rejected -> update status and notify DA');

        notifType = nt.RECURRING_PICKUP_REJECTED_RA;
    } else {
        console.info('Listener2: all DGs rejected -> update status and send notify DA and RA');

        let raRef = accountsRef.child(requestSnap.val().receivingAgency.claimed);
        accounts.push({ label: 'RA', ref: raRef });
        notifType = nt.RECURRING_PICKUP_REJECTED_DG;
    }

    let promises = [];
    promises.push(
        requestSnap.ref.child('status').set(rejectType));
    promises.push(multiNotify(accounts, requestSnap.key, notifType));
    return Promise.all(promises);
}
// ----------------------- End Common -----------------------

// ----------------------- Listener 1 handlers -----------------------
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

    return Promise.all(pending.map(dgId => utils.notifyRequestUpdate(
        'DG', accountsRef.child(dgId), requestSnap.key, nt.RECURRING_PICKUP_REQUEST)));
}
// ----------------------- End Listener 1 -----------------------

// ----------------------- Listener 2 handlers -----------------------
// case A handler 1
function createDeliveries(rootRef, requestSnap) {
    const TIME = enums.InputFormat.TIME;
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

    let duration = (
        moment(moment.tz(request.endTimestamp, request.timezone).format(TIME), TIME)
        - moment(moment.tz(request.startTimestamp, request.timezone).format(TIME), TIME)
    ).valueOf();

    let delivery = {
        status: enums.DeliveryStatus.SCHEDULED,
        timezone: request.timezone,
        isEmergency: false,
        spawningDeliveryRequest: requestSnap.key,
        donatingAgency: request.donatingAgency,
        daContact: request.primaryContact,
        receivingAgency: request.receivingAgency.claimed,
        raContact: request.raContact,
        delivererGroup: request.delivererGroup.claimed,
        notes: request.notes,
    };

    let promises = [];
    let spawnedDeliveries = [];
    let cur = moment(request.startTimestamp);
    while (cur.valueOf() <= request.endTimestamp) {
        delivery['startTimestamp'] = cur.valueOf();
        delivery['endTimestamp'] = cur.valueOf() + duration;

        // push delivery to db
        let dRef = dsRef.push(delivery);
        spawnedDeliveries.push(dRef.key);
        promises.push(dRef);

        cur.add(step, 'days');
    }

    // update request
    let updates = { 
        status: enums.RequestStatus.CONFIRMED, 
        spawnedDeliveries: spawnedDeliveries 
    };
    promises.push(requestSnap.ref.update(updates));

    console.info('Created ' + spawnedDeliveries.length + ' deliveries');
    return Promise.all(promises);
}

// case A handler 2
function notifyConfirmAll(requestSnap, accountsRef, daRef) {
    console.info('Notifying all parties of the confirmed delivery');

    let raRef = accountsRef.child(requestSnap.val().receivingAgency.claimed);
    let dgRef = accountsRef.child(requestSnap.val().delivererGroup.claimed);
    let accounts = [
        {label: 'DA', ref: daRef},
        {label: 'RA', ref: raRef},
        {label: 'DG', ref: dgRef},
    ];
    return multiNotify(accounts, requestSnap.key, nt.RECURRING_PICKUP_CONFIRMED);
}
// ----------------------- End Listener 2 -----------------------


// ----------------------- Utils -----------------------
function multiNotify(accounts, reqKey, notifType) {
    return Promise.all(accounts.map((acct) => {
        return utils.notifyRequestUpdate(acct.label, acct.ref, reqKey, notifType);
    }));
}
