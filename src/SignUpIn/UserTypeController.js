import React, { Component } from 'react';
import './SignUpIn.css';
import UserTypeSignUp from './UserTypeSignUp';
import ReceivingAgencySignUpController from './ReceivingAgency/ReceivingAgencySignUpController';
import DelivererGroupSignUpController from './DelivererGroup/DelivererGroupSignUpController';
import DonatingAgencySignUpController from './DonatingAgency/DonatingAgencySignUpController';

class UserTypeController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0
        };
    }

    showDelivererGroup() {
        this.setState({
            step: 1
        });
    }

    showReceivingAgency() {
        this.setState({
            step: 2
        });
    }

    showDonatingAgency() {
        this.setState({
            step: 3
        });
    }

    showStep() {
        switch (this.state.step) {
        default:
            return (
                <UserTypeSignUp
                    showDelivererGroup={this.showDelivererGroup.bind(this)}
                    showDonatingAgency={this.showDonatingAgency.bind(this)}
                    showReceivingAgency={this.showReceivingAgency.bind(
                        this
                    )}
                    back={this.props.back}
                />
            );
        case 1:
            return <DelivererGroupSignUpController />;

        case 2:
            return <ReceivingAgencySignUpController />;
        case 3:
            return <DonatingAgencySignUpController />;
        }
    }

    render() {
        return <div className="signup-wrapper">{this.showStep()}</div>;
    }
}

export default UserTypeController;
