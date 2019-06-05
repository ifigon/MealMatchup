import React, { Component } from 'react';
import firebase, { auth, accountsRef } from '../../FirebaseConfig';
import { AccountType, StringFormat } from '../../Enums';
import '../SignUpIn.css';
import { formatPhone } from '../../utils/Utils';

class DonatingAgencyMemberSignup extends Component {
    // This component is for DA members to sign up under an existing DA.
    // This is only accessible by a direct link.

    constructor(props) {
        super(props);

        this.state = {
            agency: null
        };

        this.submitRegistration = this.submitRegistration.bind(this);
    }

    componentDidMount() {
        // TODO: grab agency info from the url, 
        // might need to deal with db read permissions
        var agency = {
            key: '-L8sSI7-dZU7RtakgVaZ',
            name: 'DA1 Test Signup',
            timezone: 'America/Los_Angeles'
        };

        this.setState({
            agency: agency
        });
    }

    submitRegistration(e) {
        e.preventDefault();
        var values = {
            name: e.target.memberName.value,
            email: e.target.memberEmail.value,
            phone: e.target.memberPhone.value,
            position: e.target.memberPosition.value,
        };

        auth.createUserWithEmailAndPassword(e.target.memberEmail.value, e.target.memberPassword.value)
            .then(user => {
                // write account to db
                // why doesn't settings write to db?
                var postData = {
                    accountType: AccountType.DONATING_AGENCY_MEMBER,
                    agency: this.state.agency.key,
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    position: values.position,
                    isAdmin: false,
                    isVerified: false, 
                    isActivated: false,
                    timezone: this.state.agency.timezone,
                };
            
                accountsRef.child(user.uid).set(postData);

                // add this new member to the DA's members list
                var dasRef = firebase.database().ref('donating_agencies');
                dasRef.child(this.state.agency.key).child('members').push(user.uid);

                // TODO: route back to App
            })
            .catch(error => {
                // TODO: Add UI to handle the error
                return error;
            });
    }

    comparePasswords(e) {
        var password = document.getElementById('memberPassword');
        var confirmPassword = document.getElementById('confirmPassword');
        if (e.target.value !== password.value) {
            confirmPassword.setCustomValidity('Passwords Don\'t Match');
        } else {
            confirmPassword.setCustomValidity('');
        }
    }

    render() {
        if (!this.state.agency) {
            return (
                // TODO: loading UI?
                <div></div>
            );
        }

        return (
            <div className="signup-wrapper">
                <div className="signup">
                    <form onSubmit={this.submitRegistration}>
                        <div className="signup-content">
                            <div className="form-block">
                                <label className="form-component">Joining: {this.state.agency.name}</label><br />
                                <label className="form-component">New Member Account</label><br />
                                <input name="memberName" type="text" className="form-component" placeholder="Name" id="memberName" required />
                                <input name="memberPosition" type="text" className="form-component" placeholder="Position" id="memberPosition" required />
                                <input name="memberPhone" onChange={formatPhone} type="tel" pattern={StringFormat.PHONE} className="form-component" placeholder="123-456-7890" id="memberPhone" required />
                                <div className="gap">
                                    <input type="email" name="memberEmail" id="memberEmail" className="form-component" placeholder="Email" required />
                                    <input type="password" id="memberPassword" name="memberPassword" className="form-component" placeholder="Create Password" required />
                                    <input type="password" id="confirmPassword" onChange={this.comparePasswords} className="form-component" placeholder="Confirm Password" required />
                                </div>
                            </div>

                            <div className="buttons">
                                <input type="reset" className="cancel" value="CANCEL"></input>
                                <input type="submit" className="next" value="DONE"></input>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default DonatingAgencyMemberSignup;