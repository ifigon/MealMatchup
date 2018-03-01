import '../SignUpIn.css';
import firebase from '../../FirebaseConfig.js';
import DelivererGroupSignUp1 from './DelivererGroupSignUp1';
import DelivererGroupSignUp2 from './DelivererGroupSignUp2';
import SignUpComplete from '../SignUpComplete';
import { NotificationType } from '../../Enums';

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

let DelivererGroupSignUpController = createReactClass({
    getInitialState: function () {
        return {
            step: 1
        }
    },
    saveValues: function (fields) {
        return function () {
            // Remember, `fieldValues` is set at the top of this file, we are simply appending
            // to and overriding keys in `fieldValues` with the `fields` with Object.assign
            // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
            fieldValues = Object.assign({}, fieldValues, fields)
        }
    },

    nextStep: function () {
        this.setState((prevState) => {
          return { step: prevState.step + 1}
        })
    },

    previousStep: function () {
        this.setState((prevState) => {
           return {step: prevState.step - 1}
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
                    name: fieldValues.organizationName,
                    numVolunteers: fieldValues.numVolunteers,
                    address: {
                        street1: fieldValues.address1,
                        street2: fieldValues.address2,
                        city: fieldValues.city,
                        state: fieldValues.state,
                        zip: fieldValues.zip
                    },
                    email: fieldValues.email,
                    coordinator: {
                        name: fieldValues.contactName,
                        email: fieldValues.contactEmail,
                        phone: fieldValues.contactNumber,
                        position: fieldValues.contactPosition
                    },
                    school: "RheaQY1WxJT03sTPQICFZ4STpfm1",
                    isActivated: true,
                    isVerified: true,
                    notification: {
                        type: NotificationType,
                        content: "-L5QoXeC_UrL5tRRED3e"
                    }
                }
                let updates = {};
                updates['/accounts/' + user.uid] = postData;
                return firebase.database().ref().update(updates);
            })
            .catch(error => {
                console.log(error.message)
            });

        this.nextStep();
    },

    showStep: function () {
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
                </div>
            case 2:
                return <div className="signup">
                    <div className="circle-wrapper">
                        <div className="circle open"></div><div className="circle "></div>
                    </div>
                    <DelivererGroupSignUp2 fieldValues={fieldValues}
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        submitRegistration={this.submitRegistration}
                        saveValues={this.saveValues} /></div>
            default:
                return <SignUpComplete fieldValues={fieldValues}/>
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
export default DelivererGroupSignUpController;