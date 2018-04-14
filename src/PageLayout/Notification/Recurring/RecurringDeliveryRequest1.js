import React, { Component } from 'react';
import truck from '../../../icons/green_truck.svg';
import Map from '../../../Map/Map.js';

class RecurringDeliveryRequest1 extends Component {
    render() {
        return (
            <div className="wrapper">
                <img className="icon" src={truck} alt="icon" /><h1>Reccuring Pickup Requested</h1>
                <div className="pickup-details">
                    <h2>Pickup Details</h2>
                    {/* TODO: Backend transform timestamp into the following format */}
                    <div className="start"><label>Start Date:</label> <p className="start-date">Thursday, 11/21/2018</p></div>
                    <p>10 Pickups requested for every Thursday</p>
                    <p>Pickup between 10 am - 12 pm</p>
                </div>
                <div className="flex">
                    <div className="donating-agency">
                        <h2 id="organizationName">Donating Agency</h2>
                        <p className="donating-recieving" id="donatingContactName">{this.props.details.requester}</p>
                        <p className="donating-recieving" id="donatingContactPhone">{this.props.details.donatingAgencyDetails.primaryContact.phone}</p>
                        <p className="donating-recieving" id="donatingContactEmail">{this.props.details.donatingAgencyDetails.primaryContact.email}</p>
                    </div>
                    <div className="notification-map">
                        <Map 
                            address={this.props.details.donatingAgencyDetails.address} 
                            height={'150px'}
                            width={'350px'}
                            marginRight={'30px'}
                            marginTop={'0px'}
                            marginBottom={'0px'}
                            marginLeft={'10px'}
                            className="map"></Map>
                    </div>
                </div>
                <div className="flex">
                    <div className="receiving-agency">
                        <h2>Recipient</h2>
                        <p className="donating-recieving" id="receivingContactName">{this.props.details.receivingAgency.primaryContact.name}</p>
                        <p className="donating-recieving" id="receivingContactPhone">{this.props.details.receivingAgency.primaryContact.phone}</p>
                        <p className="donating-recieving" id="receivingContactEmail">{this.props.details.receivingAgency.primaryContact.email}</p>
                    </div>
                    <div className="notification-map">
                        <Map 
                            address={this.props.details.receivingAgency.address} 
                            height={'150px'}
                            width={'350px'}
                            marginRight={'30px'}
                            marginTop={'0px'}
                            marginBottom={'0px'}
                            marginLeft={'10px'}
                            className="map"></Map>            
                    </div>
                </div>
                <div className="buttons">
                    <button onClick={this.props.nextStep} className="claim" type="button">Claim</button> <button onClick={this.props.close} className="reject" type="button">Reject</button>
                </div>
            </div>
        );
    }
}
export default RecurringDeliveryRequest1;