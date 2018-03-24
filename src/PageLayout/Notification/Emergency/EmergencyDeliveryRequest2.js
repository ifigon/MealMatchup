import React, { Component } from 'react';
import truck from '../../../icons/red_truck.svg';

class EmergencyDeliveryRequest2 extends Component {
    render() {
        return (
            <div className="wrapper">
                <img className="icon red" src={truck} alt="icon" />
                <h1>Are you sure you want to claim this pickup?</h1>
                <h2 className="warning">
                    Once a pickup is claimed it cannot be cancelled.
                </h2>
                <p>
                    {this.props.receivingAgency}
                    <br />
                    Date: {this.props.date} {this.props.time}
                    <br />
                    Total weight of donation: {this.props.weight}
                </p>

                <div className="buttons">
                    <button
                        onClick={this.props.nextStep}
                        className="claim"
                        type="button"
                    >
                        Claim
                    </button>{' '}
                    <button
                        onClick={this.props.close}
                        className="reject"
                        type="button"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }
}
export default EmergencyDeliveryRequest2;
