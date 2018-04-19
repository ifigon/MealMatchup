import React from 'react';
import RequestTime from './RequestTime';
import truck from '../../../icons/green_truck.svg';
import Map from '../../../Map/Map.js';

class RequestSummary extends React.Component {
    render() {
        return (
            <div className="modal-wrapper">
                <div className="flex">
                    <img className="icon" src={truck} alt="icon" />
                    <h1 id="modal-step1">{this.props.title}</h1>
                </div>
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
                            width={'350px'}
                            marginRight={'30px'}
                            marginTop={'0px'}
                            marginBottom={'0px'}
                            marginLeft={'10px'}
                            className="map"></Map>
                    </div>
                </div>
                { /* View for DG*/
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
                                    width={'350px'}
                                    marginRight={'30px'}
                                    marginTop={'0px'}
                                    marginBottom={'0px'}
                                    marginLeft={'10px'}
                                    className="map"></Map>            
                            </div> 
                        </div>
                }
                {/* View for RA */
                    this.props.details.delivererGroup.claimed  &&
                        <div className="receiving-agency">
                            <h2>Deliverers</h2>
                            <div className="modal-deliverers">
                                {
                                    this.props.details.dgInfo.deliverers.length === 0 ?
                                        <p>To be determined</p>
                                        :
                                        this.props.details.dgInfo.deliverers.map((d, i) => {
                                            return (
                                                <div className="mobile-student-info" id={i} key={i}>
                                                    <p id="mobile-name">{d.name}</p>
                                                    <p id="mobile-org">{d.email}</p>
                                                    <p id="mobile-org">{d.phone}</p>
                                                </div>
                                            );
                                        })
                                }
                            </div>
                        </div>
                }
            </div>
        );
    }
}
export default RequestSummary;
