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
 *  C) no DG responded in time:
 *      TODO: to be handled by a different scheduled function
 */
exports = module.exports = functions.database
    .ref('/delivery_requests/{umbrellaId}/{daId}/{pushId}')
    .onUpdate((change, context) => {
        console.info('Recurring request changed: ' + context.params.pushId);

        // once a request is not in pending status, it shouldn't be changed anymore
        // just a sanity check
        if (change.before.val().status !== enums.RequestStatus.PENDING) {
            return Promise.reject(
                new Error('Changes were made to a non-pending pickup request.'));
        }

        const requestPath = context.params.daId + '/' + context.params.pushId;
        let requestSnap = change.after;
        let request = requestSnap.val();

        // get db refs. TODO: set up Admin SDK
        const rootRef = change.after.ref.parent.parent.parent.parent;
        const accountsRef = rootRef.child('accounts');
        const daRef = rootRef.child(`donating_agencies/${request.donatingAgency}`);

        // ------------- Listener 1 triggers -------------
        if (wasClaimedBy('receivingAgency', change)) {  // case A
            return sendRequestToDGs(accountsRef, requestSnap, requestPath);
        }

        if (wasRejectedByAll('receivingAgency', change)) {  // case B
            return handleRejection(enums.RequestStatus.REJECTED_RA, 
                requestSnap, accountsRef, daRef, requestPath);
        }
        // --------------- Listener 1 end ---------------


        // ------------- Listener 2 triggers -------------
        if (wasClaimedBy('delivererGroup', change)) {  // case A
            // make sure the deliveries are created before we notify accounts
            return createDeliveries(rootRef, requestSnap)
                .then(() => {
                    return notifyConfirmAll(request, accountsRef, daRef, requestPath);
                });
        }

        if (wasRejectedByAll('delivererGroup', change)) {  // case B
            return handleRejection(enums.RequestStatus.REJECTED_DG, 
                requestSnap, accountsRef, daRef, requestPath);
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
        !change.after.hasChild(agencyType) &&
        // make sure it's a result of client's change, not our own server's
        change.after.child('status').val() === enums.RequestStatus.PENDING;
}

// Listener 1 & 2 case B handler
function handleRejection(rejectType, requestSnap, accountsRef, daRef, requestPath) {
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

    let promises = [
        requestSnap.ref.child('status').set(rejectType),
        multiNotify(accounts, requestPath, notifType),
    ];
    return Promise.all(promises);
}
// ----------------------- End Common -----------------------

// ----------------------- Listener 1 handlers -----------------------
// case A handler
function sendRequestToDGs(accountsRef, requestSnap, requestPath) {
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
        'DG', accountsRef.child(dgId), requestPath, nt.RECURRING_PICKUP_REQUEST)));
}
// ----------------------- End Listener 1 -----------------------

// ----------------------- Listener 2 handlers -----------------------
// case A handler 1
function createDeliveries(rootRef, requestSnap) {
    console.info('Listener2: DG claimed -> create delivery objects');
    const TIME = enums.InputFormat.TIME;
    const request = requestSnap.val();
    const dsRef = rootRef.child('deliveries');
    const dIndicesRef = rootRef.child(`delivery_indices/${request.umbrella}`);

    // calculate num days to step by
    let step = -1;
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

    // create delivery obj with common fields
    let dTemplate = {
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
    let dIds = {};  // {dId: timestamp}
    let cur = moment(request.startTimestamp);
    while (cur.valueOf() <= request.endTimestamp) {
        dTemplate['startTimestamp'] = cur.valueOf();
        dTemplate['endTimestamp'] = cur.valueOf() + duration;

        // push delivery to db
        let dRef = dsRef.push(dTemplate);
        promises.push(dRef);
        dIds[dRef.key] = dTemplate.startTimestamp;

        cur.add(step, 'days');
    }

    // update request
    let reqUpdates = { 
        status: enums.RequestStatus.CONFIRMED, 
        spawnedDeliveries: Object.keys(dIds)
    };
    promises.push(requestSnap.ref.update(reqUpdates));

    // update delivery index for each agency
    promises.push(updateDeliveryIndices(dIndicesRef, dTemplate, dIds));

    console.info('Created ' + Object.keys(dIds).length + ' deliveries');
    return Promise.all(promises);
}

function updateDeliveryIndices(dIndicesRef, dTemplate, dIds) {
    console.info('Updating delivery indices');

    let agencyTypes = ['donatingAgency', 'receivingAgency', 'delivererGroup'];
    return Promise.all([].concat.apply([], 
        // update index for each agency type
        agencyTypes.map(agencyType => {
            const indexRef = dIndicesRef.child(dTemplate[agencyType]);
            // append each delivery into index at timestamp
            return Object.keys(dIds).map(
                dId => indexRef.child(dIds[dId]).child(dId).set(true));
        })));
}

// case A handler 2
function notifyConfirmAll(request, accountsRef, daRef, requestPath) {
    console.info('Notifying all parties of the confirmed delivery');

    let raRef = accountsRef.child(request.receivingAgency.claimed);
    let dgRef = accountsRef.child(request.delivererGroup.claimed);
    let accounts = [
        {label: 'DA', ref: daRef},
        {label: 'RA', ref: raRef},
        {label: 'DG', ref: dgRef},
    ];
    return multiNotify(accounts, requestPath, nt.RECURRING_PICKUP_CONFIRMED);
}
// ----------------------- End Listener 2 -----------------------


// ----------------------- Utils -----------------------
function multiNotify(accounts, requestPath, notifType) {
    return Promise.all(accounts.map(acct => 
        utils.notifyRequestUpdate(acct.label, acct.ref, requestPath, notifType)));
}
