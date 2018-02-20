// NavBarButton.js
// import React, { Component } from 'react';
import logo from 'public-encrypt';
import './SignUpIn.css';
// import './SignUpShelter';
import ShelterSignUp from './ShelterSignUp';
import ShelterSignUp1 from './ShelterSignUp1';
import ShelterSignUp2 from './ShelterSignUp2';
import ShelterSignUp3 from './ShelterSignUp3';
import SignUpComplete from './SignUpComplete';

let React = require('react');
let createReactClass = require('create-react-class');

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
    primaryName: null,
    primaryEmail: null,
    primaryPhone: null,
    primaryPosition: null,
    secondaryName: null,
    secondaryEmail: null,
    secondaryPhone: null,
    secondaryPosition: null

}

let SignUpShelterController = createReactClass({
    getInitialState: function () {
        return {
            step: 0
        }
    },
    saveValues: function (fields) {
        return function () {
            // Remember, `fieldValues` is set at the top of this file, we are simply appending
            // to and overriding keys in `fieldValues` with the `fields` with Object.assign
            // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
            fieldValues = Object.assign({}, fieldValues, fields)
        }()
    },

    nextStep: function () {
        this.setState({
            step: this.state.step + 1
        })
    },

    previousStep: function () {
        this.setState({
            step: this.state.step - 1
        })
    },

    submitRegistration: function () {
        // Handle via ajax submitting the user data, upon
        // success return this.nextStop(). If it fails,
        // show the user the error but don't advance

        this.nextStep()
    },

    showStep: function () {
        switch (this.state.step) {
            case 0:
                return <ShelterSignUp
                    nextStep={this.nextStep} />
            case 1:
                return <div className="signup">
                    <div className="circle-wrapper">
                        <div className="circle"></div><div className="circle open"></div><div className="circle open"></div>
                    </div>
                    <ShelterSignUp1 fieldValues={fieldValues}
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        saveValues={this.saveValues} />
                </div>
            case 2:
                return <div className="signup">
                    <div className="circle-wrapper">
                        <div className="circle open"></div><div className="circle "></div><div className="circle open"></div>
                    </div>
                    <ShelterSignUp2 fieldValues={fieldValues}
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        saveValues={this.saveValues} /></div>
            case 3:
                return <div className="signup">
                    <div className="circle-wrapper">
                        <div className="circle open"></div><div className="circle open"></div><div className="circle"></div>
                    </div>
                    <ShelterSignUp3 fieldValues={fieldValues}
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        saveValues={this.saveValues} /></div>
            case 4:
                return <SignUpComplete />
        }
    },

    render() {
        //let highlightLineColor = this.state.lineHighlighted ? "white" : "black"
        return (
            <div className="signup-wrapper">

                {this.showStep()}
            </div>
        )
    }
})
export default SignUpShelterController;