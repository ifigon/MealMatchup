import './SignUpIn.css';
import UserTypeSignUp from './UserTypeSignUp';
import SignUpShelterController from './SignUpShelterController';
import SignUpStudentController from './SignUpStudentController';
import SignUpDonatorController from './SignUpDonatorController';

let React = require('react');
let createReactClass = require('create-react-class');

let UserTypeController = createReactClass({
    getInitialState: function () {
        return {
            step: 0
        }
    },
    showStudent: function () {
        this.setState({
            step: 1
        })
    },

    showShelter: function () {
        this.setState({
            step: 2
        })
    },
    showDonator: function () {
        this.setState({
            step: 3
        })
    },
    showStep: function () {
        switch (this.state.step) {
            default:
                return <UserTypeSignUp
                    showStudent={this.showStudent}
                    showDonator={this.showDonator}
                    showShelter={this.showShelter}
                />
            case 1:
                return <SignUpStudentController />

            case 2:
                return <SignUpShelterController />
            case 3:
                return <SignUpDonatorController />

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
export default UserTypeController;