import React, { Component } from 'react';
import EventCard from './EventCard';

class EventCardSlot extends Component {
    render() {
        let eventCard = [];
        let eventCardSlotClass = '';
        let size = 0;
        if (Object.keys(this.props.events).length > 0) {
            this.props.events[0].map((item, i) => {
                size++;
            });
            if (size > 1) {
                eventCardSlotClass = 'multiple-events';
            }
            eventCard.push(
                this.props.events[0].map((item, i) => {
                    return (
                        <EventCard
                            key={i}
                            delivery={item}
                            eventClass={eventCardSlotClass}
                            // futureEvent={this.props.futureEvent}
                        />
                    );
                })
            );
        }

        return <div>{eventCard}</div>;
    }
}

export default EventCardSlot;
