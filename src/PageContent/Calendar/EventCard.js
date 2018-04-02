import React, { Component } from 'react';
import { DeliveryType } from '../../Enums';
import './EventCard.css';
import green_truck from '../../icons/green_truck.svg';
import grey_truck from '../../icons/grey_truck.svg';

class EventCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventType: DeliveryType.RECURRING,
            startTime: '10am',
            endTime: '12pm',
            futureEvent: true
        };
    }
    render() {
        let type = '';
        if (this.state.eventType === 'recurring') {
            type = 'Reccuring Pick Up';
        }
        let truck = '';
        let truckAlt = '';
        let style = '';
        if (this.state.futureEvent) {
            truck = green_truck;
            truckAlt = 'green truck';
            style = 'event-container event-container-future';
        } else {
            truck = grey_truck;
            truckAlt = 'grey truck';
            style = 'event-container event-container-past';
        }

        return (
            <div className={style}>
                <h1 className="event-header">{type}</h1>
                <img className="truck-icon" src={truck} alt={truckAlt} />
                <p className="event-time">
                    {this.state.startTime} - {this.state.endTime}
                </p>
            </div>
        );
    }
}
export default EventCard;
