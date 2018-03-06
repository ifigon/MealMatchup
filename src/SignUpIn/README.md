SignUpInController:
    default: SignUpIn
        (Choose Sign Up or Sign In)
    case 1: SignIn
    case 2: UserTypeController
        default: UserTypeSignUp
            (Allows user to choose the user type by updating the state to the state of that user type in the switch statement)
        case 1: DelivererGroupSignUpController
            default: UserTypeController 
                (So that a user can go back and shoot another user type)
            case 1: DelivererGroupSignUp1
                (Page 1 of the sign up form)
                data = {
                    organizationName,
                    numVolunteers,
                    address1,
                    address2,
                    city,
                    state
                }
            case 2: DelivererGroupSignUp2
                (Page 2 of the sign up form)
                data = {
                    email,
                    password,
                    contactName,
                    contactPosition,
                    contactEmail,
                    contactNumber
                }
            case 3: SignUpComplete
                (Handles submitting the form)
        case 2: ReceivingAgencySignUpController
            default: UserTypeController 
                (So that a user can go back and shoot another user type)
            case 1: ReceivingAgencySignUp1
                (Page 1 of sign up form)
                data = {
                    organizationName,
                    address1,
                    address2,
                    city,
                    state,
                    officeNumber
                }
            case 2: ReceivingAgencySignUp2
                (Page 2 of sign up form)
                data = {
                    email,
                    password
                }
            case 3: ReceivingAgencySignUp3
                (Page 3 of sign up form)
                data = {
                    (start and end times for pick up availability)
                    monStart,
                    monEnd,
                    tueStart,
                    tueEnd,
                    wedStart,
                    wedEnd,
                    thurStart,
                    thurEnd,
                    friStart,
                    friEnd,
                    satStart,
                    satEnd,
                    sunStart,
                    sunEnd,
                    startLbs,
                    endLbs
                }
            case 4: ReceivingAgencySignUp4
                (Page 4 of sign up form)
                data = {
                    primaryName,
                    primaryEmail,
                    primaryPhone,
                    primaryPosition,
                    secondaryName,
                    secondaryEmail,
                    secondaryPhone,
                    SecondaryPosition
                }
            case 5: SignUpComplete
                (Handles submit form)
        case 3: DonatingAgencySignUpController
            default: UserTypeController 
                (So that a user can go back and shoot another user type)
            case 1: DonatingAgencySignUp1
                (Page 1 of sign up form)
                data = {
                    organizationName,
                    address1,
                    address2,
                    city,
                    state,
                    officeNumber
                }
            case 2: DonatingAgencySignUp2
                (Page 2 of sign up form)
                data = {
                    adminEmail,
                    adminPassword,
                    adminName,
                    adminPhone,
                    adminPosition,
                    secondaryName,
                    secondaryEmail,
                    secondaryPhone,
                    SecondaryPosition
                }
            case 3: DonatingAgencySignUp3
                (Page 3 of sign up form)
                data = {
                    memberName,
                    memberPosition,
                    memberPhone,
                    memberEmail,
                    memberPassword
                }
            case 4: SignUpComplete
                (Handles submit form)

