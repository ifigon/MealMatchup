import React, { Component } from 'react';
import EventCard from './EventCard';

class EventCardSlot extends Component {
    getEventCards() {
        // no deliveries for today
        if (!this.props.deliveries) {
            return null;
        }

        let eventCardSlotClass = '';
        if (this.props.deliveries.length > 1) {
            eventCardSlotClass = 'multiple-events';
        }

        return this.props.deliveries.map((item, i) =>(
            <EventCard
                key={i}
                account={this.props.account}
                delivery={item}
                eventClass={eventCardSlotClass}
            />
        ));
    }

    render() {

        return (
            <div className="slot-container">
                {this.getEventCards()}
            </div>
        );
    }
}

export default EventCardSlot;
