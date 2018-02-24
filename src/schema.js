/*
This file is purely for documentation purposes.
It shows examples of what each object looks like in the database.
It is not complete and should be updated as we encounter more data that
we need.
*/

SCHOOL ("/accounts/")

	// key = UID of this school account in firebase
	RheaQY1WxJT03sTPQICFZ4STpfm1 : {  
		accountType: "school"
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
			{
				type: "new_account",  // Enums.NotificationType
				content: null  // TBD
			}, 
			...
		]
	}

-----------------------------------------------------

DONATING AGENCY ("/donating_agencies/") //not an account

	// key = auto generated key by firebase
	-K9HdKlCLjjk_ka82K0s: {
		school: "RheaQY1WxJT03sTPQICFZ4STpfm1",  // uid-key of a school
		name: "Local Point",
		address: {
			street1: "1201 NE Campus Pkwy",
			street2: "",
			city: "Seattle",
			state: "WA",
			zipcode: 98105,
			officeNo: "220"
		},
		isVerified: true,
		isActivated: true,
		primaryContact: "dhA03LwTp3cibXVUcb3nQqO34wj1",  // uid-key of a donating-agency-member
		members: [
			"dhA03LwTp3cibXVUcb3nQqO34wj1",  // uid-key of donating-agency-member
			"fbCm3Yrbi4e12WgpVz3gq25VKea2",
		]
	}

-----------------------------------------------------

DONATING AGENCY MEMBER ("/accounts/")

	// key = UID of the member's account in firebase
	dhA03LwTp3cibXVUcb3nQqO34wj1: {
		accountType: "donating_agency_member",
		agency: "-K9HdKlCLjjk_ka82K0s",  // autogen-key of a donating-agency
		name: "Andrea Benson",
		email: "bensoa3@uw.edu",
		phone: 2065436975,
		position: "Manager"
		isAdmin: true,
		notifications: [
			{
				type: "recurring_pickup_confirmed",  // Enums.NotificationType
				content: "-L5QoXeC_UrL5tRRED3e"  // key of DeliveryRequest
			},
			...
		]
	}


-----------------------------------------------------

RECEIVING AGENCY ("/accounts/")

	// key = UID of the receiving agency's account
	uGOFJ8NqHjbZhKAYzSZFRs1dSKD3: {
		accountType: "receiving_agency",
		school: "RheaQY1WxJT03sTPQICFZ4STpfm1",  // uid-key of a school
		name: "Seattle Union Gospel Mission",
		email: "seauniongospel@test.org",
		address: {
			street1: "124 Sesame St.",
			street2: "",
			city: "Seattle",
			state: "WA",
			zipcode: 98115,
			officeNo: "110A"
		},
		isVerified: true,
		isActivated: true,
		primaryContact: {
			name: "Chris Stack",
			email: "chrisstack@uniongospel.org",
			phone: 2065869876,
			position: "Manager"
		},
		secondaryContact: {  // could be null
			name: "Dave Stack",
			email: "davestack@uniongospel.org",
			phone: 2065869876,
			position: "Volunteer"
		},
		availabilities: {
			0: {startTime: "10:00", endTime: "14:00"},  // Sunday
			2: {startTime: "13:00", endTime: "17:00"},  // Tuesday
			3: {startTime: "13:00", endTime: "17:00"},  // Wednesday
			4: {startTime: "13:00", endTime: "17:00"},  // Thursday
			6: {startTime: "10:00", endTime: "14:00"},  // Saturday
		},
		acceptEmergencyPickups: true,
		emergencyQuantity: {  // could be null
			min: 10,  // in lbs
			max: 100  // in lbs
		},
		notifications: [
			{
				type: "recurring_pickup_request",  // Enums.NotificationType
				content: "-L5QoXeC_UrL5tRRED3e"  // key of DeliveryRequest
			},
			...
		]
	}


-----------------------------------------------------

DELIVERER GROUP ("/accounts/")

	// key = UID of the deliverer group's account
	R8BAHrxdkfQoAmfWvGa1OJmjQP43: {
		accountType: "deliverer_group"
		school: "RheaQY1WxJT03sTPQICFZ4STpfm1",  // uid-key of a school
		name: "Phi Sigma Ro",
		email: "phisigmaro@uw.edu",
		address: {
			street1: "124 Sesame St.",
			street2: "",
			city: "Seattle",
			state: "WA",
			zipcode: 98115
		},
		isVerified: true,
		isActivated: true,
		numVolunteers: 50,
		coordinator: {
			name: "Andy Duncan",
			email: "andyd@uw.edu",
			phone: 2064872859,
			position: "President"
		},
		notifications: [
			{
				type: "recurring_pickup_request",  // Enums.NotificationType
				content: "-L5QoXeC_UrL5tRRED3e"  // key of DeliveryRequest
			},
			...
		]
	}


-----------------------------------------------------

DELIVERY REQUEST ("/delivery_requests/")

	// key = auto generated key by firebase
	-L5QoXeC_UrL5tRRED3e: {
		startDate: "2018-02-28",
		duration: {
			type: "date",  // Enums.RequestDurationType
			value: "2018-05-30"  // a date for "date" or a number for "num_recurrences"
		},
		repeats: "weekly",	// values in Enums.RequestRepeatType
		startTime: "14:00",
		endTime: "17:00",
		primaryContact: "dhA03LwTp3cibXVUcb3nQqO34wj1",  // uid-key of a donating-agency-member
		notes: "Enter through the back door.",
		school: "RheaQY1WxJT03sTPQICFZ4STpfm1",  // uid-key of a school
		donatingAgency: "-K9HdKlCLjjk_ka82K0s",  // autogen-key of a donating-agency
		// receivingAgency & delivererGroups:
		// The donating agency can choose to request specific receiving agency
		// and/or deliverer group, or not.
		// a. If specified, the uid would be populated, but confirmed=false
		// b. It no specified, the uid would be null until someone claims this
		//    request.
		receivingAgency: {
			uid: "uGOFJ8NqHjbZhKAYzSZFRs1dSKD3",  // uid-key of a receiving-agency, could be null
			confirmed: true
		},
		delivererGroup: {
			uid: null,  // uid-key of a deliverer-group
			confirmed: false
		},
		requestTimeStamp: "1518753363763"
	}


-----------------------------------------------------

DELIVERY ("/deliveries/")

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


