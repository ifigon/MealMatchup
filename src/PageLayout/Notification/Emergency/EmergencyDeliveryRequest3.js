import React, { Component } from 'react';
import truck from '../../../icons/red_truck.svg';

class EmergencyDeliveryRequest3 extends Component {
    render() {
        return (
            <div className="wrapper">
                <img className="icon red" src={truck} alt="icon" />
                <h1>Emergency pick up scheduled!</h1>
                <p className="summary">
                    {this.props.receivingAgency}
                    <br />
                    Date: {this.props.date} {this.props.time}
                    <br />
                    Total weight of donation: {this.props.weight}
                </p>

                <div className="buttons">
                    <button
                        onClick={this.props.close}
                        className="claim end"
                        type="button"
                    >
                        View on calendar
                    </button>
                </div>
            </div>
        );
    }
}
export default EmergencyDeliveryRequest3;
