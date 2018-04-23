import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
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

    back() {
        this.setState({
            step: 0
        });
    }

    showStep() {
        switch (this.state.step) {
        default:
            return (
                <SignUpIn
                    signIn={this.signIn.bind(this)}
                    createAccount={this.createAccount.bind(this)}
                />
            );
        case 1:
            return <SignIn signInDenied={this.props.signInDenied} />; //(

        case 2:
            return <UserTypeController back={this.back.bind(this)} />;
        }
    }
    render() {
        return <div className="signup-wrapper">{this.showStep()}</div>;
    }
}
export default SignUpInController;
