const functions = require('firebase-functions');

/*
 * When the receivingAgency field of a DeliveryRequest changes:
 * 1. requested/pending -> claimed:
 *      send a notification to appropriate DGs
 * 2. pending list changed:
 *      do nothing
 * No other changes should be allowed.
 */
exports = module.exports = functions.database
    .ref('/delivery_requests/{umbrella_id}/{pushId}/receivingAgency')
    .onUpdate((change, context) => {

    });