import React, {Component} from 'react';
import moment from 'moment-timezone';
import '../SignUpIn.css';
import { accountsRef, auth } from '../../FirebaseConfig.js';
import ReceivingAgencySignUp1 from './ReceivingAgencySignUp1';
import ReceivingAgencySignUp2 from './ReceivingAgencySignUp2';
import ReceivingAgencySignUp3 from './ReceivingAgencySignUp3';
import ReceivingAgencySignUp4 from './ReceivingAgencySignUp4';
import SignUpComplete from '../SignUpComplete';
import UserTypeController from '../UserTypeController';
import { AccountType } from '../../Enums';

let fieldValues = {
    organizationName: null,
    address1: null,
    address2: null,
    city: null,
    state: '',
    zip: null,
    officeNumber: null,
    umbrella: null,

    email: null,
    password: null,

    availabilities: null,
    emergencyAvailable: false,
    startLbs: null,
    endLbs: null,

    primaryName: null,
    primaryEmail: null,
    primaryPhone: null,
    primaryPosition: null,
    secondaryName: null,
    secondaryEmail: null,
    secondaryPhone: null,
    secondaryPosition: null

};

class ReceivingAgencySignUpController extends Component {
    constructor(props){
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

    nextStep () {
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
        console.log('test 3');
        auth.createUserWithEmailAndPassword(fieldValues.email, fieldValues.password)
            .then(user => {   
                console.log('test');
                let postData = {
                    accountType: AccountType.RECEIVING_AGENCY,
                    umbrella: fieldValues.umbrella,
                    name: fieldValues.organizationName,
                    email: fieldValues.email,
                    address: {
                        street1: fieldValues.address1,
                        street2: fieldValues.address2,
                        city: fieldValues.city,
                        state: fieldValues.state,
                        zip: fieldValues.zip,
                        officeNumber: fieldValues.officeNumber
                    },
                    timezone: moment.tz.guess(),
                    isVerified: false,
                    isActivated: false,
                    primaryContact: {
                        name: fieldValues.primaryName,
                        email: fieldValues.primaryEmail,
                        phone: fieldValues.primaryPhone,
                        position: fieldValues.primaryPosition
                    },
                    secondaryContact: {
                        name: fieldValues.secondaryName,
                        email: fieldValues.secondaryEmail,
                        phone: fieldValues.secondaryPhone,
                        position: fieldValues.secondaryPosition
                    },
                    // TODO: Use a loop here instead
                    availabilities: fieldValues.availabilities,
                    acceptEmergencyPickups: fieldValues.emergencyAvailable,
                    emergencyQuantity: {
                        min: fieldValues.startLbs,
                        max: fieldValues.endLbs
                    }
                };

                // write account to db
                accountsRef.child(user.uid).set(postData);
                console.log(user.uid);
                // add agency to umbrella
                accountsRef.child(fieldValues.umbrella).child('receivingAgencies')
                    .push(user.uid);

                // firebase's create account automatically signs the user in
                // we need to keep the user signed out since the account hasn't
                // been approved yet
                auth.signOut();

                this.nextStep();
            })
            .catch(error => {
                this.setState({ error: error.message });
            });
    }

    showStep() {
        switch (this.state.step) {
        default:
            return <UserTypeController/>;
        case 1:
            return <div className="signup">
                <div className="circle-wrapper">
                    <div className="circle"></div><div className="circle open"></div><div className="circle open"></div><div className="circle open"></div>
                </div>
                <ReceivingAgencySignUp1 fieldValues={fieldValues}
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                    saveValues={this.saveValues} />
            </div>;
        case 2:
            return <div className="signup">
                <div className="circle-wrapper">
                    <div className="circle open"></div><div className="circle"></div><div className="circle open"></div><div className="circle open"></div>
                </div>
                <ReceivingAgencySignUp2 fieldValues={fieldValues}
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                    saveValues={this.saveValues} /></div>;

        case 3:
            return <div className="signup">
                <div className="circle-wrapper">
                    <div className="circle open"></div><div className="circle open"></div><div className="circle"></div><div className="circle open"></div>
                </div>
                <ReceivingAgencySignUp3 fieldValues={fieldValues}
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                    saveValues={this.saveValues} /></div>;

        case 4:
            return <div className="signup">
                <div className="circle-wrapper">
                    <div className="circle open"></div><div className="circle open"></div><div className="circle open"></div><div className="circle"></div>
                </div>
                <ReceivingAgencySignUp4 fieldValues={fieldValues}
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                    submitRegistration={this.submitRegistration}
                    saveValues={this.saveValues}
                    error={this.state.error} /></div>;

        case 5:
            return <SignUpComplete fieldValues={fieldValues} />;
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
export default ReceivingAgencySignUpController;