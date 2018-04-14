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
            notificationCount: 2
        };

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
                    claimed: true
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
            ]
        });
    }

    openPopUp(){
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
                    //TODO: update count when notification gets deleted/viewed/claimed (?)
                    notificationCount={this.state.notifications.length}/>

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
                <div className="popup-flex">
                    {/* this only shows notification */}
                    {this.state.notificationClicked &&
                        this.state.notifications.map((notification, i) => {
                            return !notification.claimed && 
                                <NotificationPopup 
                                    notificationType={notification.type} 
                                    account={this.props.account.accountType}
                                    clickNotification={this.openPopUp.bind(this)}/>;
                        })
                    }
                </div>
            </div>
        );
    }
}
export default PageContainer;
