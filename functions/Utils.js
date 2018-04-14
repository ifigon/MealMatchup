var pushNotification = function (label, accountRef, notification) {
    let promise = accountRef.child('notifications').push(notification);
    console.info('Notified ' + label + ' "' + accountRef.key + '": '
        + JSON.stringify(notification));
    return promise;
};

var notifyRequestUpdate = function (label, accountRef, requestKey, notifType) {
    let notification = {
        type: notifType,
        content: requestKey
    };
    return pushNotification(accountRef, notification, label);
};

module.exports = {
    pushNotification: pushNotification,
    notifyRequestUpdate: notifyRequestUpdate,
};