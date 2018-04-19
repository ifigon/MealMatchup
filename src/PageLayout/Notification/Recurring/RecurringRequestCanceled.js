import React, { Component } from 'react';
import truck from '../../../icons/grey_truck.svg';
import RequestTime from '../Details/RequestTime';
import { NotificationMap } from '../NotificationMap';

class RecurringRequestCancelled extends Component {
    render() {
        return (
            <div className="modal-wrapper">
                <img className="icon" src={truck} alt="icon" />
                <div className="modal-left-align">
                    <h1> Recurring pickup canceled</h1>
                    <p>{NotificationMap[this.props.notification.type].detailMsg}</p>
                    <div className="pickup-details">
                        <RequestTime request={this.props.details} />
                    </div>
                    <div className="popup-buttons">
                        <button className="cancel" type="button">Okay</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default RecurringRequestCancelled;