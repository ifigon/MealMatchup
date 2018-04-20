import React, { Component } from 'react';
import EventCard from './EventCard';
import { DeliveryType, StringFormat } from '../../../Enums';
import Dialog from '../Dialog.js';
import moment from 'moment';

class EventCardSlot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false
        };

        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    openDialog() {
        this.setState({
            dialogOpen: true
        });
    }

    closeDialog() {
        this.setState({
            dialogOpen: false
        });
    }

    render() {
        if (Object.keys(this.props.events).length === 0) {
            return <div />;
        } else {
            for (var e in this.props.events) {
                let type = DeliveryType.EMERGENCY;
                if (!this.props.events[e].isEmergency) {
                    type = DeliveryType.RECURRING;
                }
                let startTime = moment(
                    this.props.events[e].startTimestamp
                ).format(StringFormat.TIME);
                let endTime = moment(this.props.events[e].endTimestamp).format(
                    StringFormat.TIME
                );

                return (
                    <div>
                        {this.state.dialogOpen ? (
                            <Dialog
                                closeDialog={this.closeDialog}
                                delivery={this.props.events[e]}
                                futureEvent={this.props.futureEvent}
                                eventType={type}
                            />
                        ) : null}
                        <div onClick={this.openDialog}>
                            <EventCard
                                eventType={type}
                                startTime={startTime}
                                delivery={this.props.events[e]}
                                endTime={endTime}
                                futureEvent={this.props.futureEvent}
                            />
                        </div>
                    </div>
                );
            }
        }
    }
}

export default EventCardSlot;
