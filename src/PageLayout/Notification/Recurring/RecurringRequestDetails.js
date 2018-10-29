import React, { Component } from 'react';
import RequestSummary from '../Details/RequestSummary';
import { AccountType, NotificationType } from '../../../Enums';

class RecurringRequestDetails extends Component {
    render() {
        /*
        let title = 'Recurring Pickup Requested';
        if (this.props.accountType === AccountType.RECEIVING_AGENCY) {
            title = 'Recurring Delivery Requested';
        }
        */
        let title = '';
        this.props.notificationType === NotificationType.EMERGENCY_PICKUP_REQUESTED ?
            title = 'Emergency ' : title = 'Recurring ';
        this.props.accountType === AccountType.RECEIVING_AGENCY ?
            title += 'Delivery Requested' : title += 'Pickup Requested'; 

        return (
            <div>
                <RequestSummary 
                    title={title}
                    details={this.props.details} 
                    notificationType={this.props.notificationType} />
                {
                    this.props.accountType === AccountType.DELIVERER_GROUP &&
                    <div className="popup-buttons">
                        <button onClick={this.props.nextStep} className="claim" type="button">Claim</button> 
                        <button onClick={this.props.onReject.bind(this)} className="reject" type="button">Reject</button>
                    </div>
                }
                {
                    this.props.accountType === AccountType.RECEIVING_AGENCY &&
                    <div className="popup-buttons">
                        <button onClick={this.props.enterPrimaryContact} className="claim" type="button">Claim</button> 
                        <button onClick={this.props.onReject} className="reject" type="button">Reject</button>
                    </div>
                }
                
            </div>
        );
    }
}
export default RecurringRequestDetails;