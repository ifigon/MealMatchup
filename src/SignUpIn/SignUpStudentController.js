import './SignUpIn.css';
import firebase from 'firebase/app'
import StudentSignUp from './StudentSignUp';
import StudentSignUp1 from './StudentSignUp1';
import StudentSignUp2 from './StudentSignUp2';
import StudentSignUp3 from './StudentSignUp3';
import SignUpComplete from './SignUpComplete';

let React = require('react');
let createReactClass = require('create-react-class');

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
        
        firebase.auth().createUserWithEmailAndPassword(fieldValues.email, fieldValues.password)
            .then(user => {
                console.log('User created: ' + user.uid);
                let postData = {
                    accountType: "deliverer_group",
                    organizationName: fieldValues.organizationName,
                    numVolunteers: fieldValues.numVolunteers,
                    address: {
                        street1: "Test Street 1",
                        street2: "Test Street 2",
                        city: "Test City",
                        state: "Test State",
                        zip: "Test Zip"
                    },
                    email: fieldValues.email,
                    coordinator: {
                        name: fieldValues.memberName,
                        email: fieldValues.memberEmail,
                        phone: fieldValues.memberNumber,
                        position: fieldValues.position
                    }
                }
                let updates = {};
                updates['/accounts/' + user.uid] = postData;
                console.log(user.uid);
                return firebase.database().ref().update(updates);
            })
            .catch(error => {
                console.log(error.message)
            });

        this.nextStep();
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
            case 3:
                return <div className="signup">
                    <div className="circle-wrapper">
                        <div className="circle open"></div><div className="circle open"></div><div className="circle"></div>
                    </div>
                    <StudentSignUp3 fieldValues={fieldValues}
                        previousStep={this.previousStep}
                        saveValues={this.saveValues}
                        nextStep={this.nextStep}
                        submitRegistration={this.submitRegistration} /></div>
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