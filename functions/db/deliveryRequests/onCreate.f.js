const functions = require('firebase-functions');
const moment = require('moment-timezone');
const enums = require('../../Enums.js');
const utils = require('../../Utils.js');

const nt = enums.NotificationType;
// initalizes firebase so that you can access firebase references
const admin = require('firebase-admin');

/*
 * When a delivery request is created, send notifications to 
 * receiving agencies:
 *     If one specific RA is requested, send notification regardless 
 *     of availability.
 *     Otherwise, send notifications to all available RAs in the
 *     pending list.
 */
exports = module.exports = functions.database
    .ref('/delivery_requests/{umbrellaId}/{daId}/{pushId}')
    .onCreate((snap, context) => {
        console.info('New recurring request added: ' + snap.key);
        const requestPath = context.params.daId + '/' + context.params.pushId;
        var request = snap.val();

        // TODO: setup Admin SDK in the future? So that we can use absolute path.
        const rootRef = snap.ref.parent.parent.parent.parent;
        const accountsRef = rootRef.child('accounts');
        
        if (request.status !== enums.RequestStatus.PENDING) {
            return Promise.reject(
                new Error('Request should have pending status upon request.'));
        }

        var raInfo = request.receivingAgency;

        if (raInfo.claimed) {
            return Promise.reject(
                new Error('RA shouldn\'t be confirmed upon request.'));
        }

        if (!raInfo.requested && !raInfo.pending) {
            return Promise.reject(new Error('No RAs in the request to notify.'));
        }

        // If a specific RA was requested, force push notification
        // Send email to RA if directly requested
        if (raInfo.requested) {
            console.info('A specific RA requested: ' + raInfo.requested);
            var raRef = accountsRef.child(raInfo.requested);
            // Sends an email to the RA 


            // var path = ('accounts/' + raInfo.requested + '/email');
            // admin.database().ref(path).once('value').then(snapshot => {
            //     console.log(snapshot.val());
            //     // d-ca2c6c05fbb94de7a29fbe2819e7ec9a is the send grid template ID for a specied RA email notification
            //     return utils.emailNotification(snapshot.val(), 'd-ca2c6c05fbb94de7a29fbe2819e7ec9a');
                
            // })
            //     .catch(err => {
            //         console.log(err);
            //     });  


            return utils.notifyRequestUpdate(
                // d-ca2c6c05fbb94de7a29fbe2819e7ec9a is the template ID for a send grid email template to notify the RA they have been specifically requested
                'RA', raRef, requestPath, nt.RECURRING_PICKUP_REQUEST, 'd-ca2c6c05fbb94de7a29fbe2819e7ec9a');
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

            var rasLeft = [];
            for (let i in results) {
                var raSnap = results[i];
                var available = isAvailable(raSnap.val(), request);

                console.info('RA "' + raSnap.key + '": available=' + available);

                // d-8a27e24d696d42d89b7e16aeb4f9facc is the sendgrid template to send to RAs when a DA sends in a delivery request that the RAs can accept
                if (available) {
                    promises.push(
                        utils.notifyRequestUpdate(
                            'RA', raSnap.ref, requestPath, nt.RECURRING_PICKUP_REQUEST, 'd-8a27e24d696d42d89b7e16aeb4f9facc'));
                    rasLeft.push(raSnap.key);
                }
            }
            // update the ra pending list
            let reqUpdates = { ['receivingAgency/pending']: rasLeft };

            // no available RA, send notification back to DA come back to this at the end
            if (rasLeft.length === 0) {
                // update status of the request
                reqUpdates['status'] = enums.RequestStatus.UNAVAILABLE;

                // var path = ('accounts/' + request.donatingAgency + '/email');
                // admin.database().ref(path).once('value').then(snapshot => {
                //     console.log(snapshot.val());
                //     const msgbody = {
                //         to: 'lucaswoo23@yahoo.com',
                //         from: 'no-replymealmatchup@email.com',
                //         subject: 'Delivery Confirmation',
                //         text: 'Hello, Sorry, the donation unable to be confirmed because of no RA availability',
                //     };        
                //     sgMail.send(msgbody)
                //         .then(() => console.log('email sent succcessfully :)'))
                //         .catch((error) => {
                //             console.log(error);
                //             return;
                //         });
                //     return snapshot.val();
                // })
                //     .catch(err => {
                //         console.log(err);
                //     }); 



                console.info('No RA available, notifying DA.');
                var daRef = rootRef.child(`donating_agencies/${request.donatingAgency}`);
                // get the child for the members
                // loop through all the members
                // rootRef.child('accounts/' + memberId)
                //
                // d-45fa851d56ce4a1e84bbfe602ef797c3 is the send grid template to send an email when there are no RA's available, emails the DA the update
                promises.push(
                    utils.notifyRequestUpdate(
                        'DA', daRef, requestPath, nt.RECURRING_PICKUP_UNAVAILABLE, 'd-45fa851d56ce4a1e84bbfe602ef797c3'));

            }

            // need to update RA pending list and status at the same time, otherwise
            // deliveryRequests.onUpdate.Listener1 will trigger RAs-rejected
            promises.push(snap.ref.update(reqUpdates));
            console.info('Updated request status and pending list accordingly');

            return Promise.all(promises);
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
    // ------- helpers --------
    var loggingF = 'ddd YYYY-MM-DD HH:mm:ssZ';  // 'Mon 2018-04-09 21:00:00-07:00'
    var timeF = 'HH:mm';
    var dateF = 'YYYY-MM-DD';
    var dateTimeF = dateF + timeF;

    function constructRaTimeInReq(raTimestamp, reqInRA) {
        // get RA's weekday and time in RA's own timezone first
        var raTimeOriginal = moment.tz(raTimestamp, ra.timezone);
        // make ra time's date the same as request's (in RA timezone)
        var raTime = moment.tz(
            reqInRA.format(dateF) + raTimeOriginal.format(timeF), dateTimeF, ra.timezone);
        raTime.tz(request.timezone);
        return raTime;
    }
    // ------- end helpers --------

    // get request start/end time in request's original timezone
    // Eg: Thu 3/1/2018 21:00 (REQ) - Thu 5/3/2018 23:00 (REQ)
    var reqStart = moment.tz(request.startTimestamp, request.timezone);
    var reqEndOriginal = moment.tz(request.endTimestamp, request.timezone);
    console.info('[isAvailable] Req(' + request.timezone + '): ' +
        reqStart.format(loggingF) + ' - ' + reqEndOriginal.format(loggingF));

    // get the weekday of request in RA's timezone, so that we'd grab the
    // availability for the right day
    // Eg: RA(ra_timezone) = REQ(req_timezone) + 5hrs
    //     "Thu 3/1/2018 21:00 (REQ)" = "Fri 3/2/2018 02:00 (RA)"
    var reqInRA = moment.tz(request.startTimestamp, ra.timezone);
    var raDay = ra.availabilities[reqInRA.day()];
    console.info('[isAvailable] Req in RA(' + ra.timezone + '): ' + reqInRA.format(loggingF));

    // raDay could be null if no available slots for that day
    if (raDay) {
        // Compare everything in request's timezone.
        // Eg: RA's availability: "Fri 08:00 to 14:00 (RA)" 
        //                     => "Fri 03:00 to 09:00 (REQ)"
        // At this point, we want to compare:
        //    Request: Thu 3/1/2018 21:00 - 23:00 (REQ)
        //    RA:      Fri 3/2/2018 03:00 - 09:00 (REQ)
        var reqEnd = moment.tz(
            reqStart.format(dateF) + reqEndOriginal.format(timeF), dateTimeF, request.timezone);
        var raStart = constructRaTimeInReq(raDay.startTimestamp, reqInRA);
        var raEnd = constructRaTimeInReq(raDay.endTimestamp, reqInRA);

        console.info(
            '[isAvailable] Req: ' + reqStart.format(loggingF) + ' - ' + reqEnd.format(loggingF));
        console.info(
            '[isAvailable] RA: ' + raStart.format(loggingF) + ' - ' + raEnd.format(loggingF));

        if (reqStart.isSameOrAfter(raStart) &&
            reqEnd.isSameOrBefore(raEnd)) {
            return true;
        }
    } else {
        console.info('[isAvailable] RA has no availibility for ' + reqInRA.format('dddd'));
    }

    return false;
}

