import React from 'react';
// import { Link } from 'react-router-dom';
import { auth } from '../FirebaseConfig';
import { withAuth } from '../context/Auth';
import './SignUpIn.css';

class SignIn extends React.Component {
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
            /*
            NOTE: This Firebase promise doesn't return a user!
            Thus, the redirect flow is handled by a controller instead.
            https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
            */
            .then(() => this.setState({ error: null }))
            .catch(error => {
                this.setState({
                    error: error.message
                });
            });
    }

    render() {
        const { back, auth: { signInDenied } } = this.props;
        const { error } = this.state;
        console.log('AUTH:', this.props.auth);
        return (
            <div>
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
                                <h4 className="sign-in-error">

                                    {JSON.stringify(this.props)}
                                    Log in denied. Account is not verified or
                                    activated.
                                </h4>
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
                            <div className="forgot">
                                {/* TODO: Add functionality to reset username and password */}
                                {/* <p className="forgot">forgot password?</p> */}
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
            </div>
        );
    }
}

export default withAuth(SignIn);
