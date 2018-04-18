import React, { Component } from 'react';
import truck from '../../../icons/green_truck.svg';
import Map from '../../../Map/Map.js';
import { AccountType } from '../../../Enums';
import RequestTime from '../Details/RequestTime';
import RequestSummary from '../Details/RequestSummary';

class RecurringRequestDetails extends Component {
    render() {
        return (
            <div>
                <RequestSummary 
                    title="Recurring Pickup Requested" 
                    details={this.props.details}
                    accountType={this.props.accountType} />
                {
                    this.props.accountType === AccountType.DELIVERER_GROUP &&
                    <div className="popup-buttons">
                        <button onClick={this.props.nextStep} className="claim" type="button">Claim</button> 
                        <button onClick={this.props.close} className="reject" type="button">Reject</button>
                    </div>
                }
                {
                    this.props.accountType === AccountType.RECEIVING_AGENCY &&
                    <div className="popup-buttons">
                        <button onClick={this.props.enterPrimaryContact} className="claim" type="button">Claim</button> 
                        <button onClick={this.props.close} className="reject" type="button">Reject</button>
                    </div>
                }
                
            </div>
        );
    }
}
export default RecurringRequestDetails;