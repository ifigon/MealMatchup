import React, { Component } from 'react';
import truck from '../../../icons/green_truck.svg';
import RequestSummary from '../Details/RequestSummary';
import { AccountType } from '../../../Enums';

class RecurringRequestConfirmed extends Component {
    render() {
        return (
            <div className="modal-wrapper">
                <RequestSummary 
                    title="Recurring Pickup Requested" 
                    details={this.props.details}
                    accountType={this.props.accountType} />
                <p>You can now see these 
                    {this.props.account.type === AccountType.DONATING_AGENCY_MEMBER ? 
                        <span> pickups </span> 
                        : 
                        <span> deliveries </span>}
                on your calendar.</p>
                <div className="popup-buttons">
                    <button onClick={this.props.closePopUp} className="okay-green" type="button">OK</button>
                </div>
            </div>
        );
    }
}
export default RecurringRequestConfirmed;