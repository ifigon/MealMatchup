import React, { Component } from 'react';
import { DeliveryType } from '../../../Enums';
import './EventCard.css';
import green_truck from '../../../icons/green_truck.svg';
import grey_truck from '../../../icons/grey_truck.svg';
import moment from 'moment';
import { StringFormat } from '../../../Enums';
class EventCard extends Component {
    render() {
        let type = '';
        if (this.props.eventType === DeliveryType.RECURRING) {
            type = 'Reccuring Pick Up';
        }
        let truck = '';
        let truckAlt = '';
        let style = '';
        if (this.props.futureEvent) {
            truck = green_truck;
            truckAlt = 'green truck';
            style = 'event-container event-container-future';
        } else {
            truck = grey_truck;
            truckAlt = 'grey truck';
            style = 'event-container event-container-past';
        }
        let startTime = this.props.delivery[0].startTimestamp;
        let endTime = this.props.delivery[0].endTimestamp;
        return (
            <div className={style}>
                <h1 className="event-header">{type}</h1>
                <img className="truck-icon" src={truck} alt={truckAlt} />
                <p className="event-time">
                    {moment(startTime * 1000).format(StringFormat.TIME)} -{' '}
                    {moment(endTime * 1000).format(StringFormat.TIME)}
                </p>
            </div>
        );
    }
}
export default EventCard;
