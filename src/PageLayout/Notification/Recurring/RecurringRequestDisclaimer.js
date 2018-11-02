import React, { Component } from 'react';
import { AccountType, NotificationType } from '../../../Enums';
import truckGreen from '../../../icons/green_truck.svg';
import truckRed from '../../../icons/red_truck.svg';
import RequestTime from '../Details/RequestTime';

class RecurringRequestDisclaimer extends Component {
    claimDelivery() {
        // TODO: backend handle claim
        this.props.claimRequest();
    }

    render() {
        let { daInfo, raInfo } = this.props.details;

        if (
            !raInfo &&
            this.props.account.accountType === AccountType.RECEIVING_AGENCY
        ) {
            // at RA claim step, there is no raInfo in delivery_request
            raInfo = this.props.account;
        }
        return (
            <div className="modal-wrapper">
                <img
                    className="icon"
                    src={this.props.notificationType ===  NotificationType.EMERGENCY_PICKUP_REQUESTED ?
                            truckRed :
                            truckGreen }
                    id="disclaimer-icon"
                    alt="icon"
                />
                <div className="modal-left-align">
                    <h1>Are you sure you want to claim this pickup?</h1>
                    <h2 className="warning">
                        Once a pickup is claimed it cannot be cancelled.
                    </h2>
                    <p>
                        <span className="to-from">From:</span> {daInfo.name}{' '}
                    </p>
                    <span className="to-from">To:</span> {raInfo.name} <br />
                    <div className="pickup-details">
                        <RequestTime
                            request={this.props.details}
                            title={true}
                        />
                    </div>
                    <div className="popup-buttons">
                        <button
                            onClick={this.claimDelivery.bind(this)}
                            className="claim"
                            type="button"
                        >
                            Confirm
                        </button>{' '}
                        <button
                            onClick={this.props.close}
                            className="reject"
                            type="button"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default RecurringRequestDisclaimer;
