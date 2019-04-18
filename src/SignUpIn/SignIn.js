import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { auth } from '../FirebaseConfig';
import './SignUpIn.css';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,    
            forgot: false
        };

        this.signIn = this.signIn.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.setForgot = this.setForgot.bind(this);
    }

    setForgot() {
        this.setState({
            forgot: true
        })
    }
    
    forgotPassword(e) {
        e.preventDefault()
        let email = e.target.email.value;
        auth
            .sendPasswordResetEmail(email)
            .then(user => {
                this.setState({
                    error: null
                });
            })
            .catch(error => {
                this.setState({
                    error: error.message
                });
            });
        this.setState({
            forgot: false
        })
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
                    error: error.message
                });
            });
    }

    render() {
        if (this.state.forgot) {
            return(
                <form onSubmit={this.forgotPassword}>
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
                            </div>
                            <div className="login-button-wrapper">
                                <button type="submit" className="login-button">
                                     Reset Password
                                </button>
                            </div>
                            <div className="signup-reroute">
                                {/* TODO: Link straight to signup when login routing is ready */}
                                {/* <Link to={'/signup'}>Create Account</Link> */}
                                <div className="back" onClick={this.props.back}>
                                    Back
                                </div>
                            </div>
                    </div>
                
                </form>
            );
        } else {
            return (
                <div className="signup-wrapper">
                    
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
                                    Log in denied. Account is not verified or
                                    activated.
                                </p>
                            )}
                            {this.state.error && (
                                /* TODO: give better error msg */
                                <p className="sign-in-error">
                                    Unable to log in.
                                </p>
                            )}
                            <div className="login-button-wrapper">
                                <button type="submit" className="login-button">
                                    login
                                </button>
                            </div>
                            <div className="forgot-button-wrapper">
                                {/* TODO: Add functionality to reset username and password */}
                                {/*<p className="forgot">forgot password?</p> */}
                                <button className="forgot-button" onClick={this.setForgot}>
                                    Forgot password?
                                </button>
                                {/* <p className="forgot">forgot username?</p> */}
                            </div>
                            <div className="signup-reroute">
                                {/* TODO: Link straight to signup when login routing is ready */}
                                {/* <Link to={'/signup'}>Create Account</Link> */}
                                <div className="back" onClick={this.props.back}>
                                    Back
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
    }
}
export default SignIn;
