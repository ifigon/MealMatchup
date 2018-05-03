import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { auth } from '../FirebaseConfig';
import './SignUpIn.css';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            onForgot: false,
            emailSent: false
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
                    error: error.message
                });
            });
    }

    // TODO: Add UI
    handleForgotPassword() {
        let email = document.getElementById('email').value;
        auth
            .sendPasswordResetEmail(email)
            .then(() => {
                this.setState({
                    emailSent: true
                });
            })
            .catch(error => {
                this.setState({
                    error: error.message
                });
            });
    }

    handleForgotClick() {
        this.setState({
            onForgot: true
        });
    }

    render() {
        return (
            <div className="signup-wrapper">
                <form onSubmit={this.signIn}>
                    <div className="login-wrapper">
                        <div className="login-input-wrapper">
                            {this.state.onForgot && !this.state.emailSent ? <p className="forgot">Enter email to send reset password link</p> : <span />}
                            {!this.state.emailSent ?
                                <input
                                    name="email"
                                    type="email"
                                    id="email"
                                    className="login-input form-component"
                                    placeholder="Email"
                                    required
                                />
                                :
                                <span>
                                    {this.state.error ?
                                        <p className="forgot">{this.state.error}</p>
                                        :
                                        <p className="forgot">Email Sent!</p>
                                    }
                                </span>
                            }
                            <br />
                            {!this.state.onForgot ?
                                <input
                                    name="password"
                                    type="password"
                                    id="password"
                                    className="login-input form-component"
                                    placeholder="Password"
                                    required
                                />
                                :
                                <span />
                            }
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
                            {!this.state.onForgot ?
                                <button type="submit" className="login-button">
                                    login
                                </button>
                                :
                                <span />
                            }
                        </div>
                        <div className="forgot">
                            {/* TODO: Add functionality to reset username and password */}
                            {!this.state.onForgot ?
                                <p className="forgot" onClick={this.handleForgotClick.bind(this)}>forgot password?</p>
                                :
                                <span>
                                    {!this.state.emailSent ? 
                                        <p className="forgot" onClick={this.handleForgotPassword.bind(this)}>Send Link</p> 
                                        : 
                                        <span />
                                    }
                                </span>
                            }
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
export default SignIn;
