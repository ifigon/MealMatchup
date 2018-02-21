export const AccountType = {
    SCHOOL: "school",
    DONATING_AGENCY_MEMBER: "donating_agency_member",
    RECEIVING_AGENCY : "receiving_agency",
    DELIVERER_GROUP: "deliverer_group"
};

export const PageContent = {
    ASSIGN_VOLUNTEERS: "Assign Volunteers",
    CALENDAR: "Calendar",
    DIRECTORY: "Directory",
    FOOD_LOGS: "Food Logs",
    REQUEST_PICKUP: "Request Pickup",
    SETTINGS: "Settings"
};

export const RequestDurationType = {
    DATE: "date",  // an end date
    RECUR: "num_recurrences"  // number of recurrences
};

export const RequestRepeatType = {
    WEEKLY: "weekly",
    BIWEEKLY: "biweekly", // every other week
    MONTHLY: "monthly",
    // TODO Nth weekday of month
};

export const NotificationType = {
    NEW_ACCOUNT: "new_account",
    RECURRING_PICKUP_REQUEST: "recurring_pickup_request",
    RECURRING_PICKUP_CONFIRMED: "recurring_pickup_confirmed",
};
