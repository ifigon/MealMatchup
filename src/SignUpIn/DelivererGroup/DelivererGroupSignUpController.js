import React, { Component } from 'react';
import '../SignUpIn.css';
import DelivererGroupSignUp1 from './DelivererGroupSignUp1';
import DelivererGroupSignUp2 from './DelivererGroupSignUp2';
import SignUpComplete from '../SignUpComplete';
import UserTypeController from '../UserTypeController';

let fieldValues = {
    organizationName: null,
    numVolunteers: null,
    address1: null,
    address2: null,
    city: null,
    state: null,
    zip: null,

    email: null,
    password: null,
    contactName: null,
    contactPosition: null,
    contactEmail: null,
    contactNumber: null,
}

class DelivererGroupSignUpController extends Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 1
        }
    }

    saveValues(fields) {
        return function () {
            // Remember, `fieldValues` is set at the top of this file, we are simply appending
            // to and overriding keys in `fieldValues` with the `fields` with Object.assign
            // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
            fieldValues = Object.assign({}, fieldValues, fields)
        }
    }

    nextStep() {
        this.setState((prevState) => {
            return { step: prevState.step + 1 }
        })
    }

    previousStep() {
        this.setState((prevState) => {
            return { step: prevState.step - 1 }
        })
    }

    showStep() {
        switch (this.state.step) {
            case 1:
                return <div className="signup">
                    <div className="circle-wrapper">
                        <div className="circle"></div><div className="circle open"></div>
                    </div>
                    <DelivererGroupSignUp1 fieldValues={fieldValues}
                        nextStep={this.nextStep.bind(this)}
                        previousStep={this.previousStep.bind(this)}
                        saveValues={this.saveValues.bind(this)} />
                </div>
            case 2:
                return <div className="signup">
                    <div className="circle-wrapper">
                        <div className="circle open"></div><div className="circle "></div>
                    </div>
                    <DelivererGroupSignUp2 fieldValues={fieldValues}
                        nextStep={this.nextStep.bind(this)}
                        previousStep={this.previousStep.bind(this)}
                        saveValues={this.saveValues.bind(this)} /></div>
            case 3:
                return <SignUpComplete fieldValues={fieldValues} />
            default:
                return <UserTypeController />
        }
    }

    render() {
        return (
            <div className="signup-wrapper">
                {this.showStep()}
            </div>
        )
    }
}
export default DelivererGroupSignUpController;