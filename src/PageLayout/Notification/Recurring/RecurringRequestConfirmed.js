import React, { Component } from 'react';
import RequestSummary from '../Details/RequestSummary';
import { AccountType } from '../../../Enums';

class RecurringRequestConfirmed extends Component {
    render() {
        return (
            <div className="modal-wrapper">
                <RequestSummary
                    title="Recurring Pickup Confirmed"
                    details={this.props.details}
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
                    <button
                        onClick={this.props.closePopUp}
                        className="okay-green"
                        type="button"
                    >
                        OK
                    </button>
                </div>
            </div>
        );
    }
}
export default RecurringRequestConfirmed;
