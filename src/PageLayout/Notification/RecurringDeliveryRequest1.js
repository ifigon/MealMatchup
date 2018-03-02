import React, { Component } from 'react'
import ReactDOM from 'react-dom';

import truck from '../../icons/truck.svg';

class RecurringDeliveryRequest1 extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (            
        <div className="wrapper">
        <img className="icon" src={truck} alt="icon"/><h1>Reccuring Pickup Requested</h1>
            <div className="pickup-details">
            <h2>Pickup Details</h2>
            <div className="start"><label>Start Date</label> <p className="start-date">Thursday, 11/21/2018</p></div>
            <p>10 Pickups requested for every Thursday</p>
            <p>Pickup between 10 am -12 pm</p>
            </div>

            <div className="donating-agency">
            <h2 id="organizationName">Dining Hall</h2>
            <p className="donating-recieving" id="donatingContactName">Andrea Benson</p>
            <p className="donating-recieving" id="donatingContactPhone">206-487-2859</p>
            <p className="donating-recieving" id="donatingContactEmail">bandrea247@gmail.com</p>
            </div>

            <div className="receiving-agency">
            <h2>Recipient</h2>
            <p className="donating-recieving" id="receivingContactName">Amy Powell</p>
            <p className="donating-recieving" id="receivingContactPhone">206-487-2859</p>
            <p className="donating-recieving" id="receivingContactEmail">amypowell@sugm.com</p>
            </div>
    </div>
        )
    }
}
export default RecurringDeliveryRequest1;