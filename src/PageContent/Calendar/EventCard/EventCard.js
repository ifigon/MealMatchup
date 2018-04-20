import React, { Component } from 'react';
import { DeliveryType } from '../../../Enums';
import './EventCard.css';
import green_truck from '../../../icons/green_truck.svg';
import grey_truck from '../../../icons/grey_truck.svg';
import moment from 'moment';
import { StringFormat } from '../../../Enums';
import Dialog from '../Dialog.js';

class EventCard extends Component {
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
        let eventType = DeliveryType.RECURRING;
        if (this.props.delivery.isEmergency) {
            eventType = DeliveryType.EMERGENCY;
        }
        let typeHeader = '';
        if (eventType === DeliveryType.RECURRING) {
            typeHeader = 'Reccuring Pick Up';
        }
        let truck = '';
        let truckAlt = '';
        let style = '';
        if (this.props.futureEvent) {
            truck = green_truck;
            truckAlt = 'green truck';
            style = 'event-container event-container-future';
        } else {
            truck = grey_truck;
            truckAlt = 'grey truck';
            style = 'event-container event-container-past';
        }

        let startTime = moment(this.props.delivery.startTimestamp).format(
            StringFormat.TIME
        );
        let endTime = moment(this.props.delivery.endTimestamp).format(
            StringFormat.TIME
        );

        let multiple = false;
        if (this.props.eventClass === 'multiple-events') {
            multiple = true;
        }
        console.log(multiple);
        return (
            <div className={this.props.eventClass}>
                {this.state.dialogOpen ? (
                    <Dialog
                        closeDialog={this.closeDialog}
                        delivery={this.props.delivery}
                        futureEvent={this.props.futureEvent}
                        eventType={eventType}
                        startTime={this.props.delivery.startTimestamp}
                        endTime={this.props.delivery.endTimestamp}
                    />
                ) : null}
                {multiple ? (
                    <div className={style} onClick={this.openDialog}>
                        <h1 className="event-header">{typeHeader}</h1>
                        <img
                            className="truck-icon"
                            src={truck}
                            alt={truckAlt}
                        />
                    </div>
                ) : (
                    <div className={style} onClick={this.openDialog}>
                        <h1 className="event-header">{typeHeader}</h1>
                        <img
                            className="truck-icon"
                            src={truck}
                            alt={truckAlt}
                        />
                        <p className="event-time">
                            {startTime} - {endTime}
                        </p>
                    </div>
                )}
            </div>
        );
    }
}
export default EventCard;
