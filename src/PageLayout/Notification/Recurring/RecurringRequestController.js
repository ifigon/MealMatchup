import React, { Component } from 'react';
import '../Popup.css';

import RecurringRequestDetails from './RecurringRequestDetails';
import RecurringRequestDisclaimer from './RecurringRequestDisclaimer';
import RecurringRequestClaimed from './RecurringRequestClaimed';
import EnterPrimaryContact from './EnterPrimaryContact';
import close from '../../../icons/cross-out.svg';

class RecurringRequestController extends Component {
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
            return <RecurringRequestDetails
                accountType={this.props.account.accountType}
                details={this.props.details}
                enterPrimaryContact={this.enterPrimaryContact.bind(this)}
                nextStep={this.nextStep.bind(this)}
                previousStep={this.previousStep.bind(this)}
                close={this.props.closePopUp}
            />;
        case 2:
            return <RecurringRequestDisclaimer
                accountType={this.props.account.accountType}
                details={this.props.details}
                nextStep={this.nextStep.bind(this)}
                previousStep={this.previousStep.bind(this)}
                close={this.props.closePopUp}
            />;

        case 3:
            return <RecurringRequestClaimed
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

export default RecurringRequestController;