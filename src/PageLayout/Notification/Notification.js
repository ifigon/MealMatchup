import React, { Component } from 'react';
import truckG from '../../icons/green_truck.svg';
import { NotificationType } from '../../Enums';
import { NotificationMap } from './NotificationMap';
import './Popup.css';

class Notification extends Component {
    componentDidMount(){
        let info = NotificationMap[this.props.notificationType];
    }
    render() {
        return (
            <div>
                {
                    this.props.notificationType === NotificationType.RECURRING_PICKUP_REQUEST && 
                        <div className="notification-wrapper recurring arrow-up">
                            <img className="popup-icon" src={truckG} alt="icon"/><h1 className="hover">Recurring pickup requested</h1>
                            <div className="notification-buttons notification">
                                <button onClick={this.props.clickNotification} className="claim notification" type="button">View</button>
                            </div>
                        </div>
                
                }{
                    this.props.notificationType === NotificationType.RECURRING_PICKUP_CONFIRMED &&
                        <div className="notification-wrapper recurring">
                            <img className="popup-icon" src={truckG} alt="icon"/><h1 className="hover">A recurring pickup has been claimed</h1>
                            <div className="notification-buttons notification">
                                <button onClick={this.props.clickNotification} className="claim notification" type="button">View</button>
                            </div>
                        </div>
                }
            </div>
        );
    }
}
export default Notification;