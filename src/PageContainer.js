import React, { Component } from 'react';
import firebase from './FirebaseConfig.js';
import { AccountType, PageContent, DeliveryType } from './Enums.js';
import NavBar from './PageLayout/Navigation/NavBar.js';
import PageHeader from './PageLayout/PageHeader.js';
import NotificationPopup from './PageLayout/Notification/Notification';
import EventCard from './PageContent/Calendar/EventCard.js';
import logo from './icons/temp-logo.svg';
import RecurringPickupRequest from './PageContent/RequestPickup/RecurringPickupRequest.js';
import AssignVolunteersController from './PageContent/AssignVolunteers/AssignVolunteersController.js';
import RecurringDeliveryRequestController from './PageLayout/Notification/Recurring/RecurringDeliveryRequestController';

// The page to load when user is signed in.
// Consist of the base page layout and page content depending on which tab is chosen.
// Default page content is Calendar.

class PageContainer extends Component {
    constructor(props) {
        // Props: content, account
        super(props);

        this.state = {
            content: props.content,
            showPopUp: false,
            notificationClicked: false,
            notifications: [],
            donatingAgency: null,
            //TODO: backend update count when notification gets deleted/viewed/claimed/expired (?)
            // "They should stay in the notifications drop down until claimed or expired
            // If they don’t have to do with pickups, I’d give them a week until they 
            // expire from drop down or are removed"
            notificationCount: 4,
            notification: null
        };
        console.log(this.props.account.accountType);
        this.navBarHandler = this.navBarHandler.bind(this);
    }

    componentDidMount() {
        // grab the DA entity if user is DA member
        if (
            this.props.account.accountType ===
            AccountType.DONATING_AGENCY_MEMBER
        ) {
            var daRef = firebase
                .database()
                .ref('donating_agencies')
                .child(this.props.account.agency);
            daRef.once('value').then(
                function(daSnap) {
                    this.setState({
                        donatingAgency: daSnap.val()
                    });
                }.bind(this)
            );
        }

        //TODO: query db for notifications
        this.setState({
            notifications: [
                {
                    type: 'recurring_pickup_request',
                    content: '-L5QoXeC_UrL5tRRED3e',
                    claimed: false
                },
                {
                    type: 'recurring_pickup_confirmed',
                    content: '-XKSIDLeC_Uksd321e',
                    claimed: false
                },
                {
                    type: 'recurring_pickup_confirmed',
                    content: '-XKSIDLeC_Uksd321e',
                    claimed: false
                },
                {
                    type: 'recurring_pickup_request',
                    content: '-XKSIDLeC_Uksd321e',
                    claimed: false
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
                    claimed: 'R8BAHrxdkfQoAmfWvGa1OJmjQP43'  // uid-key of a DG (once a DG claims)
                },
                requestTimeStamp: 1518753363763,
                spawnedDeliveries: [
                    // individual deliveries that were created to fulfill this delivery request
                    '-L5RkIS0CSPuXpkewaqA'
                ]
            }
        });
    }

    openPopUp(){
        // TODO: backend populate notification popup info
        this.setState({
            showPopUp: true,
            notificationClicked: false
        });
    }

    closePopUp(){
        this.setState({
            showPopUp: false
        });
    }

    notificationClicked(){
        this.setState((prevState) => {
            return {notificationClicked: !prevState.notificationClicked};
        });
    }

    navBarHandler(e) {
        this.setState({
            content: e
        });
    }

    render() {
        return (
            <div>
                <PageHeader 
                    notificationClicked={this.notificationClicked.bind(this)} 
                    logo={logo} 
                    title={this.props.account.name} 
                    notificationCount={this.state.notificationCount}/>

                <NavBar
                    content={this.state.content}
                    accountType={this.props.account.accountType}
                    handler={this.navBarHandler}
                />

                {/* TODO: replace placeholder text with real components */}
                {this.state.content === PageContent.CALENDAR && (
                    <div style={{ marginTop: '120px', marginLeft: '250px' }}>
                        Calendar
                        <EventCard
                            eventType={DeliveryType.RECURRING}
                            startTime="10am"
                            endTime="12pm"
                            futureEvent={true}
                        />
                    </div>
                )}

                {this.state.content === PageContent.ASSIGN_VOLUNTEERS && (
                    <AssignVolunteersController />
                )}

                {this.state.content === PageContent.REQUEST_PICKUP &&
                    (this.state.donatingAgency ? (
                        /* Wait for donating agency to be fetched */
                        <RecurringPickupRequest
                            account={this.props.account}
                            donatingAgency={this.state.donatingAgency}
                        />
                    ) : (
                        /* TODO: add loading UI? */
                        <div />
                    ))}

                {this.state.content === PageContent.FOOD_LOGS && (
                    <div style={{ marginTop: '120px', marginLeft: '250px' }}>
                        Food Logs
                    </div>
                )}

                {this.state.content === PageContent.DIRECTORY && (
                    <div style={{ marginTop: '120px', marginLeft: '250px' }}>
                        Directory
                    </div>
                )}

                {this.state.content === PageContent.SETTINGS && (
                    <div style={{ marginTop: '120px', marginLeft: '250px' }}>
                        Settings
                    </div>
                )}
                <div className="notification-flex">
                    {/* this only shows notification */}
                    {this.state.notificationClicked &&
                        this.state.notifications.map((notification, i) => {
                            return !notification.claimed && 
                                <NotificationPopup 
                                    key={i}
                                    notificationType={notification.type} 
                                    account={this.props.account.accountType}
                                    clickNotification={this.openPopUp.bind(this)}/>;
                        })
                    }
                </div>
                <div className="popup-flex">
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
export default PageContainer;
