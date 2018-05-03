import React from 'react';
import RequestTime from './RequestTime';
import truck from '../../../icons/green_truck.svg';
import Map from '../../../Map/Map.js';

class RequestSummary extends React.Component {
    render() {
        const { details, title } = this.props;
        return (
            <div className="modal-wrapper">
                <div className="modal-header-flex">
                    <img className="icon" src={truck} alt="icon" />
                    <h1 id="modal-step1">{title}</h1>
                </div>
                <div className="details-scroll">
                    <div className="pickup-details">
                        <RequestTime request={details} title={true} />
                    </div>
                    <div className="flex">
                        <div className="donating-agency">
                            <h2 id="organizationName">Donating Agency</h2>
                            <p
                                className="donating-recieving"
                                id="donatingAgency"
                            >
                                {details.daInfo.name}
                            </p>
                            <p
                                className="donating-recieving"
                                id="donatingContactName"
                            >
                                {details.daInfo.primaryContact.name}
                            </p>
                            <p
                                className="donating-recieving"
                                id="donatingContactPhone"
                            >
                                {details.daInfo.primaryContact.phone}
                            </p>
                            <p
                                className="donating-recieving"
                                id="donatingContactEmail"
                            >
                                {details.daInfo.primaryContact.email}
                            </p>
                        </div>
                        <div className="notification-map">
                            <Map
                                address={details.daInfo.address}
                                height={'150px'}
                                width={'300px'}
                                marginRight={'20px'}
                                marginTop={'0px'}
                                marginBottom={'0px'}
                                marginLeft={'10px'}
                                className="map"
                            />
                        </div>
                    </div>
                    {details.receivingAgency && details.receivingAgency.claimed && (
                        <div className="flex">
                            <div className="receiving-agency">
                                <h2>Recipient</h2>
                                <p
                                    className="donating-recieving"
                                    id="donatingAgency"
                                >
                                    {details.raInfo.name}
                                </p>
                                <p
                                    className="donating-recieving"
                                    id="receivingContactName"
                                >
                                    {details.raContact.name}
                                </p>
                                <p
                                    className="donating-recieving"
                                    id="receivingContactPhone"
                                >
                                    {details.raContact.phone}
                                </p>
                                <p
                                    className="donating-recieving"
                                    id="receivingContactEmail"
                                >
                                    {details.raContact.email}
                                </p>
                            </div>
                            <div className="notification-map">
                                <Map
                                    address={details.raInfo.address}
                                    height={'150px'}
                                    width={'300px'}
                                    marginRight={'20px'}
                                    marginTop={'0px'}
                                    marginBottom={'0px'}
                                    marginLeft={'10px'}
                                    className="map"
                                />
                            </div>
                        </div>
                    )}
                    {details.delivererGroup && details.delivererGroup.claimed && (
                        <div className="receiving-agency">
                            <h2>Student Group</h2>
                            <p
                                className="donating-recieving"
                                id="donatingAgency"
                            >
                                {details.dgInfo.name}
                            </p>
                            <p
                                className="donating-recieving"
                                id="receivingContactName"
                            >
                                {details.dgInfo.primaryContact.name}
                            </p>
                            <p
                                className="donating-recieving"
                                id="receivingContactPhone"
                            >
                                {details.dgInfo.primaryContact.phone}
                            </p>
                            <p
                                className="donating-recieving"
                                id="receivingContactEmail"
                            >
                                {details.dgInfo.primaryContact.email}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
export default RequestSummary;
