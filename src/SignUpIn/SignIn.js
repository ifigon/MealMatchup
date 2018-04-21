import React, { Component } from 'react';
import { auth } from '../FirebaseConfig';
import { Link } from 'react-router-dom';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null
        };

        this.signIn = this.signIn.bind(this);
    }

    signIn(e) {
        e.preventDefault();

        let email = e.target.email.value;
        let password = e.target.password.value;

        auth
            .signInWithEmailAndPassword(email, password)
            .then(user => {
                this.setState({
                    error: null
                });
            })
            .catch(error => {
                this.setState({
                    error: error
                });
            });
    }

    render() {
        return (
            <form onSubmit={this.signIn}>
                <div className="login-wrapper">
                    <div className="login-input-wrapper">
                        <input
                            name="email"
                            type="email"
                            id="email"
                            className="login-input form-component"
                            placeholder="Email"
                            required
                        />
                        <br />
                        <input
                            name="password"
                            type="password"
                            id="password"
                            className="login-input form-component"
                            placeholder="Password"
                            required
                        />
                        <br />
                    </div>
                    {this.props.signInDenied && (
                        <p className="sign-in-error">
                            Log in denied. Account is not verified or activated.
                        </p>
                    )}
                    {this.state.error && (
                        /* TODO: give better error msg */
                        <p className="sign-in-error">Unable to log in.</p>
                    )}
                    <div className="login-button-wrapper">
                        <button type="submit" className="login-button">
                            login
                        </button>
                    </div>
                    <div className="forgot">
                        {/* TODO: Add functionality to reset username and password */}
                        {/* <p className="forgot">forgot password?</p> */}
                        {/* <p className="forgot">forgot username?</p> */}
                    </div>
                </div>
            </form>
        );
    }
}
export default SignIn;
