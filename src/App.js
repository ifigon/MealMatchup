import React, { Component } from 'react';
import { auth, accountsRef } from './FirebaseConfig.js';
import { PageContent } from './Enums.js';
import PageContainer from './PageContainer.js';
import 'typeface-roboto';
import SignUpInController from './SignUpIn/SignUpInController.js';

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
            account: null
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
                        .once('value')
                        .then(
                            function(snapshot) {
                                var account = snapshot.val();
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

    render() {
        return (
            <div className="">
                {this.state.authenticated ? (
                    this.state.account ? (
                        /* Show Calendar page if user is logged in */
                        <PageContainer
                            account={this.state.account}
                            content={this.props.content}
                        />
                    ) : (
                        <SignUpInController
                            signInDenied={this.state.signInDenied}
                        />
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
