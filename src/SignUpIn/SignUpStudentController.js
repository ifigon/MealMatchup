// NavBarButton.js
// import React, { Component } from 'react';
import './SignUpIn.css';
// import './SignUpStudent';
import StudentSignUp from './StudentSignUp';
import StudentSignUp1 from './StudentSignUp1';
import StudentSignUp2 from './StudentSignUp2';
import StudentSignUp3 from './StudentSignIn3';
let React = require('react');
let createReactClass = require('create-react-class');


// class SignUpStudent extends Component {
// constructor(props, context){
//     super(props, context)
//     this.state = {
//         step: 1
//     }
let fieldValues = {
    organizationName: null,
    numVolunteers: null,
    contactName: null,
    contactEmail: null,
    contactNumber: null,
    email: null,
    password: null,
    memberName: null,
    memberNumber: null,
    memberEmail: null,
    position: null
}

let SignUpStudentController = createReactClass({
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
                return <StudentSignUp
                    nextStep={this.nextStep} />
            case 1:
                return <div className="signup">
                    <div className="circle-wrapper">
                        <div className="circle"></div><div className="circle open"></div><div className="circle open"></div>
                    </div>
                    <StudentSignUp1 fieldValues={fieldValues}
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        saveValues={this.saveValues} />
                </div>
            case 2:
                return <div className="signup">
                    <div className="circle-wrapper">
                        <div className="circle open"></div><div className="circle "></div><div className="circle open"></div>
                    </div>
                    <StudentSignUp2 fieldValues={fieldValues}
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        saveValues={this.saveValues} /></div>
            default:
                return <div className="signup">
                    <div className="circle-wrapper">
                        <div className="circle open"></div><div className="circle open"></div><div className="circle"></div>
                    </div>
                    <StudentSignUp3 fieldValues={fieldValues}
                        previousStep={this.previousStep}
                        submitRegistration={this.submitRegistration} /></div>
            // case 4:
            //     return <Success fieldValues={fieldValues} />
        }
    },

    render() {
        //let highlightLineColor = this.state.lineHighlighted ? "white" : "black"
        return (
            <div className="signup-wrapper">
                {/* <div  className="signup"> */}
                {/* <span className="progress-step">Ste {this.state.step}</span> */}
                {this.showStep()}
                {/* </div> */}
            </div>
        )
    }
})
export default SignUpStudentController;