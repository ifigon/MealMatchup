import React, { Component } from 'react';
import EventCard from './EventCard';
import DeliveryType from '../../../Enums';

class EventCardSlot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: null
        };
    }

    render() {
        if (Object.keys(this.props.events).length === 0) {
            return <div />;
        } else {
            let type = '';
            for (var e in this.props.events) {
                if (!e.isEmergency) {
                    type = DeliveryType.RECURRING;
                }
                // let future = e.startTime
                //e.startTimestamp to 10am time
                //e.endTimestamp to 12pm time
                //futureEvent depends on [after] this.props.today
                return (
                    <EventCard
                        eventType={type}
                        startTime="10am"
                        endTime="12pm"
                        futureEvent={this.props.future}
                    />
                );
            }
            // });
        }
    }
}

export default EventCardSlot;
