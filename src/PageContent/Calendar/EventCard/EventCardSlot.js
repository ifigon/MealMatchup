import React, { Component } from 'react';
import EventCard from './EventCard';
import DeliveryType from '../../../Enums';

class EventCardSlot extends Component {
    render() {
        if (Object.keys(this.props.events).length === 0) {
            return <div />;
        } else {
            for (var e in this.props.events) {
                let type = DeliveryType.EMERGENCY;
                if (!this.props.events[e].isEmergency) {
                    type = DeliveryType.RECURRING;
                }

                let startTime = new Date(
                    this.props.events[e].startTimestamp * 1000
                );
                // console.log(e.startTimestamp);
                let endTime = new Date(
                    this.props.events[e].endTimeStamp * 1000
                );
                // let future = e.startTime
                //e.startTimestamp to 10am time
                //e.endTimestamp to 12pm time
                //futureEvent depends on [after] this.props.today
                return (
                    <EventCard
                        eventType={type}
                        startTime={startTime}
                        endTime={endTime}
                        futureEvent={this.props.futureEvent}
                    />
                );
            }
            // });
        }
    }
}

export default EventCardSlot;
