import React, { Component } from 'react';
import './EventCard.css';
import green_truck from '../../icons/green_truck.svg';
import grey_truck from '../../icons/grey_truck.svg';

class EventCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventType: 'recurring',
            eventTime: '10am - 12pm',
            eventStatus: 'past'
        };
    }
    render() {
        let type = '';
        if (this.state.eventType === 'recurring') {
            type = 'Reccuring Pick Up';
        }
        return (
            <div>
                {this.state.eventStatus === 'future' ? (
                    <div className="event-container event-container-future">
                        <h1 className="event-header">{type}</h1>

                        <img
                            className="truck-icon"
                            src={green_truck}
                            alt="green truck"
                        />
                        <p className="event-time">{this.state.eventTime}</p>
                    </div>
                ) : this.state.eventStatus === 'past' ? (
                    <div className="event-container event-container-past">
                        <h1 className="event-header">{type}</h1>

                        <img
                            className="truck-icon"
                            src={grey_truck}
                            alt="grey truck"
                        />
                        <p className="event-time">{this.state.eventTime}</p>
                    </div>
                ) : null}
            </div>
        );
    }
}
export default EventCard;
