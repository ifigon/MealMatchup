import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { auth, accountsRef, donatingAgenciesRef } from './FirebaseConfig.js';
import PageContainer from './PageContainer.js';
import 'typeface-roboto';
import SignUpInController from './SignUpIn/SignUpInController.js';
import { AccountType, Routes, PageContent } from './Enums';
import { Auth } from './context/Auth';
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
            isActivated: false,
            isVerified: false,
            signInDenied: false,
            account: null,
            donatingAgency: null,
            isChrome: !!window.chrome && !!window.chrome.webstore
        };

        this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
        // check whether user is logged in
        // auth.onAuthStateChanged(this.handleAuth);
        auth.onAuthStateChanged((user) => {
            if (user) {
                // grab and listen to user's account
                accountsRef
                    .child(user.uid)
                    .on('value', this.deserializeUser);
            } else {
                this.setState({ authenticated: true });
            }
        });
    }

    deserializeUser = (snapshot) => {
        let account = snapshot.val();
        account.uid = snapshot.key;
        // Destructure user authN / authZ properties
        const { isActivated, isVerified, isAdmin, accountType } = account;
        // Handle unauthorized users
        if (!isActivated) {
            console.warn('Not Activated - toast user');
            return this.handleUnauthorized(account);
        } else if (!isVerified) {
            console.warn('Not Verified - toast user');
            return this.handleUnauthorized(account);
        }
        // Hydrate special accounttype data
        switch (accountType) {
        case AccountType.DONATING_AGENCY_MEMBER:
            donatingAgenciesRef
                .child(account.agency)
                .on('value', (daSnap) => {
                    let donatingAgency = daSnap.val();
                    donatingAgency.uid = daSnap.key;
                    this.setState({
                        account,
                        isActivated,
                        isVerified,
                        authenticated: true,
                        signInDenied: false,
                        donatingAgency
                    });
                });
            break;
        default:
            this.setState({
                account,
                isActivated,
                isVerified,
                authenticated: true,
                signInDenied: false,
                donatingAgency: null,
            });
        }
    }

    handleUnauthorized = (account = {}) => {
        const { uid, isActivated, isVerified } = account;
        this.setState({
            authenticated: true,
            signInDenied: (!isActivated || !isVerified),
            account: null,
            donatingAgency: null,
        });
        if (uid) auth.signOut();
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
        const {
            isChrome,
            account, donatingAgency,
            authenticated, isVerified, isActivated,
            signInDenied
        } = this.state;
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
        default:
            content = PageContent.CALENDAR;
            break;
        }
        return (
            <Auth.Provider value={this.state}>
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
                {authenticated ? (
                    account ? (
                        /* Show Calendar page if user is logged in */
                        <div>
                            <PageContainer
                                account={account}
                                donatingAgency={donatingAgency}
                                content={content}
                                signOut={this.signOut}
                            />
                            {!path ? <Redirect to={'/calendar'} /> : null}
                        </div>
                    ) : (
                        <div>
                            <Redirect to={'/'} />
                            <SignUpInController
                                account={account}
                                isActivated={isActivated}
                                isVerified={isVerified}
                                signInDenied={signInDenied}
                            />
                        </div>
                    )
                ) : (
                    /* Show blank page if initial authentication hasn't finished */
                    <div />
                )}
            </Auth.Provider>
        );
    }
}

export default App;