import React, {Component} from 'react';
import '../SignUpIn.css';
import firebase from '../../FirebaseConfig.js';
import ReceivingAgencySignUp1 from './ReceivingAgencySignUp1';
import ReceivingAgencySignUp2 from './ReceivingAgencySignUp2';
import ReceivingAgencySignUp3 from './ReceivingAgencySignUp3';
import ReceivingAgencySignUp4 from './ReceivingAgencySignUp4';
import SignUpComplete from '../SignUpComplete';
import UserTypeController from '../UserTypeController';
import { NotificationType } from '../../Enums';

let fieldValues = {
    organizationName: null,
    address1: null,
    address2: null,
    city: null,
    state: null,
    zip: null,
    officeNumber: null,

    email: null,
    password: null,

    monStart: null,
    monEnd: null,
    tueStart: null,
    tueEnd: null,
    wedStart: null,
    wedEnd: null,
    thurStart: null,
    thurEnd: null,
    friStart: null,
    friEnd: null,
    satStart: null,
    satEnd: null,
    sunStart: null,
    sunEnd: null,
    emergencyAvailable: null,
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

class SignUpShelterController extends Component {
    constructor(props){
        super(props);
        this.state = {
            step: 1
        };
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

        firebase.auth().createUserWithEmailAndPassword(fieldValues.email, fieldValues.password)
            .then(user => {
                console.log('User created: ' + user.uid);
                
                let postData = {
                    accountType: "receiving_agency",
                    school: "RheaQY1WxJT03sTPQICFZ4STpfm1",
                    name: fieldValues.organizationName,
                    address: {
                        street1: fieldValues.address1,
                        street2: fieldValues.address2,
                        city: fieldValues.city,
                        state: fieldValues.state,
                        zip: fieldValues.zip,
                        officeNumber: fieldValues.officeNumber
                    },
                    isVerified: true,
		            isActivated: true,
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
                    availabilities: {
                        0: {startTime: fieldValues.monStart, endTime: fieldValues.monEnd},
                        1: {startTime: fieldValues.tueStart, endTime: fieldValues.tueEnd},
                        2: {startTime: fieldValues.wedStart, endTime: fieldValues.wedEnd},
                        3: {startTime: fieldValues.thurStart, endTime: fieldValues.thurEnd},
                        4: {startTime: fieldValues.friStart, endTime: fieldValues.friEnd},
                        5: {startTime: fieldValues.satStart, endTime: fieldValues.satEnd},
                        6: {startTime: fieldValues.sunStart, endTime: fieldValues.sunEnd}
                    },
                    acceptEmergencyPickups: fieldValues.emergencyAvailable,
                    emergencyQuantity: {
                        min: fieldValues.startLbs,
                        max: fieldValues.endLbs
                    },
                    isAdmin: true,
                    notification: {
                        type: NotificationType,
                        content: "-L5QoXeC_UrL5tRRED3e"
                    }
                };

                let updates = {};
                updates['/accounts/' + user.uid] = postData;

                return firebase.database().ref().update(updates);
            })
            .catch(error => {
                console.log(error.message)
            });

        this.nextStep();
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
                        nextStep={this.nextStep.bind(this)}
                        previousStep={this.previousStep.bind(this)}
                        saveValues={this.saveValues.bind(this)} />
                </div>;
            case 2:
                return <div className="signup">
                    <div className="circle-wrapper">
                        <div className="circle open"></div><div className="circle"></div><div className="circle open"></div><div className="circle open"></div>
                    </div>
                    <ReceivingAgencySignUp2 fieldValues={fieldValues}
                        nextStep={this.nextStep.bind(this)}
                        previousStep={this.previousStep.bind(this)}
                        saveValues={this.saveValues.bind(this)} /></div>;

            case 3:
                return <div className="signup">
                    <div className="circle-wrapper">
                        <div className="circle open"></div><div className="circle open"></div><div className="circle"></div><div className="circle open"></div>
                    </div>
                    <ReceivingAgencySignUp3 fieldValues={fieldValues}
                        nextStep={this.nextStep.bind(this)}
                        previousStep={this.previousStep.bind(this)}
                        saveValues={this.saveValues.bind(this)} /></div>;

            case 4:
                return <div className="signup">
                    <div className="circle-wrapper">
                        <div className="circle open"></div><div className="circle open"></div><div className="circle open"></div><div className="circle"></div>
                    </div>
                    <ReceivingAgencySignUp4 fieldValues={fieldValues}
                        nextStep={this.nextStep.bind(this)}
                        previousStep={this.previousStep.bind(this)}
                        submitRegistration={this.submitRegistration.bind(this)}
                        saveValues={this.saveValues.bind(this)} /></div>;

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
export default SignUpShelterController;