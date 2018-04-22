import React, { Component } from 'react';
import EventCard from './EventCard';

class EventCardSlot extends Component {
    getEventCards() {
        let eventCards = [];
        let eventCardSlotClass = '';
        let size = 0;
        if (Object.keys(this.props.events).length > 0) {
            this.props.events[0].map(function(item, i) {
                size++;
                return <div />;
            });
            if (size > 1) {
                eventCardSlotClass = 'multiple-events';
            }
            eventCards.push(
                this.props.events[0].map((item, i) => {
                    return (
                        <EventCard
                            key={i}
                            delivery={item}
                            eventClass={eventCardSlotClass}
                        />
                    );
                })
            );
        }
        return eventCards;
    }

    render() {

        return (
            <div class="slot-container">
                {this.getEventCards()}
            </div>
        );
    }
}

export default EventCardSlot;
