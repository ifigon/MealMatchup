// NavBarButton.js
// import React, { Component } from 'react';
import logo from 'public-encrypt';
import './SignUpIn.css';
import StudentSignUp1 from './StudentSignUp1';
import StudentSignUp2 from './StudentSignUp2';
import StudentSignUp3 from './StudentSignIn3';
let React = require('react');
// var ReactDOM = require('react-dom');
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

let SignUpStudent = createReactClass({
    getInitialState: function () {
        return {
            step: 1
        }
    },
    saveValues: function(fields) {
        return function() {
          // Remember, `fieldValues` is set at the top of this file, we are simply appending
          // to and overriding keys in `fieldValues` with the `fields` with Object.assign
          // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
          fieldValues = Object.assign({}, fieldValues, fields)
        }()
      },

    nextStep: function() {
        this.setState({
            step: this.state.step + 1
        })
    },

    previousStep: function() {
        this.setState({
            step: this.state.step - 1
        })
    },

    submitRegistration: function() {
        // Handle via ajax submitting the user data, upon
        // success return this.nextStop(). If it fails,
        // show the user the error but don't advance

        this.nextStep()
    },

    showStep: function() {
        switch (this.state.step) {
            case 1:
                return <StudentSignUp1 fieldValues={fieldValues}
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                    saveValues={this.saveValues} />
            case 2:
                return <StudentSignUp2 fieldValues={fieldValues}
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                    saveValues={this.saveValues} />
            case 3:
                return <StudentSignUp3 fieldValues={fieldValues}
                    previousStep={this.previousStep}
                    submitRegistration={this.submitRegistration} />
            // case 4:
            //     return <Success fieldValues={fieldValues} />
        }
    },

    render() {
        //let highlightLineColor = this.state.lineHighlighted ? "white" : "black"
        return (
            <div className="signup-wrapper">
            <div className="signup">
                {/* <span className="progress-step">Ste {this.state.step}</span> */}
                {this.showStep()}
                </div>
            </div>
        )
    }
})
export default SignUpStudent;