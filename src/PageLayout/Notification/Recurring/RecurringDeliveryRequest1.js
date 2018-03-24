import React, { Component } from 'react';
import truck from '../../../icons/green_truck.svg';
import Map from '../../../Map/Map.js';

class RecurringDeliveryRequest1 extends Component {
    render() {
        return (
            <div className="wrapper">
                <img className="icon" src={truck} alt="icon" />
                <h1>Reccuring Pickup Requested</h1>
                <div className="pickup-details">
                    <h2>Pickup Details</h2>
                    <div className="start">
                        <label>Start Date:</label>{' '}
                        <p className="start-date">{this.props.startDate}</p>
                    </div>
                    <p>{this.props.duration}</p>
                    <p>
                        Pickup between {this.props.startTime}-{
                            this.props.endTime
                        }
                    </p>
                </div>

                {this.props.delivererGroup ? (
                    <div>
                        <h2>Student Deliverers</h2>
                        <h3 className="orgName">{this.props.delivererGroup}</h3>
                        <p className="donating-recieving">
                            {this.props.delivererGroupCoordinatorContactName}
                        </p>
                        <p className="donating-recieving">
                            {this.props.delivererGroupCoordinatorContactPhone}
                        </p>
                        <p className="donating-recieving">
                            {this.props.delivererGroupCoordinatorContactEmail}
                        </p>
                    </div>
                ) : null}

                {this.props.receivingAgency ? (
                    <div>
                        <div className="receiving-agency">
                            <h2>Recipient</h2>
                            <h3 className="orgName">
                                {this.props.receivingAgency}
                            </h3>
                            <p
                                className="donating-recieving"
                                id="receivingContactName"
                            >
                                {this.props.receivingPrimaryContactName}
                            </p>
                            <p
                                className="donating-recieving"
                                id="receivingContactPhone"
                            >
                                {this.props.receivingPrimaryContactPhone}
                            </p>
                            <p
                                className="donating-recieving"
                                id="receivingContactEmail"
                            >
                                {this.props.receivingPrimaryContactEmail}
                            </p>
                        </div>

                        {/*To do: pass in coordinates*/}
                        <div className="map">
                            <Map className="map" />
                        </div>
                    </div>
                ) : null}

                <div className="donating-agency">
                    <h2 id="organizationName">Dining Hall</h2>
                    <h3 className="orgName">{this.props.donatingAgency}</h3>
                    <p className="donating-recieving" id="donatingContactName">
                        {this.props.donatingPrimaryContactName}
                    </p>
                    <p className="donating-recieving" id="donatingContactPhone">
                        {this.props.donatingPrimaryContactPhone}
                    </p>
                    <p className="donating-recieving" id="donatingContactEmail">
                        {this.props.donatingPrimaryContactEmail}
                    </p>

                    {/*To do: pass in coordinates*/}
                    <div className="map">
                        <Map className="map" />
                    </div>
                </div>

                {this.props.notes ? (
                    <div>
                        <h2>Notes for Pickup</h2>
                        <p className="notes">{this.props.notes}</p>
                    </div>
                ) : null}

                <div className="buttons">
                    <button
                        onClick={this.props.nextStep}
                        className="claim"
                        type="button"
                    >
                        Claim
                    </button>{' '}
                    <button
                        onClick={this.props.close}
                        className="reject"
                        type="button"
                    >
                        Reject
                    </button>
                </div>
            </div>
        );
    }
}
export default RecurringDeliveryRequest1;
