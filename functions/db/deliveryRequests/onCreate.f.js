const functions = require('firebase-functions');
const moment = require('moment');
const enums = require('../../Enums.js');

/*
 * When a delivery request is created, send notifications to 
 * receiving agencies:
 *     If one specific RA is requested, send notification regardless 
 *     of availability.
 *     Otherwise, send notifications to all available RAs in the
 *     pending list.
 */
exports = module.exports = functions.database
    .ref('/delivery_requests/{pushId}')
    .onCreate(event => {
        // TODO: setup Admin SDK in the future?
        const requestRef = event.data.ref;
        const accountsRef = requestRef.parent.parent.child('accounts');
        const dasRef = accountsRef.parent.child('donating_agencies');

        var requestKey = event.params.pushId;
        var request = event.data.val();
        var raInfo = request.receivingAgency;
        console.info('New recurring request added: ' + requestKey);
        
        if (request.status !== enums.RequestStatus.PENDING) {
            console.error('ERROR: Request should have pending status upon request.');
            return Promise.resolve();
        }

        if (raInfo.claimed) {
            console.error('ERROR: RA shouldn\'t be confirmed upon request.');
            return Promise.resolve();
        }

        if (!raInfo.requested && !raInfo.pending) {
            console.error('ERROR: No RAs in the request to notify.');
            return Promise.resolve();
        }

        // create pickup request notification
        var notification = {
            type: enums.NotificationType.RECURRING_PICKUP_REQUEST,
            content: requestKey
        };

        // If a specific RA was requested, force push notification
        if (raInfo.requested) {
            console.info('A specific RA requested: ' + raInfo.requested);
            var raRef = accountsRef.child(raInfo.requested);

            return pushNotification(raRef, notification, 'RA');
        }

        console.info('No specific RA requested, ' + raInfo.pending.length + 
            ' pending RAs');

        // Compose all promises to get RA snapshots from db
        var raSnapPromises = [];
        for (let ra in raInfo.pending) {
            raSnapPromises.push(getRASnapPromise(accountsRef, raInfo.pending[ra]));
        }

        // Get all RA snapshot request results and process them
        return Promise.all(raSnapPromises).then((results) => {
            var promise = null;

            for (let i in results) {
                var raSnap = results[i];
                var available = isAvailable(raSnap.val(), request);

                console.info('RA "' + raSnap.key + '": available=' + available);

                if (available) {
                    promise = pushNotification(raSnap.ref, notification, 'RA');
                }
            }

            // no available RA, send notification back to DA
            if (!promise) {
                // update status of the request
                promise = requestRef.child('status').set(enums.RequestStatus.UNAVAILABLE);
                console.info('No RA available, updated request status');

                // create pickup unavailable notification
                notification = {
                    type: enums.NotificationType.RECURRING_PICKUP_UNAVAILABLE,
                    content: requestKey
                };
                var daRef = dasRef.child(request.donatingAgency);
                promise = pushNotification(daRef, notification, 'DA');
            }

            return promise;
        });
    });

function pushNotification(accountRef, notification, label) {
    var promise = accountRef.child('notifications').push(notification);
    console.info('Notified ' + label + ' "' + accountRef.key + '": '
        + JSON.stringify(notification));
    return promise;
}

// Firebase calls are asynchronous, return promises in order to execute
// in sequence as we need to.
function getRASnapPromise(accountsRef, raId) {
    return accountsRef.child(raId).once('value').then((raSnap) => {
        return raSnap;
    });
}

// Check if the given RA is available for the pickup request
function isAvailable(ra, request) {
    // 0-6 for Sun-Sat
    var requestDay = moment(request.startDate, enums.DateTimeFormat.DATE).day();
    var requestStart = moment(request.startTime, enums.DateTimeFormat.TIME);
    var requestEnd = moment(request.endTime, enums.DateTimeFormat.TIME);

    // raDay could be null if no available slots for that day
    var raDay = ra.availabilities[requestDay];

    if (raDay) {
        var raStart = moment(raDay.startTime, enums.DateTimeFormat.TIME);
        var raEnd = moment(raDay.endTime, enums.DateTimeFormat.TIME);

        if (requestStart.isSameOrAfter(raStart) &&
            requestEnd.isSameOrBefore(raEnd)) {
            return true;
        }
    }

    return false;
}
