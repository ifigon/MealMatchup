import React, { Component } from 'react';
import '../Popup.css';

import RecurringDeliveryRequest1 from './RecurringDeliveryRequest1';
import RecurringDeliveryRequest2 from './RecurringDeliveryRequest2';
import RecurringDeliveryRequest3 from './RecurringDeliveryRequest3';
import close from '../../../icons/cross-out.svg';


class RecurringDeliveryRequestController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,

        };
    }

    nextStep() {
        this.setState((prevState) => {
            return { step: prevState.step + 1 };
        });
    }

    previousStep() {
        this.setState((prevState) => {
            return { step: prevState.step + 1 };
        });
    }

    showStep() {
        switch (this.state.step) {
        default:
            return <RecurringDeliveryRequest1
                accountType={this.props.account.accountType}
                details={this.props.details}
                nextStep={this.nextStep.bind(this)}
                previousStep={this.previousStep.bind(this)}
                close={this.props.closePopUp}
            />;
        case 2:
            return <RecurringDeliveryRequest2
                accountType={this.props.account.accountType}
                details={this.props.details}
                nextStep={this.nextStep.bind(this)}
                previousStep={this.previousStep.bind(this)}
                close={this.props.closePopUp}
            />;

        case 3:
            return <RecurringDeliveryRequest3
                accountType={this.props.account.accountType}
                details={this.props.details}
                nextStep={this.nextStep.bind(this)}
                previousStep={this.previousStep.bind(this)}
                close={this.props.closePopUp}
            />;
        }
    }

    render() {
        return (
            <div className="popup-wrapper recurring">
                <img className="close" src={close} alt="close" onClick={this.props.closePopUp} />
                {this.showStep()}
            </div>
        );
    }
}

export default RecurringDeliveryRequestController;