import React from 'react';
import createReactClass from 'create-react-class';
import './SignUpIn.css';
import UserTypeSignUp from './UserTypeSignUp';
import ReceivingAgencySignUpController from './ReceivingAgency/ReceivingAgencySignUpController';
import DelivererGroupSignUpController from './DelivererGroup/DelivererGroupSignUpController';
import DonatingAgencySignUpController from './DonatingAgency/DonatingAgencySignUpController';

let UserTypeController = createReactClass({
    getInitialState: function () {
        return {
            step: 0
        }
    },
    showDelivererGroup: function () {
        this.setState({
            step: 1
        })
    },

    showReceivingAgency: function () {
        this.setState({
            step: 2
        })
    },
    showDonatingAgency: function () {
        this.setState({
            step: 3
        })
    },
    showStep: function () {
        switch (this.state.step) {
            default:
                return <UserTypeSignUp
                    showDelivererGroup={this.showDelivererGroup}
                    showDonatingAgency={this.showDonatingAgency}
                    showReceivingAgency={this.showReceivingAgency}
                />
            case 1:
                return <DelivererGroupSignUpController />

            case 2:
                return <ReceivingAgencySignUpController />
            case 3:
                return <DonatingAgencySignUpController />
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