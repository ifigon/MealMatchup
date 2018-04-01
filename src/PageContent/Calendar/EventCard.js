import React, { Component } from 'react';
import './EventCard.css';
import green_truck from '../../icons/green_truck.svg';
class EventCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventType: 'recurring',
            eventTime: '10am - 12pm'
        };
    }
    render() {
        let type = '';
        if (this.state.eventType === 'recurring') {
            type = 'Reccuring Pick Up';
        }
        return (
            <div className="event-container">
                <h1 className="event-header">{type}</h1>
                <img
                    className="truck-icon"
                    src={green_truck}
                    alt="green truck"
                />
                <p className="event-time">{this.state.eventTime}</p>
            </div>
        );
    }
}
export default EventCard;
