import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { auth } from '../FirebaseConfig';
import { withAuth, AuthProps } from '../context/Auth';
import './SignUpIn.css';

class SignIn extends React.Component {
    static propTypes = {
        back: PropTypes.func.isRequired,
        auth: AuthProps.isRequired
    }
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
            .catch(error => this.setState({ error: error.message }));
    }

    render() {
        const { back, auth: { signInDenied, isActivated, isVerified } } = this.props;
        const { error } = this.state;
        return (
            <div>
                <div className="signup-wrapper">
                    <form onSubmit={this.signIn}>
                        <div className="login-wrapper">
                            {(!signInDenied && !error)
                                ? ( //  Render general UI
                                    <React.Fragment>
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
                                        <div className="login-button-wrapper">
                                            <button type="submit" className="login-button">
                                                login
                                            </button>
                                        </div>
                                    </React.Fragment>
                                )
                                : ( //  Render denial prompts (could be several)
                                    <div className="sign-in-error">
                                        <h2>Unable to Sign In</h2>
                                        <hr />
                                        {error && <p>Invalid credentials</p>}
                                        {!error && !isActivated && <p>Your account must be activated by an administrator. This usually takes 1-2 business days.</p>}
                                        {!error && !isVerified && <p>Your account is in our system, but an agency must verify your identity before you have full access.</p>}
                                        <hr />
                                    </div>
                                )}
                            <div className="forgot">
                                {/* TODO: Add functionality to reset username and password */}
                                {/* <p className="forgot">forgot password?</p> */}
                                {/* <p className="forgot">forgot username?</p> */}
                            </div>
                            <div className="signup-reroute">
                                {/* TODO: Link straight to signup when login routing is ready */}
                                {/* <Link to={'/signup'}>Create Account</Link> */}
                                <div className="back" onClick={back}>Back</div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withAuth(SignIn);
