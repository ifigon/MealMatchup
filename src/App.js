import React, { Component } from 'react';
import firebase, { auth } from './FirebaseConfig.js';
import RecurringPickupRequest from './PageContent/RequestPickup/RecurringPickupRequest'
import { PageContent } from './Enums.js';
import PageContainer from './PageContainer.js';
import "typeface-roboto";

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
            account: null
        };
    }

    componentDidMount() {
        // check whether user is logged in
        auth.onAuthStateChanged(function(user) {
            if (user) {
                var accountRef = firebase.database().ref('accounts').child(user.uid);
                accountRef.once('value').then(function(snapshot) {
                    this.setState({
                        authenticated: true,
                        account: snapshot.val()
                    });
                }.bind(this));

                console.log("logged in");
            } else {
                this.setState({
                    authenticated: true,
                    account: null
                });
                console.log("not logged in");
            }   
        }.bind(this));
    }

    // ======================= Temporary Testing Code ========================
    tempSignIn(event) {
        event.preventDefault();

        var testEmail = "";
        var accountType = event.target.accountType.value;
        if (accountType === "DAMember") {
            testEmail = "testdonate1member1@test.com";
        } else if (accountType === "RA") {
            testEmail = "testreceiving@test.com";
        } else {
            testEmail = "testdeliverergroup@test.com";
        }
        auth.signInWithEmailAndPassword(testEmail, "123456").then(function(user) {
            console.log("Signed in with " + testEmail);
            console.log("User.uid: " + user.uid);
        }).catch(function(error) {
            var errorMessage = error.message;
            console.log("Sign in ERROR: " + errorMessage);
        });
    }

    tempSignOut(event) {
        event.preventDefault();
        auth.signOut();
    }
    // ====================== End Temporary Testing Code ======================
    

    render() {
        return (
            <div className="">
                {this.state.authenticated ?
                    (this.state.account ?
                        <div>
                            {/* Show Calendar page if user is logged in */}
                            <PageContainer 
                                account={this.state.account}
                                content={PageContent.CALENDAR}
                                >
                            </PageContainer>


                            {/* ============= Temp Testing Code ============= */}
                            {/* <form 
                                onSubmit={this.tempSignOut.bind(this)}
                                style={{marginLeft: 210 + 'px'}}>
                                <input type="submit" value="Test SignOut" />
                            </form> */}
                            {/* <RecurringPickupRequest account={this.state.account}></RecurringPickupRequest> */}
                            {/* ============= End Testing Code ============= */}
                        </div>
                    :
                        /* Show landing page if user is logged out */

                        /* ============= Temp Testing Code ============= */
                        /* TODO: 
                         * 1. Replace the temp debug signin with SignUpIn page 
                         * 2. Remove tempSignIn function
                         */
                        <form onSubmit={this.tempSignIn.bind(this)}>
                            <label>Test Account Type<br/>
                                <input type="radio" name="accountType" value="DAMember" />Donating Agency Member<br/>
                                <input type="radio" name="accountType" value="RA" />Receiving Agency<br/>
                                <input type="radio" name="accountType" value="DG" />Deliverer Group
                            </label><br/>
                            <input type="submit" value="Test SignIn" />
                        </form>
                        /* ============= End Testing Code ============= */
                    )
                :
                <div></div>
                }
                    
                
            </div>
        );
    }
}

export default App;
