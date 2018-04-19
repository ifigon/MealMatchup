import React, { Component } from 'react';
import { AccountType } from '../../../Enums';
import RequestSummary from '../Details/RequestSummary';

class RecurringRequestDetails extends Component {
    componentDidMount(){
        // console.log(this.props.accountType)
    }
    reject(){
        //TODO: backend handle removing notification from account
        this.props.close();
    }
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