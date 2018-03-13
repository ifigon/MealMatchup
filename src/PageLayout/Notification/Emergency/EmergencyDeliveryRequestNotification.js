import React, { Component } from 'react';
import truck from '../../../icons/red_truck.svg';

class EmergencyDeliveryRequestNotification extends Component {
    render() {
        return (
            <div className="notification-wrapper emergency">
                <img className="icon red" src={truck} alt="icon" /><h1 className="hover">New emergency pickup requested</h1>
                <div className="buttons notification">
                    <button onClick={this.props.clickNotification} className="claim notification" type="button">View</button>
                </div>
            </div>
        );
    }
}
export default EmergencyDeliveryRequestNotification;