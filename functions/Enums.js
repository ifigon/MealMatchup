// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!   AUTO GENERATED FROM src/Enums.js, DO NOT MODIFY   !!
// !!   Please modify src/Enums.js instead and run:       !!
// !!             `python hacks/cp_enums.py`              !!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Disable undeclared variable check on 'exports'
/*global exports:true*/
/*eslint no-undef: "error"*/

// TODO: temporary for pilot, manually setting a fixed umbrella
exports.UmbrellaId = {
    TEST: 'NLRZo1xfPHOI8rGpzSKiEJVOOUt2',
    UW: 'bfwL94u7XYZyhZpDByXLeWb5ivA3',
};

// For display purposes
exports.StringFormat = {
    PHONE: '[0-9]{3}-[0-9]{3}-[0-9]{4}', // '206-345-7890',
    DATE_FULL: 'MM/DD/YYYY', // '03/14/2018'
    DATE_SHORT: 'M/D', // '1/3', '11/2', '10/23'
    TIME: 'h:mma', // '3:30PM' (12hr),
    WEEKDAY: 'dddd', // 'Wednesday'
    WEEKDAY_WITH_DATE: 'dddd, MM/DD/YYYY' // 'Wednesday, 03/14/2018'
};

// For parsing input purposes
exports.InputFormat = {
    DATE: 'YYYY-MM-DD', // '2018-03-14' (default 'date' input value format)
    TIME: 'HH:mm' // '15:30' (24hr - default 'time' input value format)
};

exports.AccountType = {
    UMBRELLA: 'umbrella',
    DONATING_AGENCY_MEMBER: 'donating_agency_member',
    RECEIVING_AGENCY: 'receiving_agency',
    DELIVERER_GROUP: 'deliverer_group'
};

// For now (as of 3/5/2018), the only umbrella
// account type is school (eg UW). In the future,
// there could be other types such as corporate.
exports.UmbrellaType = {
    SCHOOL: 'school'
};

exports.PageContent = {
    ASSIGN_VOLUNTEERS: 'Assign Volunteers',
    CALENDAR: 'Calendar',
    DIRECTORY: 'Directory',
    FOOD_LOGS: 'Food Logs',
    REQUEST_PICKUP: 'Request Pickup',
    SETTINGS: 'Settings'
};

exports.RequestEndCriteriaType = {
    DATE: 'date', // an end date
    OCCUR: 'num_occurrences' // number of occurrences
};

exports.RequestRepeatType = {
    WEEKLY: 'weekly',
    BIWEEKLY: 'biweekly', // every other week
    MONTHLY: 'monthly'
    // TODO Nth weekday of month
};

exports.RequestStatus = {
    // waiting on RA/DG response
    PENDING: 'pending',
    // claimed by all parties
    CONFIRMED: 'confirmed',
    // failed due to no RA claimed within deadline
    EXPIRED_RA: 'expired_ra',
    // failed due to no DG claimed within deadline
    EXPIRED_DG: 'expired_dg',
    // failed due to all RAs rejected
    REJECTED_RA: 'rejected_ra',
    // failed due to all DGs rejected
    REJECTED_DG: 'rejected_dg',
    // failed due to no available RAs
    UNAVAILABLE: 'unavailable'
};

exports.NotificationType = {
    /* When: a new DA/RA/DG account is created
       Receiver: School
       Actions: View */
    NEW_ACCOUNT: 'new_account',
    /* When: a DA requests a new recurring pick
       Receiver: RA, DG
       Action: View -> Claim/Reject */
    RECURRING_PICKUP_REQUEST: 'recurring_pickup_request',
    /* When: a recurring pick has been claimed by both RA and DG
       Receiver: DA, RA, DG
       Action: View -> View on Calendar */
    RECURRING_PICKUP_CONFIRMED: 'recurring_pickup_confirmed',
    /* When: no RA claims the pickup request within the deadline
       Receiver: DA
       Action: View */
    RECURRING_PICKUP_EXPIRED_RA: 'recurring_pickup_expired_ra',
    /* When: no DG claims the pickup request within the deadline
       Receiver: DA
       Action: View */
    RECURRING_PICKUP_EXPIRED_DG: 'recurring_pickup_expired_dg',
    /* When: all RAs rejected the pickup request
       Receiver: DA
       Action: View */
    RECURRING_PICKUP_REJECTED_RA: 'recurring_pickup_rejected_ra',
    /* When: all DGs rejected the pickup request
       Receiver: DA
       Action: View */
    RECURRING_PICKUP_REJECTED_DG: 'recurring_pickup_rejected_dg',
    /* When: no available RAs to send to
       Receiver: DA
       Action: View */
    RECURRING_PICKUP_UNAVAILABLE: 'recurring_pickup_unavailable',
    /* When: a DA requests a new emergency pickup
       Receiver: RA
       Action: View -> Claim/Reject */
    EMERGENCY_PICKUP_REQUESTED: 'emergency_pickup_requested',
    /* When: a emergency pickup has been claimed by RA
       Receiver: DA, RA
       Action: View */
    EMERGENCY_PICKUP_CONFIRMED: 'emergency_pickup_confirmed',
    /* When: all RAs rejected the emergency pickup
       Receiver: DA
       Action: View */
    EMERGENCY_PICKUP_REJECTED: 'emergency_pickup_rejected',
    /* When: no RAs respond to the emergency pickup within the deadline
       Receiver: DA
       Action: View */
    EMERGENCY_PICKUP_EXPIRED: 'emergency_pickup_expired',
};

