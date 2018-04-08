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
    .ref('/delivery_requests/{umbrellaId}/{pushId}')
    .onCreate((snap, context) => {
        // TODO: setup Admin SDK in the future? So that we can use absolute path.
        const requestRef = snap.ref;
        const accountsRef = requestRef.parent.parent.parent.child('accounts');
        const dasRef = accountsRef.parent.child('donating_agencies');

        var requestKey = context.params.pushId;
        var request = snap.val();
        var raInfo = request.receivingAgency;
        console.info('New recurring request added: ' + requestKey);
        
        if (request.status !== enums.RequestStatus.PENDING) {
            return Promise.reject(
                new Error('Request should have pending status upon request.'));
        }

        if (raInfo.claimed) {
            return Promise.reject(
                new Error('RA shouldn\'t be confirmed upon request.'));
        }

        if (!raInfo.requested && !raInfo.pending) {
            return Promise.reject(new Error('No RAs in the request to notify.'));
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
            var promises = [];

            for (let i in results) {
                var raSnap = results[i];
                var available = isAvailable(raSnap.val(), request);

                console.info('RA "' + raSnap.key + '": available=' + available);

                if (available) {
                    promises.push(pushNotification(raSnap.ref, notification, 'RA'));
                }
            }

            // no available RA, send notification back to DA
            if (promises.length === 0) {
                // update status of the request
                promises.push(requestRef.child('status').set(enums.RequestStatus.UNAVAILABLE));
                console.info('No RA available, updated request status');

                // create pickup unavailable notification
                notification = {
                    type: enums.NotificationType.RECURRING_PICKUP_UNAVAILABLE,
                    content: requestKey
                };
                var daRef = dasRef.child(request.donatingAgency);
                promises.push(pushNotification(daRef, notification, 'DA'));
            }

            return Promise.all(promises);
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
    var requestStart = moment(request.startTimestamp);
    var requestEnd = moment(request.endTimestamp);

    // raDay could be null if no available slots for that day
    var raDay = ra.availabilities[requestStart.day()];
    if (raDay) {
        var raStart = moment(raDay.startTimestamp);
        var raEnd = moment(raDay.endTimestamp);

        if (requestStart.isSameOrAfter(raStart, 'hour') &&
            requestStart.isSameOrAfter(raStart, 'minute') &&
            requestEnd.isSameOrBefore(raEnd, 'hour') &&
            requestEnd.isSameOrBefore(raEnd, 'minute')) {
            return true;
        }
    }

    return false;
}
