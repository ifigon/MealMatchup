import React, { Component } from 'react';
import './SignUpIn.scss';
import UserTypeController from './UserTypeController';
import SignUpIn from './SignUpIn';

class SignUpInController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0
        };
    }

    back = () => this.setState({ step: 0 })

    createAccount = () => this.setState({ step: 1 })

    showStep () {
        switch (this.state.step) {
        default:
            return (
                <SignUpIn
                    signIn={this.signIn}
                    createAccount={this.createAccount}
                />
            );
        case 1:
            return <UserTypeController back={this.back} />;
        }
    }
    render() {
        return <div className="signup-wrapper">{this.showStep()}</div>;
    }
}
export default SignUpInController;
