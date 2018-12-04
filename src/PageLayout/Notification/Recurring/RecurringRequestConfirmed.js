import React, { Component } from 'react';
import RequestSummary from '../Details/RequestSummary';
import { AccountType } from '../../../Enums';
import { NotificationType } from '../../../Enums.js';


class RecurringRequestConfirmed extends Component {
    render() {
        console.log('in rec req confirmed');
        console.log(this.props);
        return (
            <div className="modal-wrapper">
                <RequestSummary
                    title={this.props.notificationType === NotificationType.RECURRING_PICKUP_CONFIRMED  ? 
                        "Recurring Pickup Confirmed" :
                        "Emergency Pickup Confirmed"}
                    details={this.props.details}
                    notificationType={this.props.notificationType}
                />
                <p>
                    You can now see these
                    {this.props.accountType ===
                    AccountType.DONATING_AGENCY_MEMBER ? (
                            <span> pickups </span>
                        ) : (
                            <span> deliveries </span>
                        )}
                    on your calendar.
                </p>
                <div className="popup-buttons">
                    <button onClick={this.props.addressNotificationAndClose} className="okay-green" type="button">OK</button>
                </div>
            </div>
        );
    }
}
export default RecurringRequestConfirmed;
