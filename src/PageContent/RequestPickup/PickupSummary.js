import React from 'react';
import './PickupSummary.css';
import greenTruck from '../../icons/green-truck.svg';
import redTruck from '../../icons/red_truck.svg';
import Map from '../../Map/Map.js';
import {
    RequestRepeatType,
    RequestEndCriteriaType,
    StringFormat,
    InputFormat
} from '../../Enums.js';
import moment from 'moment';

class PickupSummary extends React.Component {
    render() {
        let dayOfWeek = moment(this.props.request.startTimestamp).format(
            StringFormat.WEEKDAY
        );
        var repeatMap = {
            [RequestRepeatType.WEEKLY]: 'every ' + dayOfWeek,
            [RequestRepeatType.BIWEEKLY]: 'every other ' + dayOfWeek,
            // TODO: calculate nth day of month
            [RequestRepeatType.MONTHLY]: 'monthly'
        };

        var durationText = '';
        
        if(!this.props.isEmergency) {
            if (
                this.props.request.endCriteria.type === RequestEndCriteriaType.OCCUR
            ) {
                durationText =
                    this.props.request.endCriteria.value + ' pickups requested';
            } else {
                durationText =
                    'Ending ' +
                    moment(
                        this.props.request.endCriteria.value,
                        InputFormat.DATE
                    ).format(StringFormat.DATE_FULL);
            }
            durationText += ' for ' + repeatMap[this.props.request.repeats];
        }

        let start_date_with_weekday = moment(
            this.props.request.startTimestamp
        ).format(StringFormat.WEEKDAY_WITH_DATE);
        let startTime = moment(this.props.request.startTimestamp).format(
            StringFormat.TIME
        );
        let endTime = moment(this.props.request.endTimestamp).format(
            StringFormat.TIME
        );
        return (
            <div className="backdrop">
                {/* TODO: fix background opacity. Maybe with iFrame. */}
                <div className="modal">
                    <div className={this.props.notificationResources.topLine} />
                    <p id="exit" onClick={this.props.onClose}>
                        &times;
                    </p>
                    <div className="summary-title flex">
                        <img src={this.props.notificationResources.truck} alt="truck" />
                        <p id="title">{this.props.notificationResources.name} pickup requested</p>
                    </div>
                    <div className="summary-wrapper grid">
                        <div className="details grid">
                            <p id="subheading">Pickup Details</p>
                            <p>Start Date: {start_date_with_weekday} </p>
                            <p>{durationText}</p>
                            <p>
                                Pickup between {startTime} and {endTime}
                            </p>
                        </div>
                        <div className="flex">
                            <div className="agency grid">
                                <p id="subheading">Dining Hall</p>
                                <p id="name">
                                    {this.props.donatingAgency.name}
                                </p>
                                <div className="contact">
                                    <p>{this.props.primaryContact.name}</p>
                                    <p>{this.props.primaryContact.phone}</p>
                                    <p>{this.props.primaryContact.email}</p>
                                </div>
                            </div>
                            <Map
                                address={this.props.donatingAgency.address}
                                height={'150px'}
                                width={'350px'}
                                marginRight={'30px'}
                                marginTop={'0px'}
                                marginBottom={'0px'}
                                marginLeft={'10px'}
                            />
                        </div>
                        <div className="flex">
                            <div className="agency grid">
                                <p id="subheading">Recipient</p>
                                {this.props.raRequested  ? (
                                    <div>
                                        <p id="name">
                                            {this.props.raRequested.name}
                                        </p>
                                        <div className="contact">
                                            <p>
                                                {
                                                    this.props.raRequested
                                                        .primaryContact.name
                                                }
                                            </p>
                                            <p>
                                                {
                                                    this.props.raRequested
                                                        .primaryContact.phone
                                                }
                                            </p>
                                            <p>
                                                {
                                                    this.props.raRequested
                                                        .primaryContact.email
                                                }
                                            </p>
                                            <p>Confirmation pending.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="contact">
                                        <p>
                                            Request will be sent to all
                                            participating shelters.
                                        </p>
                                        <p>Confirmation pending.</p>
                                    </div>
                                )}
                            </div>
                            {this.props.raRequested && (
                                <Map
                                    address={this.props.raRequested.address}
                                    height={'150px'}
                                    width={'350px'}
                                    marginRight={'30px'}
                                    marginTop={'30px'}
                                    marginBottom={'0px'}
                                    marginLeft={'10px'}
                                />
                            )}
                        </div>
                        <div className="flex">
                            {!this.props.isEmergency && 
                                <div className="agency grid">
                                    <p id="subheading">Student Group</p>
                                    {this.props.dgRequested ? (
                                        <div>
                                            <p id="name">
                                                {this.props.dgRequested.name}
                                            </p>
                                            <div className="contact">
                                                <p>
                                                    {
                                                        this.props.dgRequested
                                                            .primaryContact.name
                                                    }
                                                </p>
                                                <p>
                                                    {
                                                        this.props.dgRequested
                                                            .primaryContact.phone
                                                    }
                                                </p>
                                                <p>
                                                    {
                                                        this.props.dgRequested
                                                            .primaryContact.email
                                                    }
                                                </p>
                                                <p>Confirmation pending.</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="contact">
                                            <p>
                                                Request will be sent to all
                                                participating student groups.
                                            </p>
                                            <p>Confirmation pending.</p>
                                        </div>
                                    )}
                                    
                                </div> 
                            }
                        </div>
                        
                        {this.props.request.notes !== '' ? (
                            <div className="details grid">
                                <p id="subheading">Notes for Pickup</p>
                                <p>{this.props.request.notes}</p>
                            </div>
                        ) : (
                            <br />
                        )}
                    </div>
                    {this.props.submissionError && (
                        <p>
                            Failed to submit pickup request, please refresh and
                            try again.
                        </p>
                    )}

                    <div className="footer">
                        <input
                            type="submit"
                            value="Confirm"
                            onClick={this.props.onConfirm}
                        />
                        <input
                            type="submit"
                            value="Cancel"
                            onClick={this.props.onClose}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default PickupSummary;
