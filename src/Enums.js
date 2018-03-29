// Disable undeclared variable check on 'exports'
/*global exports:true*/
/*eslint no-undef: "error"*/

exports.DateTimeFormat = {
    DATE: 'YYYY-MM-DD',  // '2018-03-24'
    TIME: 'HH:mm',  // '15:30'
};

exports.AccountType = {
    UMBRELLA: 'umbrella',
    DONATING_AGENCY_MEMBER: 'donating_agency_member',
    RECEIVING_AGENCY : 'receiving_agency',
    DELIVERER_GROUP: 'deliverer_group'
};

// For now (as of 3/5/2018), the only umbrella
// account type is school (eg UW). In the future,
// there could be other types such as corporate.
exports.UmbrellaType = {
    SCHOOL: 'school',
};

exports.PageContent = {
    ASSIGN_VOLUNTEERS: 'Assign Volunteers',
    CALENDAR: 'Calendar',
    DIRECTORY: 'Directory',
    FOOD_LOGS: 'Food Logs',
    REQUEST_PICKUP: 'Request Pickup',
    SETTINGS: 'Settings'
};

exports.RequestDurationType = {
    DATE: 'date',  // an end date
    RECUR: 'num_recurrences'  // number of recurrences
};

exports.RequestRepeatType = {
    WEEKLY: 'weekly',
    BIWEEKLY: 'biweekly', // every other week
    MONTHLY: 'monthly',
    // TODO Nth weekday of month
};

exports.RequestStatus = {
    // waiting on RA/DG response
    PENDING: 'pending',
    // claimed by all parties
    CONFIRMED: 'confirmed',
    // failed at some step
    FAILED: 'failed'
};

exports.NotificationType = {
    NEW_ACCOUNT: 'new_account',
    RECURRING_PICKUP_REQUEST: 'recurring_pickup_request',
    RECURRING_PICKUP_CONFIRMED: 'recurring_pickup_confirmed',
};
