import React from 'react';
import RequestTime from './RequestTime';
import greenTruck from '../../../icons/green_truck.svg';
import redTruck from '../../../icons/red_truck.svg';
import Map from '../../../Map/Map.js';
import { NotificationType } from '../../../Enums.js';
import { NotificationMap } from '../NotificationMap';


class RequestSummary extends React.Component {
    render() {
        /*
                            { NotificationMap[this.props.notificationType].color === "green" ?
                        <img className="icon" src={greenTruck} alt="icon" /> :
                        <img className="icon" src={redTruck} alt="icon" />
                    }
        */
        const { details, title } = this.props;
        return (
            <div className="modal-wrapper">
                <div className="modal-header-flex">
                    { NotificationMap[this.props.notificationType].color === "green" ?
                        <img className="icon" src={greenTruck} alt="icon" /> :
                        <img className="icon" src={redTruck} alt="icon" />
                    }
                    <h1 id="modal-step1">{title}</h1>
                </div>
                <div className="details-scroll">
                    <div className="pickup-details">
                        <RequestTime request={details} title={true} notificationType={this.props.notificationType} />
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
                    {this.props.notificationType === NotificationType.EMERGENCY_PICKUP_REQUESTED &&
                    <div>
                        <h2>Donation Description</h2>
                        
                    </div>}
                    
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
