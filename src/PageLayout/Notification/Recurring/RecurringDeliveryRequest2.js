import React, { Component } from 'react';
import truck from '../../../icons/green_truck.svg';

class RecurringDeliveryRequest2 extends Component {
    render() {
        return (
            <div className="modal-wrapper">
                <img className="icon" src={truck} alt="icon" /><h1>Are you sure you want to claim this pickup?</h1>
                <h2 className="warning">Once a pickup is claimed it cannot be cancelled.</h2>
                <p><span className="to-from">From:</span> Local Point      <span className="right to-from">To:</span> Seattle Union Gospel Mission <br/>
                    {/* TODO: Backend replace info with timestamp */}
                    Start Date: Thursday, 11/21/2018
                    10 Pickups requested for every Thursday
                    Pickup between 10 am -12 pm</p>
                <div className="popup-buttons">
                    <button onClick={this.props.nextStep} className="claim" type="button">Confirm</button> <button onClick={this.props.close} className="reject" type="button">Cancel</button>
                </div>
            </div>
        );
    } 
}
export default RecurringDeliveryRequest2;