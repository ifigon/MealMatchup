/*
This file is purely for documentation purposes.
It shows examples of what each object looks like in the database.
It is not complete and should be updated as we encounter more data that
we need.
*/

SCHOOL (Account)

	// key = UID of this school account in firebase
	RheaQY1WxJT03sTPQICFZ4STpfm1 : {  
		name: "University of Washington",
		ceebCode: "4854",
		address: {
			street1: "1410 Northeast Campus Parkway",
			street2: "",
			city: "Seattle",
			state: "WA",
			zipcode: 98105
		},
		primaryContact: {
			name: "Irini Spyridakis",
			email: "irinis@u.washington.edu",
			phone: 1234567890
		},
		donatingAgencies: [  
			"-K9HdKlCLjjk_ka82K0s",  // autogen-key of donating-agency
			...
		],

		receivingAgencies: [
			"uGOFJ8NqHjbZhKAYzSZFRs1dSKD3",  // uid-key of receiving-agency
			...
		],
		delivererGroups: [
			"R8BAHrxdkfQoAmfWvGa1OJmjQP43",  // uid-key of deliverer-group
			...
		],
		notificatioins: [
		]
	}

-----------------------------------------------------

DONATING AGENCY (Not an account)

	// key = auto generated key by firebase
	-K9HdKlCLjjk_ka82K0s: {
		name: "Local Point",
		address: {
			street1: "1201 NE Campus Pkwy",
			street2: "",
			city: "Seattle",
			state: "WA",
			zipcode: 98105
		},
		school: "RheaQY1WxJT03sTPQICFZ4STpfm1",  // uid-key of a school
		isVerified: true,
		isActivated: true,
		primaryContact: "dhA03LwTp3cibXVUcb3nQqO34wj1",  // uid-key of a donating-agency-member
		members: [
			"dhA03LwTp3cibXVUcb3nQqO34wj1",  // uid-key of donating-agency-member
			"fbCm3Yrbi4e12WgpVz3gq25VKea2",
		]
	}

-----------------------------------------------------

DONATING AGENCY MEMBER (account)

	// key = UID of the member's account in firebase
	dhA03LwTp3cibXVUcb3nQqO34wj1: {
		agency: "-K9HdKlCLjjk_ka82K0s",  // autogen-key of a donating-agency
		name: "Andrea Benson",
		email: "bensoa3@uw.edu",
		phone: 2065436975,
		isAdmin: true,
		notifications: [
		]
	}


-----------------------------------------------------

RECEIVING AGENCY (account)

	// key = UID of the receiving agency's account
	uGOFJ8NqHjbZhKAYzSZFRs1dSKD3: {
		name: "Seattle Union Gospel Mission",
		address: {
			street1: "124 Sesame St.",
			street2: "",
			city: "Seattle",
			state: "WA",
			zipcode: 98115
		},
		school: "RheaQY1WxJT03sTPQICFZ4STpfm1",  // uid-key of a school
		isVerified: true,
		isActivated: true,
		primaryContact: {
			name: "Chris Stack",
			email: "chrisstack@uniongospel.org",
			phone: 2065869876
		},
		accecptEmergencyPickups: true,
		notification: [
		]
	}


-----------------------------------------------------

DELIVERER GROUP (account)

	// key = UID of the deliverer group's account
	R8BAHrxdkfQoAmfWvGa1OJmjQP43: {
		name: "Phi Sigma Ro",
		address: {
			street1: "124 Sesame St.",
			street2: "",
			city: "Seattle",
			state: "WA",
			zipcode: 98115
		},
		school: "RheaQY1WxJT03sTPQICFZ4STpfm1",  // uid-key of a school
		isVerified: true,
		isActivated: true,
		coordinator: {
			name: "Andy Duncan",
			email: "andyd@uw.edu",
			phone: 2064872859
		},
		notification: [
		]
	}


-----------------------------------------------------

DELIVERY REQUEST

	// key = auto generated key by firebase
	-L5QoXeC_UrL5tRRED3e: {
		startDate: "2018-02-28",
		endDate: "2018-05-30",
		repeats: "weekly",	// values in Enums.RepeatType
		startTime: "14:00",
		endTime: "17:00",
		primaryContact: "dhA03LwTp3cibXVUcb3nQqO34wj1",  // uid-key of a donating-agency-member
		notes: "Enter through the back door.",
		// receivingAgency & delivererGroups:
		// The donating agency can choose to request specific receiving agency
		// and/or deliverer group, or not.
		// a. If specified, the uid would be populated, but confirmed=false
		// b. It no specified, the uid would be null until someone claims this
		//    request.
		receivingAgency: {
			uid: "uGOFJ8NqHjbZhKAYzSZFRs1dSKD3",  // uid-key of a receiving-agency
			confirmed: true
		},
		delivererGroup: {
			uid: null,  // uid-key of a deliverer-group
			confirmed: false
		},
		requestTimeStamp: "1518753363763"
	}


-----------------------------------------------------

DELIVERY

	// key = auto generated key by firebase
	-L5RkIS0CSPuXpkewaqA: {
		date: "2018-02-28",
		startTime: "14:00",
		endTime: "17:00",
		isEmergency: false,
		donatingAgency: {
			agency: "-K9HdKlCLjjk_ka82K0s",  // autogen-key of a donating-agency
			primaryContact: 
		},
		receivingAgency: {
			agency: "uGOFJ8NqHjbZhKAYzSZFRs1dSKD3",  // uid-key of receiving-agency
			primaryContact: {
				name: "Bob",
				email: "bob@uniongospel.org",
				phone: 0987654321
			}
		},
		// delivererGroup is null if isEmergency=true
		delivererGroup: {
			group: "R8BAHrxdkfQoAmfWvGa1OJmjQP43",  // uid-key of deliverer-group
			deliverers: [
				{
					name: "Alice",
					email: "alice@uw.edu",
					phone: 1237894560
				},
				{
					name: "Chris",
					email: "chris@uw.edu",
					phone: 4561230789
				}
			]
		},
		description: {
			foodItems: [
				{
					food: "Baked beans",
					quantity: 15,
					unit: "lb"  // Enums.FoodUnit
				},
				{
					food: "Bread",
					quantity: 4,
					unit: "loaves"  // Enums.FoodUnit
				},
				...
			],
			updatedBy: "dhA03LwTp3cibXVUcb3nQqO34wj1"  // uid-key of a donating-agency-member
		},
		notes: "Enter through the back door."
	}


