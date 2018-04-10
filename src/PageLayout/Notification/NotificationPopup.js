import React, { Component } from 'react';
import truckG from '../../icons/green_truck.svg';
import { NotificationType, AccountType } from '../../Enums';
import './Popup.css';

class NotificationPopup extends Component {
    render() {
        return (
            <div>
                {
                    this.props.notificationType === NotificationType.RECURRING_PICKUP_REQUEST &&
                    (this.props.account === AccountType.RECEIVING_AGENCY || this.props.account === AccountType.DELIVERER_GROUP) ?
                        <div className="notification-wrapper recurring arrow-up">
                            <img className="popup-icon" src={truckG} alt="icon"/><h1 className="hover">Recurring pickup requested</h1>
                            <div className="notification-buttons notification">
                                <button onClick={this.props.clickNotification} className="claim notification" type="button">View</button>
                            </div>
                        </div>
                        :
                        null
                }
                {
                    this.props.notificationType === NotificationType.RECURRING_PICKUP_CONFIRMED &&
                    this.props.account === AccountType.DONATING_AGENCY_MEMBER ?
                        <span className="notification-wrapper recurring">
                            <img className="popup-icon" src={truckG} alt="icon"/><h1 className="hover">A recurring pickup has been claimed</h1>
                            <div className="notification-buttons notification">
                                <button onClick={this.props.clickNotification} className="claim notification" type="button">View</button>
                            </div>
                        </span>
                        :
                        null
                }
            </div>
        );
    }
}
export default NotificationPopup;