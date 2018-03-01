import React from 'react';
import createReactClass from 'create-react-class';
import './SignUpIn.css';
import UserTypeController from './UserTypeController';
import SignUpIn from './SignUpIn';
import SignIn from './SignIn';

let SignUpInController = createReactClass({
    getInitialState: function () {
        return {
            step: 0
        }
    },
    signIn: function () {
        this.setState({
            step: 1
        })
    },

    createAccount: function () {
        this.setState({
            step: 2
        })
    },
    showStep: function () {
        switch (this.state.step) {
            default:
                return <SignUpIn
                    signIn={this.signIn}
                    createAccount={this.createAccount}
                />
            case 1:
                return <SignIn />

            case 2:
                return <UserTypeController />
        }
    },

    render() {
        return (
            <div className="signup-wrapper">
                {this.showStep()}
            </div>
        )
    }
})
export default SignUpInController;