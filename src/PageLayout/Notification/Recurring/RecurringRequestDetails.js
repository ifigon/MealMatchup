import React, { Component } from 'react';
import { AccountType } from '../../../Enums';
import RequestSummary from '../Details/RequestSummary';

class RecurringRequestDetails extends Component {
    reject(){
        //TODO: backend handle removing notification from account
        this.props.close();
    }
    render() {
        let title = 'Recurring Pickup Requested';
        if (this.props.accountType === AccountType.RECEIVING_AGENCY) {
            title = 'Recurring Delivery Requested';
        }
        return (
            <div>
                <RequestSummary 
                    title={title}
                    details={this.props.details} />
                {
                    this.props.accountType === AccountType.DELIVERER_GROUP &&
                    <div className="popup-buttons">
                        <button onClick={this.props.nextStep} className="claim" type="button">Claim</button> 
                        <button onClick={this.reject.bind(this)} className="reject" type="button">Reject</button>
                    </div>
                }
                {
                    this.props.accountType === AccountType.RECEIVING_AGENCY &&
                    <div className="popup-buttons">
                        <button onClick={this.props.enterPrimaryContact} className="claim" type="button">Claim</button> 
                        <button onClick={this.reject.bind(this)} className="reject" type="button">Reject</button>
                    </div>
                }
                
            </div>
        );
    }
}
export default RecurringRequestDetails;