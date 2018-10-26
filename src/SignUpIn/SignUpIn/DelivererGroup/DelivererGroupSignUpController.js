import React, { Component } from 'react';
import moment from 'moment-timezone';
import '../SignUpIn.scss';
import { accountsRef, auth } from '../../FirebaseConfig.js';
import DelivererGroupSignUp1 from './DelivererGroupSignUp1';
import DelivererGroupSignUp2 from './DelivererGroupSignUp2';
import SignUpComplete from '../SignUpComplete';
import UserTypeController from '../UserTypeController';
import { AccountType } from '../../Enums';
import UMBRELLA_ID from '../../UmbrellaConfig';

let fieldValues = {
    organizationName: null,
    numVolunteers: null,
    address1: null,
    address2: null,
    city: null,
    state: '',
    zip: null,

    email: null,
    password: null,
    contactName: null,
    contactPosition: null,
    contactEmail: null,
    contactNumber: null,
};

class DelivererGroupSignUpController extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            error: '',
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
        
        auth.createUserWithEmailAndPassword(fieldValues.email, fieldValues.password)
            .then(user => {
                // create the account
                let postData = {
                    accountType: AccountType.DELIVERER_GROUP,
                    // TODO: Manually setting this for now. In future, users should
                    // choose which umbrella they are signing up under.
                    umbrella: UMBRELLA_ID,
                    name: fieldValues.organizationName,
                    email: fieldValues.email,
                    address: {
                        street1: fieldValues.address1,
                        street2: fieldValues.address2,
                        city: fieldValues.city,
                        state: fieldValues.state,
                        zip: fieldValues.zip
                    },
                    timezone: moment.tz.guess(),
                    primaryContact: {
                        name: fieldValues.contactName,
                        email: fieldValues.contactEmail,
                        phone: fieldValues.contactNumber,
                        position: fieldValues.contactPosition
                    },
                    numVolunteers: fieldValues.numVolunteers,
                    isActivated: false,
                    isVerified: false
                };

                // write account to db
                accountsRef.child(user.uid).set(postData);

                // add account to umbrella
                accountsRef.child(UMBRELLA_ID).child('delivererGroups')
                    .push(user.uid);

                // firebase's create account automatically signs the user in
                // we need to keep the user signed out since the account hasn't
                // been approved yet
                auth.signOut();

                this.nextStep();
            }).catch(error => {
                this.setState({ error: error.message });
            });

    }

    showStep() {
        switch (this.state.step) {
        case 1:
            return <div className="signup">
                <div className="circle-wrapper">
                    <div className="circle"></div><div className="circle open"></div>
                </div>
                <DelivererGroupSignUp1 fieldValues={fieldValues}
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                    saveValues={this.saveValues} />
            </div>;
        case 2:
            return <div className="signup">
                <div className="circle-wrapper">
                    <div className="circle open"></div><div className="circle "></div>
                </div>
                <DelivererGroupSignUp2 fieldValues={fieldValues}
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                    submitRegistration={this.submitRegistration}
                    saveValues={this.saveValues}
                    error={this.state.error} /></div>;
        case 3:
            return <SignUpComplete fieldValues={fieldValues} />;
        default:
            return <UserTypeController />;
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
export default DelivererGroupSignUpController;