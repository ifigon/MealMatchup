import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { auth, accountsRef } from './FirebaseConfig.js';
import PageContainer from './PageContainer.js';
import 'typeface-roboto';
import SignUpInController from './SignUpIn/SignUpInController.js';
import { Routes, PageContent } from './Enums';
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
            isChrome: !!window.chrome && !!window.chrome.webstore
        };
    }

    componentDidMount() {
        // check whether user is logged in
        auth.onAuthStateChanged(
            function(user) {
                if (user) {
                    // grab user's account object
                    accountsRef
                        .child(user.uid)
                        .on('value',  // continually listens changes on this account
                            function(snapshot) {
                                var account = snapshot.val();
                                account.uid = user.uid;
                                if (account.isVerified && account.isActivated) {
                                    this.setState({
                                        authenticated: true,
                                        account: account
                                    });
                                } else {
                                    // account is not verified or activated, deny sign in
                                    this.setState({
                                        authenticated: true,
                                        signInDenied: true
                                    });
                                    auth.signOut();
                                }
                            }.bind(this)
                        );
                } else {
                    this.setState({
                        authenticated: true,
                        account: null
                    });
                }
            }.bind(this)
        );
    }

    componentWillUnmount() {
        if (this.state.account) {
            accountsRef.child(this.state.account.uid).off();
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
                        null
                }
                {this.state.authenticated ? (
                    this.state.account ? (
                        /* Show Calendar page if user is logged in */
                        <div>
                            <PageContainer
                                account={this.state.account}
                                content={content}
                            />
                            {!path ? <Redirect to={'/calendar'} /> : null}
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