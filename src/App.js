import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { auth, accountsRef, donatingAgenciesRef } from './FirebaseConfig.js';
import PageContainer from './PageContainer.js';
import 'typeface-roboto';
import SignUpInController from './SignUpIn/SignUpInController.js';
import { AccountType, Routes, PageContent } from './Enums';
import './App.css';

// The main entry page to load when user is not signed in.
// Currently (win18), it is just the first page of sign in/up (select account type).
// Potentially, it would be “About” page in the future.
// For now, rendering sign up/in components

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // TODO: a hack to prevent showing logged out page first.. better way?
            authenticated: false,
            signInDenied: false,
            account: null,
            donatingAgency: null,
            isChrome: !!window.chrome && !!window.chrome.webstore
        };

        this.aggrAccount = this.aggrAccount.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
        // check whether user is logged in
        auth.onAuthStateChanged(
            function(user) {
                if (user) {
                    // grab and listen to user's account
                    accountsRef.child(user.uid).on('value', this.aggrAccount);
                } else {
                    this.setState({
                        authenticated: true,
                        signInDenied: false,
                        account: null,
                        donatingAgency: null
                    });
                }
            }.bind(this)
        );
    }

    aggrAccount(snapshot) {
        let account = snapshot.val();
        account.uid = snapshot.key;

        if (account.isVerified && account.isActivated) {
            // also grab and listen to the DA entity if user is DA member
            if (account.accountType === AccountType.DONATING_AGENCY_MEMBER) {
                donatingAgenciesRef.child(account.agency).on(
                    'value',
                    function(daSnap) {
                        let da = daSnap.val();
                        da.uid = daSnap.key;
                        this.setState({
                            authenticated: true,
                            signInDenied: false,
                            account: account,
                            donatingAgency: da
                        });
                    }.bind(this)
                );
            } else {
                this.setState({
                    authenticated: true,
                    signInDenied: false,
                    account: account,
                    donatingAgency: null
                });
            }
        } else {
            // account is not verified or activated, deny sign in
            this.setState({
                authenticated: true,
                signInDenied: true,
                account: null,
                donatingAgency: null
            });
            auth.signOut();
        }
    }

    signOut(event) {
        event.preventDefault();

        // IMPORTANT: it's important to detach the listener to the account
        // when signing out, since the App component will not unmount yet
        accountsRef.child(this.state.account.uid).off();
        if (this.state.donatingAgency) {
            donatingAgenciesRef.child(this.state.donatingAgency.uid).off();
        }
        auth.signOut();
    }

    componentWillUnmount() {
        if (this.state.account) {
            accountsRef.child(this.state.account.uid).off();
        }
        if (this.state.donatingAgency) {
            donatingAgenciesRef.child(this.state.donatingAgency.uid).off();
        }
    }

    render() {
        let path = window.location.href.split('/')[3];
        let content = '';
        switch (path) {
        case Routes.ASSIGN_VOLUNTEERS:
            content = PageContent.ASSIGN_VOLUNTEERS;
            break;
        case Routes.DIRECTORY:
            content = PageContent.DIRECTORY;
            break;
        case Routes.FOOD_LOGS:
            content = PageContent.FOOD_LOGS;
            break;
        case Routes.REQUEST_PICKUP:
            content = PageContent.REQUEST_PICKUP;
            break;
        case Routes.SETTINGS:
            content = PageContent.SETTINGS;
            break;
        case Routes.PENDING_ACCOUNTS:
            content = PageContent.PENDING_ACCOUNTS;
            break;
        default:
            content = PageContent.CALENDAR;
            break;
        }
        return (
            <div className="">
                {
                    !this.state.isChrome ? 
                        <div className="browser-check">
                        WARNING! You are using an UNSUPPORTED browser. Please use Google Chrome.
                        </div>
                        :
                        document.documentElement.clientWidth < 1400 ?
                            <div className="browser-check">
                        WARNING! Your browser is too small, use at your own risk.
                            </div>
                            :
                            null
                }
                {this.state.authenticated ? (
                    this.state.account ? (
                        /* Show Calendar page if user is logged in */
                        <div>
                            <PageContainer
                                account={this.state.account}
                                donatingAgency={this.state.donatingAgency}
                                content={content}
                                signOut={this.signOut}
                            />
                            {!path ? (
                                this.state.account.accountType ===
                                AccountType.UMBRELLA ? (
                                        <Redirect to={'/pending-accounts'} />
                                    ) : (
                                        <Redirect to={'/calendar'} />
                                    )
                            ) : null}
                        </div>
                    ) : (
                        <div>
                            <Redirect to={'/'} />
                            <SignUpInController
                                signInDenied={this.state.signInDenied}
                            />
                        </div>
                    )
                ) : (
                    /* Show blank page if initial authentication hasn't finished */
                    <div />
                )}
            </div>
        );
    }
}

export default App;
