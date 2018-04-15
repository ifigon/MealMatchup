import React, { Component } from 'react';
import '../Popup.css';

import RecurringDeliveryRequest1 from './RecurringDeliveryRequest1';
import RecurringDeliveryRequest2 from './RecurringDeliveryRequest2';
import RecurringDeliveryRequest3 from './RecurringDeliveryRequest3';
import EnterPrimaryContact from './EnterPrimaryContact';
import close from '../../../icons/cross-out.svg';

class RecurringDeliveryRequestController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1
        };
    }

    enterPrimaryContact(){
        this.setState({
            step: 4
        });
    }

    savePrimaryContact(){
        // TODO: save fields to DB
        this.setState({
            step: 2
        });
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
                enterPrimaryContact={this.enterPrimaryContact.bind(this)}
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
        
        case 4:
            return <EnterPrimaryContact
                accountType={this.props.account.accountType}
                details={this.props.details}
                savePrimaryContact={this.savePrimaryContact.bind(this)}
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