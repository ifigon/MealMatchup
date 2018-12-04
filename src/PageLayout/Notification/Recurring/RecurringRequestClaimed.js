import React, { Component } from 'react';
import { NotificationType } from '../../../Enums';
import truckGreen from '../../../icons/green_truck.svg';
import truckRed from '../../../icons/red_truck.svg';
import RequestTime from '../Details/RequestTime';
import { NotificationMap } from '../NotificationMap';

class RecurringRequestClaimed extends Component {
    render() {
        const notificationSpecs = NotificationMap[this.props.notificationType];
        return (
            <div className="modal-wrapper">
                <img
                    className="icon"
                    id="disclaimer-icon"
                    src={notificationSpecs.iconSrc}
                    alt="icon"
                />
                <div className="modal-left-align">
                    <h1> {notificationSpecs.detailMsg}</h1>
                    <p>
                        We will notify you when it is confirmed by all parties
                        and scheduled.
                    </p>
                    <p>
                        <span className="to-from">From:</span>{' '}
                        {this.props.details.daInfo.name}
                        <span className="right to-from">To:</span>
                        {this.props.details.raInfo
                            ? this.props.details.raInfo.name
                            : this.props.raPrimaryContact.name}{' '}
                        <br />
                    </p>
                    <div className="pickup-details">
                        <RequestTime
                            request={this.props.details}
                            title={true}
                            notificationType={this.props.notificationType}
                        />
                    </div>
                    <div className="popup-buttons">
                        <button
                            onClick={this.props.close}
                            className="claim"
                            type="button"
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default RecurringRequestClaimed;
