import React, { Component } from 'react';
import truck from '../../icons/green_truck.svg';

class RecurringDeliveryRequestNotification extends Component {
    render() {
        return (
            <div className="notification-wrapper">
                <img className="icon" src={truck} alt="icon" /><h1 className="hover">Reoccuring pickup requested</h1>
                <div className="buttons notification">
                    <button onClick={this.props.clickNotification} className="claim notification" type="button">View</button>
                </div>
            </div>
        );
    }
}
export default RecurringDeliveryRequestNotification;