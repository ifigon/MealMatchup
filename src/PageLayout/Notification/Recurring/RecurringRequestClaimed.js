import React, { Component } from 'react';
import truck from '../../../icons/green_truck.svg';
import RequestTime from '../Details/RequestTime';

class RecurringRequestClaimed extends Component {
    render() {
        return (
            <div className="modal-wrapper">
                <img className="icon" src={truck} alt="icon" />
                <div className="modal-left-align">
                    <h1> Recurring pickup is claimed. We will notify you when 
                        it is confirmed by all parties and scheduled.</h1>
                    <p><span className="to-from">From:</span> {this.props.details.donatingAgencyDetails.name}     
                        <span className="right to-from">To:</span> {this.props.details.receivingAgency.name} <br/></p>
                    <div className="pickup-details">
                        <RequestTime request={this.props.details} />
                    </div>
                    <div className="popup-buttons">
                        {/* TODO: View on calendar button */}
                    </div>
                </div>
            </div>
        );
    }
}
export default RecurringRequestClaimed;