import React from 'react';
import RequestTime from './RequestTime';
import truck from '../../../icons/green_truck.svg';
import Map from '../../../Map/Map.js';

class RequestSummary extends React.Component {
    render() {
        return (
            <div className="modal-wrapper">
                <div className="modal-header-flex">
                    <img className="icon" src={truck} alt="icon" />
                    <h1 id="modal-step1">{this.props.title}</h1>
                </div>
                <div className="details-scroll">
                    <div className="pickup-details">
                        <RequestTime request={this.props.details} />
                    </div>
                    <div className="flex">
                        <div className="donating-agency">
                            <h2 id="organizationName">Donating Agency</h2>
                            <p className="donating-recieving" id="donatingAgency">{this.props.details.daInfo.name}</p>
                            <p className="donating-recieving" id="donatingContactName">{this.props.details.daInfo.primaryContact.name}</p>
                            <p className="donating-recieving" id="donatingContactPhone">{this.props.details.daInfo.primaryContact.phone}</p>
                            <p className="donating-recieving" id="donatingContactEmail">{this.props.details.daInfo.primaryContact.email}</p>
                        </div>
                        <div className="notification-map">
                            <Map 
                                address={this.props.details.daInfo.address} 
                                height={'150px'}
                                width={'300px'}
                                marginRight={'20px'}
                                marginTop={'0px'}
                                marginBottom={'0px'}
                                marginLeft={'10px'}
                                className="map"></Map>
                        </div>
                    </div>
                    { 
                        this.props.details.receivingAgency.claimed &&
                        <div className="flex">
                            <div className="receiving-agency">
                                <h2>Recipient</h2>
                                <p className="donating-recieving" id="donatingAgency">{this.props.details.raInfo.name}</p>
                                <p className="donating-recieving" id="receivingContactName">{this.props.details.raInfo.primaryContact.name}</p>
                                <p className="donating-recieving" id="receivingContactPhone">{this.props.details.raInfo.primaryContact.phone}</p>
                                <p className="donating-recieving" id="receivingContactEmail">{this.props.details.raInfo.primaryContact.email}</p>
                            </div>
                            <div className="notification-map">
                                <Map 
                                    address={this.props.details.raInfo.address} 
                                    height={'150px'}
                                    width={'300px'}
                                    marginRight={'20px'}
                                    marginTop={'0px'}
                                    marginBottom={'0px'}
                                    marginLeft={'10px'}
                                    className="map"></Map>            
                            </div> 
                        </div>
                    }
                    {
                        this.props.details.delivererGroup.claimed  &&
                        <div className="receiving-agency">
                            <h2>Student Group</h2>
                            <p className="donating-recieving" id="donatingAgency">{this.props.details.dgInfo.name}</p>
                            <p className="donating-recieving" id="receivingContactName">{this.props.details.dgInfo.primaryContact.name}</p>
                            <p className="donating-recieving" id="receivingContactPhone">{this.props.details.dgInfo.primaryContact.phone}</p>
                            <p className="donating-recieving" id="receivingContactEmail">{this.props.details.dgInfo.primaryContact.email}</p>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
export default RequestSummary;
