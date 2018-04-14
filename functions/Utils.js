// Push the given notification obj to account.notifications
var pushNotification = function (label, accountRef, notification) {
    let promise = accountRef.child('notifications').push(notification);
    console.info('Notified ' + label + ' "' + accountRef.key + '": '
        + JSON.stringify(notification));
    return promise;
};

// Create a notification obj for the given pickup request and notification
// type and pushes it to the account
var notifyRequestUpdate = function (label, accountRef, requestKey, notifType) {
    let notification = {
        type: notifType,
        content: requestKey
    };
    return pushNotification(label, accountRef, notification);
};

module.exports = {
    pushNotification: pushNotification,
    notifyRequestUpdate: notifyRequestUpdate,
};