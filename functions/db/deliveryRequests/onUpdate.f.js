const functions = require('firebase-functions');
const moment = require('moment-timezone');
const utils = require('../../Utils.js');
const enums = require('../../Enums.js');

const DeliveryStatus = enums.DeliveryStatus;
const DeliveryType = enums.DeliveryType;
const InputFormat = enums.InputFormat;
const NotificationType = enums.NotificationType;
const RequestRepeatType = enums.RequestRepeatType;
const RequestStatus = enums.RequestStatus;


/*
 * Listeners based on changes to recurring pickup requests:
 *
 * LISTENER 1: handle RA responses for recurring pickup requests
 * Cases
 *  A) a RA claimed:
 *      Change: 'receivingAgency' changed from requested/pending to claimed
 *      Cases
 *      a1) is emergency delivery:
 *          Actions:
                i. create delivery objects
                ii. update request's 'spawnedDeliveries' and 'status'
                iii. send CONFIRMED notifications to DA, RA
 *      a2) is normal delivery
 *          Action: send notifications to DGs
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
        if (change.before.val().status !== RequestStatus.PENDING) {
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
            if (request.type === DeliveryType.EMERGENCY) { // case A1
                return createDeliveries(rootRef, requestSnap)
                    .then(() => notifyConfirmAll(request, accountsRef, daRef, requestPath));
            } else { // case A2
                return sendRequestToDGs(accountsRef, request, requestPath);
            }
        }

        if (wasRejectedByAll('receivingAgency', change)) {  // case B
            return handleRejection(RequestStatus.REJECTED_RA,
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
            return handleRejection(RequestStatus.REJECTED_DG,
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
        change.after.child('status').val() === RequestStatus.PENDING;
}

// Listener 1 case A1 & 2 case A handler 1
function createDeliveries(rootRef, requestSnap) {
    console.info('All necessary parties claimed -> create regular delivery objects');
    const TIME = InputFormat.TIME;
    const request = requestSnap.val();
    const dsRef = rootRef.child('deliveries');
    const dIndicesRef = rootRef.child(`delivery_indices/${request.umbrella}`);

    // calculate num days to step by
    let step = -1;
    if (request.type === DeliveryType.EMERGENCY) {
        // should not repeat. Choose dummy value that causes delivery gen loop to exit early
        step = 100;
    } else if (request.repeats === RequestRepeatType.WEEKLY) {
        step = 7;
    } else if (request.repeats === RequestRepeatType.BIWEEKLY) {
        step = 14;
    } else {
        return Promise.reject(
            new Error('Repeats other when weekly and biweekly are not supported yet'));
    }

    // determine how long each delivery window should be
    let duration = (
        moment(moment.tz(request.endTimestamp, request.timezone).format(TIME), TIME)
        - moment(moment.tz(request.startTimestamp, request.timezone).format(TIME), TIME)
    ).valueOf();

    // create delivery obj with common fields
    let dTemplate = {
        type: request.type,
        status: DeliveryStatus.SCHEDULED,
        timezone: request.timezone,
        spawningDeliveryRequest: requestSnap.key,
        donatingAgency: request.donatingAgency,
        daContact: request.primaryContact,
        receivingAgency: request.receivingAgency.claimed,
        raContact: request.raContact,
        notes: request.notes,
    };
    if (request.type === DeliveryType.RECURRING) {
        dTemplate.delivererGroup = request.delivererGroup.claimed;
    }

    // Generate all deliveries from request
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
        status: RequestStatus.CONFIRMED,
        spawnedDeliveries: Object.keys(dIds)
    };
    promises.push(requestSnap.ref.update(reqUpdates));

    // update delivery index for each agency
    promises.push(updateDeliveryIndices(dIndicesRef, dTemplate, dIds,
        request.type === DeliveryType.EMERGENCY));

    console.info('Created ' + Object.keys(dIds).length + ' deliveries');
    return Promise.all(promises);
}

function updateDeliveryIndices(dIndicesRef, dTemplate, dIds, isEmergency) {
    console.info('Updating delivery indices');

    let agencyTypes = ['donatingAgency', 'receivingAgency'];
    if (!isEmergency) { // only regular deliveries have a deliverer group
        agencyTypes.push('delivererGroup');
    }
    return Promise.all([].concat.apply([], 
        // update index for each agency type
        agencyTypes.map(agencyType => {
            const indexRef = dIndicesRef.child(dTemplate[agencyType]);
            // append each delivery into index at timestamp
            return Object.keys(dIds).map(
                dId => indexRef.child(dIds[dId]).child(dId).set(true));
        })));
}

// listener 1 case A1 & 2 case A handler 2
function notifyConfirmAll(request, accountsRef, daRef, requestPath) {
    console.info('Notifying all parties of the confirmed delivery');

    let raRef = accountsRef.child(request.receivingAgency.claimed);
    let accounts = [
        {label: 'DA', ref: daRef},
        {label: 'RA', ref: raRef},
    ];
    if (request.type === DeliveryType.RECURRING) {
        let dgRef = accountsRef.child(request.delivererGroup.claimed);
        accounts.push({label: 'DG', ref: dgRef});
    }
    return multiNotify(accounts, requestPath, nt.RECURRING_PICKUP_CONFIRMED);
}

// Listener 1 & 2 case B handler
function handleRejection(rejectType, requestSnap, accountsRef, daRef, requestPath) {
    let accounts = [ { label: 'DA', ref: daRef } ];
    let notifType = null;

    if (rejectType === RequestStatus.REJECTED_RA) {
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
// case A2 handler
function sendRequestToDGs(accountsRef, requst, requestPath) {
    let dgInfo = request.delivererGroup;

    console.info('Listener1: a RA claimed -> send notifications to DGs');

    if (request.status !== RequestStatus.PENDING) {
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
        'DG', accountsRef.child(dgId), requestPath, nt.RECURRING_PICKUP_REQUESTED)));
}
// ----------------------- End Listener 1 -----------------------

// ----------------------- Utils -----------------------
function multiNotify(accounts, requestPath, notifType) {
    return Promise.all(accounts.map(acct => 
        utils.notifyRequestUpdate(acct.label, acct.ref, requestPath, notifType)));
}