exports.DeliveryType = {
    RECURRING: 'recurring',
    EMERGENCY: 'emergency'
};

exports.DeliveryStatus = {
    SCHEDULED: 'scheduled',
    STARTED: 'started',
    PICKED_UP: 'picked_up',
    COMPLETED: 'completed'
};

exports.FoodUnit = {
    LB: 'lb',
    CASES: 'cases',
    LOAVES: 'loaves'
};

exports.Routes = {
    ASSIGN_VOLUNTEERS: 'assign-volunteers',
    CALENDAR: 'calendar',
    DIRECTORY: 'directory',
    FOOD_LOGS: 'food-logs',
    REQUEST_PICKUP: 'request-pickup',
    SETTINGS: 'settings'
};

exports.NotificationContentType = {
    DELIVERY_REQUEST: 'delivery_request',
    ACCOUNT: 'account'
};

exports.EmailTemplate = {
    EMAIL_ALL: {
        subject: 'Meal Matchup Delivery Confirmation',
        html:'<html> <head> <title></title> </head> <body><p>Hello,</p><div> </div><span>The delivery that you are a part of has been confirmed by all 3 parties. To see the updated status of the delivery, please login here: </span><a href="https://www.mealmatchup.org/">https://www.mealmatchup.org/</a><span>.</span><p>Thank you!</p><p>Meal Matchup</p></body></html>'
    },
    NO_AVAILABLE_RAS: {
        subject: 'Meal Matchup Delivery Cancelation',
        html:'<html> <head> <title></title> </head> <body><p>Hello,</p><div> </div><span>All receiving agencies are unable at the time requested for pickup. Please login here: </span><a href="https://www.mealmatchup.org/">https://www.mealmatchup.org/</a><span> if you would like to see more or schedule for a different pick-up date/time.</span><p>Thank you!</p><p>Meal Matchup</p></body></html>'
    },
    SPECIFIED_RA: {
        subject: 'Meal Matchup Delivery Request',
        html:'<html> <head> <title></title> </head> <body><p>Hello,</p><div> </div><span>A donation agency has specified you to receive their donation. Please login at </span><a href="https://www.mealmatchup.org/">https://www.mealmatchup.org/</a><span> to either confirm or deny this delivery request.</span><p>Thank you!</p><p>Meal Matchup</p></body></html>'
    },
    DG_REJECTION: {
        subject: 'Meal Matchup Delivery Cancelation',
        html:'<html> <head> <title></title> </head> <body><p>Hello,</p><div> </div><span>A delivery group is unable to make the delivery at the requested time. You can see more by going to the notification by logging in at </span><a href="https://www.mealmatchup.org/">https://www.mealmatchup.org/</a><span>.</span><p>Thank you!</p><p>Meal Matchup</p></body></html>'
    },
    EMAIL_RAS: {
        subject: 'Meal Matchup Delivery Cancelation',
        html:'<html> <head> <title></title> </head> <body><p>Hello,</p><div> </div><span>A delivery group is unable to make the delivery at the requested time. You can see more by going to the notification by logging in at </span><a href="https://www.mealmatchup.org/">https://www.mealmatchup.org/</a><span>.</span><p>Thank you!</p><p>Meal Matchup</p></body></html>'
    },
    DG_REQUEST: {
        subject: 'Meal Matchup New Delivery Request',
        html:'<html> <head> <title></title> </head> <body><p>Hello,</p><div> </div><span>You have been requested for a donation delivery. Please login at </span><a href="https://www.mealmatchup.org/">https://www.mealmatchup.org/</a><span> to reject or accept the delivery.</span><p>Thank you!</p><p>Meal Matchup</p></body></html>'
    }
};
