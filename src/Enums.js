const AccountType = {
	SCHOOL: "school",
	DONATING_AGENCY_MEMBER: "donating_agency_member",
	RECEIVING_AGENCY : "receiving_agency",
	DELIVERER_GROUP: "deliverer_group"
}
export default AccountType;

const RequestDurationType = {
	DATE: "date",  // an end date
	RECUR: "num_recurrences"  // number of recurrences
}
export default RequestDurationType;

const RequestRepeatType = {
    WEEKLY: "weekly",
    BIWEEKLY: "biweekly", // every other week
    MONTHLY: "monthly",
    // TODO Nth weekday of month
};
export default RepeatType;