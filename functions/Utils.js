var pushNotification = function (accountRef, notification, label) {
    let promise = accountRef.child('notifications').push(notification);
    console.info('Notified ' + label + ' "' + accountRef.key + '": '
        + JSON.stringify(notification));
    return promise;
};

var notifyRequestDA = function (dasRef, requestSnap, notifType) {
    let notification = {
        type: notifType,
        content: requestSnap.key
    };
    let daRef = dasRef.child(requestSnap.val().donatingAgency);
    return pushNotification(daRef, notification, 'DA');
};

module.exports = {
    pushNotification: pushNotification,
    notifyRequestDA: notifyRequestDA,
};