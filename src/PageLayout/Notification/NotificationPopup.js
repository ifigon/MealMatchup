import React, { Component } from 'react';
import truckG from '../../icons/green_truck.svg';
import { NotificationType, AccountType } from '../../Enums';
import './PopUp.css';

class NotificationPopup extends Component {
    render() {
        return (
            <div className="notification-wrapper recurring">
                {
                    this.props.notificationType === NotificationType.RECURRING_PICKUP_REQUEST && 
                    this.props.account === AccountType.RECEIVING_AGENCY &&
                    <img className="icon" src={truckG} alt="icon"><h1 className="hover">Recurring Pickup Requested</h1></img>
                }
                {
                    this.props.notificationType === NotificationType.RECURRING_PICKUP_CONFIRMED && 
                    // this.props.account === AccountType.RECEIVING_AGENCY &&
                    <img className="icon" src={truckG} alt="icon"><h1 className="hover">Recurring Pickup Confirmed</h1></img>
                }
                <div className="buttons notification">
                    <button onClick={this.props.clickNotification} className="claim notification" type="button">View</button>
                </div>
            </div>
        );
    }
}
export default NotificationPopup;