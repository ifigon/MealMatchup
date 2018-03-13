import React, { Component } from 'react';
import '../PopUp.css';

import EmergencyDeliveryRequest1 from './EmergencyDeliveryRequest1';
import EmergencyDeliveryRequest2 from './EmergencyDeliveryRequest2';
import EmergencyDeliveryRequest3 from './EmergencyDeliveryRequest3';
import close from '../../../icons/cross-out.svg';


class EmergencyDeliveryRequestController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1
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
            return <EmergencyDeliveryRequest1
                nextStep={this.nextStep.bind(this)}
                previousStep={this.previousStep.bind(this)}
                close={this.props.closePopUp}
            />;
        case 2:
            return <EmergencyDeliveryRequest2
                nextStep={this.nextStep.bind(this)}
                previousStep={this.previousStep.bind(this)}
                close={this.props.closePopUp}
            />;
        case 3:
            return <EmergencyDeliveryRequest3
                nextStep={this.nextStep.bind(this)}
                previousStep={this.previousStep.bind(this)}
                close={this.props.closePopUp}
            />;
        }
    }

    render() {
        return (
            <div className="popup-wrapper emergency">
                <img className="close" src={close} alt="close" onClick={this.props.closePopUp}/>
                {this.showStep()}
            </div>
        );
    }
}

export default EmergencyDeliveryRequestController;