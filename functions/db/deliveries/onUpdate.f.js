const functions = require('firebase-functions');
const enums = require('../../Enums.js');

/*
 * Listeners:
 *
 * LISTENER 1: Donation Tally
 *  Trigger: delivery status becomes completed
 *  Action: add food items to the system donation tally
 */
exports = module.exports = functions.database
    .ref('deliveries/{dId}')
    .onUpdate((change, context) => {
        console.info('Delivery changed: ' + context.params.dId);

        // LISTENER 1
        if (deliveryCompleted(change)) {
            return addToDonationTally(change.after);
        }

        console.info('Nothing was triggered.');
        return null;
    });

// ----------------------- Listener 1 handlers -----------------------
function deliveryCompleted(change) {
    return change.before.child('status').val() !== enums.DeliveryStatus.COMPLETED &&
        change.after.child('status').val() === enums.DeliveryStatus.COMPLETED;
}

function addToDonationTally(deliverySnap) {
    console.info('Delivery completed: adding to donation tally..');
    const tallyRef = deliverySnap.ref.parent.parent.child('donation_tally');
    const delivery = deliverySnap.val();

    if (!delivery.description || !delivery.description.foodItems) {
        console.info('No food items in the delivery to add.');
        return null;
    }

    let foodItems = delivery.description.foodItems;
    let total = {};
    // aggregate total donation by unit for this delivery
    for (let food of foodItems) {
        if (!total[food.unit]) {
            total[food.unit] = 0;
        }
        total[food.unit] += parseInt(food.quantity);
    }

    // add to the donation tally using transactions
    return tallyRef.transaction((tally) => {
        if (tally) {
            for (let unit in total) {
                if (!tally[unit]) {
                    tally[unit] = 0;
                }
                tally[unit] = parseInt(tally[unit]) + total[unit];
            }
        }
        return tally;
    }, (error, committed, snapshot) => {
        if (committed) {
            console.info('Total added: ', total);
        } else if (error) {
            console.error('Transaction failed abnormally!', error);
        }
    });
}
// ----------------------- End Listener 1 -----------------------
