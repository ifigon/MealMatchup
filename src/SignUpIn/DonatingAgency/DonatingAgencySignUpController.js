import React, { Component } from 'react';
import '../SignUpIn.css';
import firebase from '../../FirebaseConfig';
import DonatingAgencySignUp1 from './DonatingAgencySignUp1';
import DonatingAgencySignUp2 from './DonatingAgencySignUp2';
import DonatingAgencySignUp3 from './DonatingAgencySignUp3';
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
    adminName: null,
    adminPosition: null,
    adminEmail: null,
    adminPhone: null,
    adminPassword: null,

    memberName: null,
    memberPosition: null,
    memberEmail: null,
    memberPhone: null,
    memberPassword: null,

};

class DonatingAgencySignUpController extends Component {
    constructor(props) {
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
        };
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

    submitRegistration () {
        // Handle via ajax submitting the user data, upon
        // success return this.nextStop(). If it fails,
        // show the user the error but don't advance

        firebase.auth().createUserWithEmailAndPassword(fieldValues.adminEmail, fieldValues.adminPassword)
            .then(user => {
                let agencyKey = firebase.database().ref().child('accounts').push().key;
                
                let member_postData = {
                    accountType: "donating_agency_member",
                    agency: agencyKey,
                    name: fieldValues.memberName,
                    email: fieldValues.memberEmail,
                    phone: fieldValues.memberPhone,
                    position: fieldValues.memberPosition,
                    isAdmin: true,
                    notification: {
                        type: NotificationType,
                        content: "-L5QoXeC_UrL5tRRED3e"
                    }
                };

                let agency_postData = {
                    school: "RheaQY1WxJT03sTPQICFZ4STpfm1",
                    name: fieldValues.organizationName,
                    address: {
                        street1: fieldValues.address1,
                        street2: fieldValues.address2,
                        city: fieldValues.city,
                        state: fieldValues.state,
                        zipcode: fieldValues.zip,
                        officeNo: fieldValues.officeNumber
                    },
                    isVerified: true,
                    isActivated: true,
                    primaryContact: user.uid,
                    members: [user.uid]
                }

                let accounts_updates = {};
                accounts_updates['/accounts/' + user.uid] = member_postData;

                let agency_updates = {};
                agency_updates['/donating_agencies/' + agencyKey] = agency_postData;

                firebase.database().ref().update(agency_updates);

                return firebase.database().ref().update(accounts_updates);
            })
            .catch(error => {
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
                <DonatingAgencySignUp1 fieldValues={fieldValues}
                    nextStep={this.nextStep.bind(this)}
                    previousStep={this.previousStep.bind(this)}
                    saveValues={this.saveValues.bind(this)} />
            </div>;
        case 2:
            return <div className="signup">
                <div className="circle-wrapper">
                    <div className="circle open"></div><div className="circle "></div><div className="circle open"></div>
                </div>
                <DonatingAgencySignUp2 fieldValues={fieldValues}
                    nextStep={this.nextStep.bind(this)}
                    previousStep={this.previousStep.bind(this)}
                    saveValues={this.saveValues.bind(this)} /></div>;
        case 3:
            return <div className="signup">
                <div className="circle-wrapper">
                    <div className="circle open"></div><div className="circle open"></div><div className="circle"></div>
                </div>
                <DonatingAgencySignUp3 fieldValues={fieldValues}
                    nextStep={this.nextStep.bind(this)}
                    previousStep={this.previousStep.bind(this)}
                    saveValues={this.saveValues.bind(this)} /></div>;
        case 4:
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