import React, { Component } from 'react';
import './PageHeader.css';
import notification from '../icons/notification.svg';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import RecurringDeliveryRequestController from '../PageLayout/Notification/Recurring/RecurringDeliveryRequestController';
import Notification from './Notification/Notification';

class PageHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPopUp: false,
            notificationClicked: false,
            notifications: [],
            notification: null
        };

        this.notificationClicked = this.notificationClicked.bind(this);
        this.openPopUp = this.openPopUp.bind(this);
        this.closePopUp = this.closePopUp.bind(this);
    }
    componentDidMount() {
        //TODO: query db for notifications
        this.setState({
            notifications: [
                {
                    type: 'recurring_pickup_request',
                    content: '-L5QoXeC_UrL5tRRED3e'
                },
                {
                    type: 'recurring_pickup_confirmed',
                    content: '-XKSIDLeC_Uksd321e'
                },
                {
                    type: 'recurring_pickup_confirmed',
                    content: '-XKSIDLeC_Uksd321e'
                },
                {
                    type: 'recurring_pickup_request',
                    content: '-XKSIDLeC_Uksd321e'
                }
            ],

            // Dummy data for notification popup
            // mostly taken from schema.txt
            // added additional info in agencies
            notification: {
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
        });
    }

    openPopUp(index) {
        // TODO: backend populate notification popup info based on index
        this.setState({
            showPopUp: true,
            notificationClicked: false
        });
    }

    closePopUp() {
        this.setState({
            showPopUp: false
        });
    }

    notificationClicked() {
        this.setState(prevState => {
            return { notificationClicked: !prevState.notificationClicked };
        });
    }

    render() {
        return (
            <div className="page-container">
                <div className="flex">
                    <div className="header-title">
                        <img
                            src={this.props.logo}
                            className="page-logo"
                            alt="icon"
                        />
                        <p className="page-title">{this.props.title}</p>
                    </div>
                    <div style={{ height: '0px', marginTop: '40px' }}>
                        <NotificationBadge
                            count={this.state.notifications.length}
                            effect={Effect.SCALE}
                            frameLength={15.0}
                            style={{
                                position: 'inherit',
                                left: '20px',
                                top: '-10px'
                            }}
                        />
                        <img
                            onClick={this.notificationClicked}
                            src={notification}
                            className="notification-icon"
                            alt="icon"
                        />
                    </div>
                </div>
                <div className="popup-flex">
                    {/* this only shows notification */}
                    {this.state.notificationClicked &&
                        this.state.notifications.map((notification, i) => {
                            return (
                                !notification.claimed && (
                                    <Notification
                                        key={i}
                                        index={i}
                                        notificationType={notification.type}
                                        account={this.props.account.accountType}
                                        clickNotification={this.openPopUp}
                                    />
                                )
                            );
                        })}
                </div>
                <div className="modal-flex">
                    {this.state.showPopUp ?
                        <RecurringDeliveryRequestController
                            account={this.props.account}
                            details={this.state.notification}
                            closePopUp={this.closePopUp.bind(this)}/>
                        : null    
                    }
                </div>
            </div>
        );
    }
}

export default PageHeader;
