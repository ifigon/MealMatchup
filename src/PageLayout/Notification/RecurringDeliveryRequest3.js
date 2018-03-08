import React, { Component } from 'react';
import truck from '../../icons/green_truck.svg';

class RecurringDeliveryRequest3 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wrapper">
                <img className="icon" src={truck} alt="icon" /><h1>Reoccuring pickup is scheduled!</h1>
                <p>From: Local Point      To: Seattle Union Gospel Mission
Start Date: Thursday, 11/21/2018
10 Pickups requested for every Thursday
Pickup between 10 am -12 pm</p>

                <div className="buttons">
                    <button className="reject" type="button">View on calendar</button>
                </div>
            </div>
        );
    }
}
export default RecurringDeliveryRequest3;