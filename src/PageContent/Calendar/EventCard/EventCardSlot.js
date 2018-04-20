import React, { Component } from 'react';
import EventCard from './EventCard';

class EventCardSlot extends Component {
    render() {
        if (Object.keys(this.props.events).length === 0) {
            return <div />;
        } else {
            for (var e in this.props.events[0]) {
                return (
                    <div className="individual-event">
                        <EventCard
                            delivery={this.props.events[0][e]}
                            futureEvent={this.props.futureEvent}
                        />
                    </div>
                );
            }
        }
    }
}

export default EventCardSlot;
