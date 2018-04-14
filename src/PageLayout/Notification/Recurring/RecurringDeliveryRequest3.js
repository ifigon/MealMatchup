import React, { Component } from 'react';
import truck from '../../../icons/green_truck.svg';

class RecurringDeliveryRequest3 extends Component {
    // TODO: add pick up to calendar
    render() {
        return (
            <div className="modal-wrapper">
                <img className="icon" src={truck} alt="icon" />
                <div className="modal-left-align">
                    <h1> Recurring pickup is claimed. We will notify you when 
                        it is confirmed by all parties and scheduled.</h1>
                    <p><span className="to-from">From:</span> Local Point      
                    <span className="right to-from">To:</span> Seattle Union Gospel Mission <br/>
                Start Date: Thursday, 11/21/2018
                10 Pickups requested for every Thursday
                Pickup between 10 am -12 pm</p>
                    <div className="popup-buttons">
                        <button onClick={this.props.close} className="claim end" type="button">View on calendar</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default RecurringDeliveryRequest3;