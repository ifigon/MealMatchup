// No log in functionality yet

import React, { Component } from 'react'
import firebase from '../FirebaseConfig';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.nextStep = this.nextStep.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.nextStep}>
                <div className="login-wrapper">
                    <div className="login-input-wrapper">
                        <input name="email" type="text" id="email" className="login-input form-component" placeholder="Email" /><br />
                        <input name="password" type="password" id="password" className="login-input form-component" placeholder="Password" /><br />
                    </div>
                    <div className="login-button-wrapper"><button type="submit" className="login-button">Login</button></div>
                    <div className="forgot">
                        <p className="forgot">forgot password?</p>
                        <p className="forgot">forgot username?</p>
                    </div>
                </div>
            </form>
        );
    }

    nextStep(e) {
        e.preventDefault();

        let email = e.target.email.value;
        let password = e.target.password.value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                console.log('Logged in!');
            })
            .catch(error => {
                console.log(error);
            });
    }

}
export default SignIn;
