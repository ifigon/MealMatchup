import React, { Component } from 'react';
import firebase from './FirebaseConfig.js';
import { AccountType, PageContent } from './Enums.js';
import NavBar from './PageLayout/Navigation/NavBar.js';
import PageHeader from './PageLayout/PageHeader.js';
import logo from './icons/temp-logo.svg';
import RecurringPickupRequest from './PageContent/RequestPickup/RecurringPickupRequest.js';
import AssignVolunteersController from './PageContent/AssignVolunteers/AssignVolunteersController.js';
import Calendar from './PageContent/Calendar/Calendar.js';
// The page to load when user is signed in.
// Consist of the base page layout and page content depending on which tab is chosen.
// Default page content is Calendar.

class PageContainer extends Component {
    constructor(props) {
        // Props: content, account
        super(props);

        this.state = {
            content: props.content,
            donatingAgency: null
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
    }

    navBarHandler(e) {
        this.setState({
            content: e
        });
    }

    render() {
        // for the components that might need donating agency info
        let ready = (this.props.account.accountType !== AccountType.DONATING_AGENCY_MEMBER ||
            this.state.donatingAgency);
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

                {this.state.content === PageContent.CALENDAR && ready &&
                    <Calendar 
                        id="calendar-container" 
                        account={this.props.account}
                        donatingAgency={this.state.donatingAgency}
                    />
                }

                {this.state.content === PageContent.ASSIGN_VOLUNTEERS && (
                    <AssignVolunteersController 
                        account={this.props.account}
                    />
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
