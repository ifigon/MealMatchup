import './SignUpIn.css';
import StudentSignUp from './StudentSignUp';
import StudentSignUp1 from './StudentSignUp1';
import StudentSignUp2 from './StudentSignUp2';
import SignUpComplete from './SignUpComplete';

let React = require('react');
let createReactClass = require('create-react-class');

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
                        <div className="circle"></div><div className="circle open"></div>
                    </div>
                    <StudentSignUp1 fieldValues={fieldValues}
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        saveValues={this.saveValues} />
                </div>
            case 2:
                return <div className="signup">
                    <div className="circle-wrapper">
                        <div className="circle open"></div><div className="circle "></div>
                    </div>
                    <StudentSignUp2 fieldValues={fieldValues}
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        saveValues={this.saveValues} /></div>
            default:
                return <SignUpComplete/>
        }
    },

    render() {
        return (
            <div className="signup-wrapper">
                {this.showStep()}
            </div>
        )
    }
})
export default SignUpStudentController;