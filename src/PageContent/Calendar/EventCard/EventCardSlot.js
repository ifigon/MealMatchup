import React, { Component } from 'react';
import EventCard from './EventCard';
import DeliveryType from '../../../Enums';

class EventCardSlot extends Component {
    render() {
        return (
            <div>
                <EventCard
                    eventType={DeliveryType.RECURRING}
                    startTime="10am"
                    endTime="12pm"
                    futureEvent={true}
                />
            </div>
        );
    }
}

export default EventCardSlot;
