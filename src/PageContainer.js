import React, { Component } from 'react';
import { AccountType, PageContent } from './Enums.js';
import NavBar from './PageLayout/Navigation/NavBar.js';
import PageHeader from './PageLayout/PageHeader.js';
import logo from './icons/temp-logo.svg';
import Directory from './PageContent/Directory/DirectoryPage.js';
import RecurringPickupRequest from './PageContent/RequestPickup/RecurringPickupRequest.js';
import AssignVolunteersController from './PageContent/AssignVolunteers/AssignVolunteersController.js';
import Calendar from './PageContent/Calendar/Calendar.js';
import FoodLogs from './PageContent/FoodLogs/FoodLogsContainer.js';
import Settings from './PageContent/Settings/Settings.js';
import PendingAccounts from './PageContent/PendingAccounts/PendingAccounts';
import PageDoesNotExist from './PageContent/PageDoesNotExist/PageDoesNotExist';
import AddUmbrella from './PageContent/Admin/AddUmbrella';
// The page to load when user is signed in.
// Consist of the base page layout and page content depending on which tab is chosen.
// Default page content is Calendar.

class PageContainer extends Component {
    constructor(props) {
        // Props: content, account, donatingAgency, signOut function
        super(props);

        this.state = {
            content: this.props.content,
        };

        this.navBarHandler = this.navBarHandler.bind(this);
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
        const { account, donatingAgency } = this.props;
        const { content } = this.state;

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
                    signOut={this.props.signOut}
                />

                {content === PageContent.CALENDAR &&
                    (account.accountType !== AccountType.UMBRELLA ? (
                        <Calendar
                            id="calendar-container"
                            account={account}
                            donatingAgency={donatingAgency}
                        />
                    ) : (
                        <PageDoesNotExist />
                    ))}

                {content === PageContent.PENDING_ACCOUNTS &&
                    (account.accountType === AccountType.UMBRELLA ? (
                        <PendingAccounts
                            id="calendar-container"
                            account={account}
                            donatingAgency={donatingAgency}
                        />
                    ) : (
                        <PageDoesNotExist />
                    ))}

                {content === PageContent.ASSIGN_VOLUNTEERS &&
                    (account.accountType === AccountType.DELIVERER_GROUP ? (
                        <AssignVolunteersController account={account} />
                    ) : (
                        <PageDoesNotExist />
                    ))}

                {content === PageContent.REQUEST_PICKUP &&
                    (account.accountType ===
                    AccountType.DONATING_AGENCY_MEMBER ? (
                            <RecurringPickupRequest
                                account={account}
                                donatingAgency={donatingAgency}
                            />
                        ) : (
                            <PageDoesNotExist />
                        ))}

                {content === PageContent.FOOD_LOGS && (
                    <FoodLogs account={account} />
                )}

                {content === PageContent.ADD_UMBRELLA && (
                    (account.accountType ===
                    AccountType.ADMIN ? (
                        <AddUmbrella account={account} />
                    ) : (
                        <PageDoesNotExist />
                    ))
                )}

                {this.state.content === PageContent.DIRECTORY &&
                    <Directory account={this.props.account} />
                }

                {this.state.content === PageContent.SETTINGS && (
                    <Settings 
                        account={this.props.account}
                    />
                )}
            </div>
        );
    }
}
export default PageContainer;
