import React, { Component } from 'react';
import firebase from './FirebaseConfig.js';
import { AccountType, PageContent } from './Enums.js';
import NavBar from './PageLayout/Navigation/NavBar.js';
import PageHeader from './PageLayout/PageHeader.js';
import logo from './icons/temp-logo.svg';
import RequestPickupWrapper from './PageContent/RequestPickup/RequestPickupWrapper.js';
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
            content: this.props.content,
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

    componentWillReceiveProps(props) {
        this.setState({
            content: props.content
        });
    }
    render() {
        // wait for all data to come through
        let ready =
            this.props.account.accountType !==
                AccountType.DONATING_AGENCY_MEMBER || this.state.donatingAgency;
        if (!ready) {
            return null;
        }

        const { account } = this.props;
        const { content, donatingAgency } = this.state;

        let pageTitle;
        if (account.accountType === AccountType.DONATING_AGENCY_MEMBER) {
            pageTitle = donatingAgency.name;
        } else {
            pageTitle = account.name;
        }

        return (
            <div>
                <PageHeader account={account} logo={logo} title={pageTitle} />

                <NavBar
                    content={content}
                    accountType={account.accountType}
                    handler={this.navBarHandler}
                />

                {content === PageContent.CALENDAR && (
                    <Calendar
                        id="calendar-container"
                        account={account}
                        donatingAgency={donatingAgency}
                    />
                )}

                {content === PageContent.ASSIGN_VOLUNTEERS && (
                    <AssignVolunteersController account={account} />
                )}

                {content === PageContent.REQUEST_PICKUP && (
                    <RequestPickupWrapper
                        account={this.props.account}
                        donatingAgency={this.state.donatingAgency}
                    />
                )}

                {content === PageContent.FOOD_LOGS && (
                    <div style={{ marginTop: '120px', marginLeft: '250px' }}>
                        Feature coming soon!
                    </div>
                )}

                {content === PageContent.DIRECTORY && (
                    <div style={{ marginTop: '120px', marginLeft: '250px' }}>
                        Feature coming soon!
                    </div>
                )}

                {content === PageContent.SETTINGS && (
                    <div style={{ marginTop: '120px', marginLeft: '250px' }}>
                        Feature coming soon!
                    </div>
                )}
            </div>
        );
    }
}
export default PageContainer;
