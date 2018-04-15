import React, { Component } from 'react';
import moment from 'moment-timezone';
import '../SignUpIn.css';
import firebase, { accountsRef, auth } from '../../FirebaseConfig';
import DonatingAgencySignUp1 from './DonatingAgencySignUp1';
import DonatingAgencySignUp2 from './DonatingAgencySignUp2';
import SignUpComplete from '../SignUpComplete';
import UserTypeController from '../UserTypeController';
import { AccountType, UmbrellaId } from '../../Enums';

let fieldValues = {
    organizationName: null,
    address1: null,
    address2: null,
    city: null,
    state: '',
    zip: null,
    officeNumber: null,

    adminName: null,
    adminPosition: null,
    adminPhone: null,
    adminEmail: null,
    adminPassword: null
};

class DonatingAgencySignUpController extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 1
        };

        this.saveValues = this.saveValues.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.submitRegistration = this.submitRegistration.bind(this);
    }

    saveValues(fields) {
        return function () {
            // Remember, `fieldValues` is set at the top of this file, we are simply appending
            // to and overriding keys in `fieldValues` with the `fields` with Object.assign
            // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
            fieldValues = Object.assign({}, fieldValues, fields);
        }();
    }

    nextStep() {
        this.setState((prevState) => {
            return { step: prevState.step + 1 };
        });
    }

    previousStep() {
        this.setState((prevState) => {
            return { step: prevState.step - 1 };
        });
    }

    submitRegistration() {
        // Handle via ajax submitting the user data, upon
        // success return this.nextStop(). If it fails,
        // show the user the error but don't advance

        auth.createUserWithEmailAndPassword(fieldValues.adminEmail, fieldValues.adminPassword)
            .then(user => {
                let dasRef = firebase.database().ref('donating_agencies');
                let agencyKey = dasRef.push().key;
                let timezone = moment.tz.guess();

                let adminPostData = {
                    accountType: AccountType.DONATING_AGENCY_MEMBER,
                    agency: agencyKey,
                    name: fieldValues.adminName,
                    email: fieldValues.adminEmail,
                    phone: fieldValues.adminPhone,
                    position: fieldValues.adminPosition,
                    isAdmin: true,
                    isVerified: false,
                    isActivated: false,
                    timezone: timezone
                };

                let agencyPostData = {
                    // TODO: Manually setting this for now. In future, users should
                    // choose which umbrella they are signing up under.
                    umbrella: UmbrellaId.TEST,
                    name: fieldValues.organizationName,
                    address: {
                        street1: fieldValues.address1,
                        street2: fieldValues.address2,
                        city: fieldValues.city,
                        state: fieldValues.state,
                        zipcode: fieldValues.zip,
                        officeNo: fieldValues.officeNumber
                    },
                    timezone: timezone,
                    isVerified: false,
                    isActivated: false,
                    primaryContact: user.uid,
                    members: [user.uid]
                };

                // write account and agency to db
                accountsRef.child(user.uid).set(adminPostData);
                dasRef.child(agencyKey).set(agencyPostData);

                // add agency to umbrella
                accountsRef.child(UmbrellaId.TEST).child('donatingAgencies')
                    .push(agencyKey);

                // firebase's create account automatically signs the user in
                // we need to keep the user signed out since the account hasn't
                // been approved yet
                auth.signOut();
            })
            .catch(error => {
                // TODO: Add UI to handle the error
                return error;
            });

        this.nextStep();
    }

    showStep() {
        switch (this.state.step) {
        default:
            return <UserTypeController />;
        case 1:
            return <div className="signup">
                <div className="circle-wrapper">
                    <div className="circle"></div><div className="circle open"></div><div className="circle open"></div>
                </div>
                <DonatingAgencySignUp1 
                    fieldValues={fieldValues}
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                    saveValues={this.saveValues} />
            </div>;
        case 2:
            return <div className="signup">
                <div className="circle-wrapper">
                    <div className="circle open"></div><div className="circle "></div><div className="circle open"></div>
                </div>
                <DonatingAgencySignUp2 
                    fieldValues={fieldValues}
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                    submitRegistration={this.submitRegistration}
                    saveValues={this.saveValues} /></div>;
        case 3:
            return <SignUpComplete />;
        }
    }

    render() {
        return (
            <div className="signup-wrapper">
                {this.showStep()}
            </div>
        );
    }
}
export default DonatingAgencySignUpController;