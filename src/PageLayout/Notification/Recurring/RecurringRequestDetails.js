import React, { Component } from 'react';
import truck from '../../../icons/green_truck.svg';
import Map from '../../../Map/Map.js';
import { AccountType } from '../../../Enums';

class RecurringRequestDetails extends Component {
    render() {
        return (
            <div className="modal-wrapper">
                <div className="flex">
                    <img className="icon" src={truck} alt="icon" />
                    <h1 id="modal-step1">Reccuring Pickup Requested</h1>
                </div>
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
                {
                    this.props.accountType === AccountType.DELIVERER_GROUP &&
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
                            <div className="popup-buttons">
                                <button onClick={this.props.nextStep} className="claim" type="button">Claim</button> 
                                <button onClick={this.props.close} className="reject" type="button">Reject</button>
                            </div>
                        </div>
                }
                {
                    this.props.accountType === AccountType.RECEIVING_AGENCY &&
                        <div className="receiving-agency">
                            <h2>Deliverers</h2>
                            <div className="modal-deliverers">
                                {
                                    this.props.details.delivererGroup.deliverers.length === 0 ?
                                        <p>To be determined</p>
                                        :
                                        this.props.details.delivererGroup.deliverers.map((d, i) => {
                                            return (
                                                <div className="mobile-student-info" id={i} key={i}>
                                                    <p id="mobile-name">{d.name}</p>
                                                    <p id="mobile-org">{d.email}</p>
                                                    <a href={'tel:' + d.phone}>{d.phone}</a>
                                                </div>
                                            );
                                        })
                                }
                            </div>
                            <div className="popup-buttons">
                                <button onClick={this.props.enterPrimaryContact} className="claim" type="button">Claim</button> 
                                <button onClick={this.props.close} className="reject" type="button">Reject</button>
                            </div>
                        </div>
                }
                
            </div>
        );
    }
}
export default RecurringRequestDetails;