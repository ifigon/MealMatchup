// Push the given notification obj to account.notifications
var pushNotification = function (label, acctRef, notification) {
    let promise = acctRef.child('notifications').push(notification);
    console.info('Notified ' + label + ' "' + acctRef.key + '": ', notification);
    return promise;
};

// Create a notification obj for the given pickup request and notification
// type and pushes it to the account
var notifyRequestUpdate = function (label, acctRef, requestPath, notifType) {
    let notification = {
        type: notifType,
        content: requestPath
    };
    return pushNotification(label, acctRef, notification);
};

module.exports = {
    pushNotification: pushNotification,
    notifyRequestUpdate: notifyRequestUpdate,
};