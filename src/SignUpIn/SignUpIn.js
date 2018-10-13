import './SignUpIn.scss';
import React, { Component } from 'react';

class SignUpIn extends Component {
    constructor(props) {
        super(props);
        this.createAccount = this.createAccount.bind(this);
        this.signIn = this.signIn.bind(this);
    }
    render() {
        return (
            <div className="login-buttons">
                <div className="button-wrapper">
                    <button className="button" onClick={this.signIn}>
                        LOGIN
                    </button>{' '}
                </div>
                <div className="button-wrapper">
                    <button className="button" onClick={this.createAccount}>
                        CREATE ACCOUNT
                    </button>
                </div>
            </div>
        );
    }
    createAccount(e) {
        e.preventDefault();
        this.props.createAccount();
    }
    signIn(e) {
        e.preventDefault();
        this.props.signIn();
    }
}
export default SignUpIn;
