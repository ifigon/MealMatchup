import React, { Component } from 'react';
import firebase from './FirebaseConfig.js';
import { AccountType, PageContent, DeliveryType } from './Enums.js';
import NavBar from './PageLayout/Navigation/NavBar.js';
import PageHeader from './PageLayout/PageHeader.js';
import EventCard from './PageContent/Calendar/EventCard.js';
import Dialog from './PageContent/Calendar/Dialog.js';
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
            donatingAgency: null,
            dialogOpen: false
        };

        this.navBarHandler = this.navBarHandler.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    openDialog() {
        this.setState({
            dialogOpen: true
        });
    }
    closeDialog() {
        this.setState({
            dialogOpen: false
        });
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
    }

    componentWillMount() {
        // TODO move this dummy data mocking to calendar
        let delivery = {
            eventType: DeliveryType.RECURRING,
            date: '11/14/2017',
            startTime: '10am',
            endTime: '12pm',
            donationDescription: [
                {
                    name: 'Baked beans',
                    amount: 15,
                    unit: 'lbs'
                },
                {
                    name: 'Coleslaw',
                    amount: 20,
                    unit: 'lbs'
                },
                {
                    name: 'Corn',
                    amount: 6,
                    unit: 'lbs'
                },
                {
                    name: 'Mashed potatoes',
                    amount: 8,
                    unit: 'lbs'
                },
                {
                    name: 'Veggie burger patties',
                    amount: 4,
                    unit: 'lbs'
                },
                {
                    name: 'Bread',
                    amount: 40,
                    unit: 'loaves'
                }
            ],
            receivingAgency: {
                name: 'Seattle Union Gospel Mission',
                contact: {
                    name: 'Chris Stack',
                    phone: '206-586-9876',
                    email: 'chrisstack@uniongospel.org'
                }
            },
            donatingAgency: {
                name: 'Local Point',
                contact: {
                    name: 'Andrea Benson',
                    phone: '206-543-6975',
                    email: 'bensoa3@uw.edu'
                }
            }
        };
        this.setState({
            delivery: delivery
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
                    account={this.props.account}
                    logo={logo}
                    title={this.props.account.name}
                />

                <NavBar
                    content={this.state.content}
                    accountType={this.props.account.accountType}
                    handler={this.navBarHandler}
                />

                {/* TODO: replace placeholder text with real components */}
                {this.state.content === PageContent.CALENDAR && (
                    <div style={{ marginTop: '120px', marginLeft: '250px' }}>
                        Calendar
                        {this.state.dialogOpen ? (
                            <Dialog
                                closeDialog={this.closeDialog}
                                delivery={this.state.delivery}
                                futureEvent={true}
                                accountOwnerName={this.props.account.name}
                                accountType={this.props.account.accountType}
                            />
                        ) : null}
                        <div onClick={this.openDialog}>
                            <EventCard
                                startTime={this.state.delivery.startTime}
                                endTime={this.state.delivery.endTime}
                                futureEvent={true}
                                eventType={this.state.delivery.eventType}
                            />
                        </div>
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
            </div>
        );
    }
}
export default PageContainer;
