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
        const accountsRef = event.data.ref.parent.parent.child('accounts');
        const dasRef = accountsRef.parent.child('donating_agencies');

        var requestKey = event.params.pushId;
        var request = event.data.val();
        var raInfo = request.receivingAgency;
        console.info('New recurring request added: ' + requestKey);
        
        if (raInfo.accepted) {
            console.error('ERROR: RA shouldn\'t be confirmed upon request.');
            return;
        }

        if (!raInfo.pending) {
            console.error('ERROR: No pending RAs in the request.');
            return
        }

        // create pickup request notification
        var notification = {
            type: enums.NotificationType.RECURRING_PICKUP_REQUEST,
            content: requestKey
        };

        // If a specific RA was requested
        var forceNotify = (raInfo.pending.length === 1);

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

                console.info('RA "' + raSnap.key + '": forceNotify=' + forceNotify
                             + ', available=' + available);

                if (forceNotify || available) {
                    promise = raSnap.ref.child('notifications').push(notification);

                    console.info('Notified RA "' + raSnap.key + '": ' +
                                 JSON.stringify(notification));
                }
            }

            // no available RA, send notification back to DA
            if (!promise) {
                // create pickup unavailable notification
                notification = {
                    type: enums.NotificationType.RECURRING_PICKUP_UNAVAILABLE,
                    content: requestKey
                };
                promise = dasRef.child(request.donatingAgency).child('notifications')
                    .push(notification);

                console.info('No RA available, notified DA "' + request.donatingAgency
                              + '": ' + JSON.stringify(notification));
            }

            return promise;
        });
    });

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
