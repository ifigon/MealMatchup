import React, { Component } from 'react';
import { NotificationMap } from './NotificationMap';
import './Popup.css';

class Notification extends Component {
    constructor(props){
        super(props);
        console.log(this.props);
        this.state = {
            info: NotificationMap[this.props.notificationType]
        };
    }
    notificationIndex(){
        this.props.clickNotification(this.props.index);
    }
    render() {
        return (
            <div>
                <div className="notification-wrapper recurring arrow-up">
                    <img className="popup-icon" src={this.state.info.iconSrc} alt="icon"/>
                    <h1 className="hover">{this.state.info.msg}</h1>
                    <div className="notification-buttons notification">
                        <button onClick={this.notificationIndex.bind(this)} className="claim notification" type="button">View</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Notification;