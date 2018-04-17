import React, { Component } from 'react';
import './Popup.css';
import RecurringRequestController from './Recurring/RecurringRequestController';
import close from '../../icons/cross-out.svg';
import { NotificationType } from '../../Enums';

class NotificationDetailsController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {
                status: 'pending',  // Enums.RequestStatus
                startTimestamp: 1519826400,  // start date + start hour
                endTimestamp: 1527688800,    // end date + end hour
                endCriteria: {
                    type: 'date',  // Enums.RequestEndCriteriaType
                    value: '2018-02-09'  // a date for "date" or a number for "num_occurrences"
                },
                repeats: 'weekly',	// values in Enums.RequestRepeatType
                primaryContact: 'dhA03LwTp3cibXVUcb3nQqO34wj1',  // uid-key of a donating-agency-member
                notes: 'Enter through the back door.',
                umbrella: 'RheaQY1WxJT03sTPQICFZ4STpfm1',  // uid-key of a umbrella
                donatingAgency: '-K9HdKlCLjjk_ka82K0s',  // autogen-key of a donating-agency
                requester: 'Andrea Benson',  // name of a donating-agency-member
                // receivingAgency & delivererGroups:
                // The donating agency can choose to request specific receiving agency
                // and/or deliverer group, or not.
                // a. If specified, 'requested' field will be the uid-key of that RA
                // b. It not specified, all RA/DG uids in this umbrella will be added to 'pending'
                receivingAgency: {
                    // Depending on the status of the request, this
                    // map will have 1 out of the 3 possible fields:
                    // "requested", "pending" (list), "claimed"
                    requested: 'uGOFJ8NqHjbZhKAYzSZFRs1dSKD3',  // uid-key of a RA
                    // OR
                    pending: [  
                        'uGOFJ8NqHjbZhKAYzSZFRs1dSKD3',  // uid-key of all RAs
                    ],
                    // OR
                    claimed: 'uGOFJ8NqHjbZhKAYzSZFRs1dSKD3',  // uid-key of a RA (once a RA claims)
                    // ADDED FOR DUMMY DATA
                    name: 'Seattle Gospel Union Mission',
                    address: {
                        street1: '3802 South Othello Street',
                        street2: '',
                        city: 'Seattle',
                        state: 'WA',
                        zipcode: 98118,
                        officeNo: ''
                    },
                    primaryContact: {
                        name: 'Amy Powell',
                        email: 'amy.powell@uw.edu',
                        phone: '206-333-2343',
                        position: 'Manager'
                    }
                },
                // ADDED FOR DUMMY DATA
                donatingAgencyDetails: {
                    name: 'Local Point',
                    primaryContact: {
                        name: 'Andrea Benson',
                        email: 'AndreaIsCool@uw.edu',
                        phone: '206-586-9876',
                        position: 'Manager'
                    },
                    address: {
                        street1: '1201 NE Campus Pkwy',
                        street2: '',
                        city: 'Seattle',
                        state: 'WA',
                        zipcode: 98105,
                        officeNo: '220'
                    }
                },
                delivererGroup: {
                    // same as receivingAgency above:
                    requested: 'R8BAHrxdkfQoAmfWvGa1OJmjQP43',  // uid-key of a DG
                    // OR
                    pending: [
                        'R8BAHrxdkfQoAmfWvGa1OJmjQP43',  // uid-key of all DGs
                    ],
                    // OR
                    claimed: 'R8BAHrxdkfQoAmfWvGa1OJmjQP43',  // uid-key of a DG (once a DG claims)
                    // ADDED FOR DUMMY DATA
                    deliverers: [
                        // {
                        //     name: 'Alice',
                        //     email: 'alice@uw.edu',
                        //     phone: '123-789-4560'
                        // },
                        // {
                        //     name: 'Chris',
                        //     email: 'chris@uw.edu',
                        //     phone: '456-123-0789'
                        // }
                    ]
                },
                requestTimeStamp: 1518753363763,
                spawnedDeliveries: [
                    // individual deliveries that were created to fulfill this delivery request
                    '-L5RkIS0CSPuXpkewaqA'
                ]
            
            }
        };
    }

    componentDidMount(){
        //TODO: Query for notification based on {this.props.notifcation.content}
    }

    render() {
        return (
            <div className="popup-wrapper recurring">
                <img className="close" src={close} alt="close" onClick={this.props.closePopUp} />
                {
                    this.props.notification.type === NotificationType.RECURRING_PICKUP_REQUEST && 
                    <RecurringRequestController
                        details={this.state.details}
                        closePopUp={this.props.closePopUp.bind(this)}
                        account={this.props.account}/>
                }
                {
                    this.props.notification.type === NotificationType.RECURRING_PICKUP_CONFIRMED &&
                    <h1>Recurring pickup: {this.props.notification.content} is confirmed.</h1>
                }
            </div>
        );
    }
}

export default NotificationDetailsController;