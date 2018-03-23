// No log in functionality yet
import React, { Component } from 'react'
import firebase from '../FirebaseConfig';
import ReactDOM from 'react-dom';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.nextStep = this.nextStep.bind(this);
    }

    render() {
        return (
            <div className="login-wrapper">
                <div className="login-input-wrapper">
                    <input ref="email" type="text" id="email" className="login-input form-component" placeholder="Email" /><br />
                    <input ref="password" type="password" id="password" className="login-input form-component" placeholder="Password" /><br />
                </div>
                <div className="login-button-wrapper" onClick={this.nextStep}><button type="button" className="login-button">Login</button></div>
                <div className="forgot">
                    <p className="forgot">forgot password?</p>
                    <p className="forgot">forgot username?</p>
                </div>
            </div>
        )
    }
    nextStep(e) {
        e.preventDefault();

        let email = ReactDOM.findDOMNode(this.refs.email).value;
        let password = ReactDOM.findDOMNode(this.refs.password).value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                console.log('Logged in!');
                this.props.nextStep();
            })
            .catch(error => {
                console.log(error);
            });

    }
}
export default SignIn;