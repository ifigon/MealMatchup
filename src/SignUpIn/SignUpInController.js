import React, { Component } from 'react';
import './SignUpIn.css';
import UserTypeController from './UserTypeController';
import SignUpIn from './SignUpIn';
import SignIn from './SignIn';

class SignUpInController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0
        };
    }
    signIn() {
        this.setState({
            step: 1
        });
    }

    createAccount() {
        this.setState({
            step: 2
        });
    }
    showStep() {
        switch (this.state.step) {
        default:
            return <SignUpIn
                signIn={this.signIn.bind(this)}
                createAccount={this.createAccount.bind(this)}
            />;
        case 1:
            return <SignIn />;
        case 2:
            return <UserTypeController />;
        }
    }
    render() {
        return (
            <div className="signup-wrapper">
                {this.showStep()}
            </div>
        );
    }
}
export default SignUpInController;