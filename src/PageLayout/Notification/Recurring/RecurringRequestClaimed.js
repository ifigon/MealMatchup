import React, { Component } from 'react';
import truck from '../../../icons/green_truck.svg';
import RequestTime from '../Details/RequestTime';

class RecurringRequestClaimed extends Component {
    // TODO: add pick up to calendar
    render() {
        return (
            <div className="modal-wrapper">
                <img className="icon" src={truck} alt="icon" />
                <div className="modal-left-align">
                    <h1> Recurring pickup is claimed. We will notify you when 
                        it is confirmed by all parties and scheduled.</h1>
                    <p><span className="to-from">From:</span> Local Point      
                    <span className="right to-from">To:</span> Seattle Union Gospel Mission <br/></p>
                    <div className="pickup-details">
                        <RequestTime request={this.props.details} />
                    </div>
                    <p id="modal-cal">The delivery is now on your calendar</p>
                    <div className="popup-buttons">
                        {/* TODO: View on calendar button */}
                    </div>
                </div>
            </div>
        );
    }
}
export default RecurringRequestClaimed;