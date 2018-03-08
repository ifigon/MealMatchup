import React, { Component } from 'react';
import './Notification.css';

import RecurringDeliveryRequest1 from './RecurringDeliveryRequest1';
import RecurringDeliveryRequest2 from './RecurringDeliveryRequest2';
import RecurringDeliveryRequest3 from './RecurringDeliveryRequest3';


class RecurringDeliveryRequestController extends Component {
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
            return <div className="signup">
                <RecurringDeliveryRequest1
                    nextStep={this.nextStep.bind(this)}
                    previousStep={this.previousStep.bind(this)}
                />
            </div>;
        case 2:
            return <div className="signup">
                <RecurringDeliveryRequest2
                    nextStep={this.nextStep.bind(this)}
                    previousStep={this.previousStep.bind(this)}
                />
            </div>;

        case 3:
            return <div className="signup">
                <RecurringDeliveryRequest3
                    nextStep={this.nextStep.bind(this)}
                    previousStep={this.previousStep.bind(this)}
                />
            </div>;
        }
    }

    render() {
        //let highlightLineColor = this.state.lineHighlighted ? "white" : "black"
        return (
            <div className="popup-wrapper">
                {this.showStep()}
            </div>
        );
    }
}

export default RecurringDeliveryRequestController;