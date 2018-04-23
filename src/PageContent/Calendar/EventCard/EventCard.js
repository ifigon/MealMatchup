import React, { Component } from 'react';
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
        let truck = '';
        let truckAlt = '';
        let style = '';
        let futureEvent = moment(this.props.delivery.startTimestamp).isAfter(moment());

        if (futureEvent) {
            truck = green_truck;
            truckAlt = 'green truck';
            style = 'event-container event-container-future';
        } else {
            truck = grey_truck;
            truckAlt = 'grey truck';
            style = 'event-container event-container-past';
        }

        let startTime = moment(this.props.delivery.startTimestamp).format(StringFormat.TIME);
        let endTime = moment(this.props.delivery.endTimestamp).format(StringFormat.TIME);

        let multiple = false;
        if (this.props.eventClass === 'multiple-events') {
            multiple = true;
        }

        return (
            <div className={this.props.eventClass}>
                {this.state.dialogOpen ? (
                    <Dialog
                        closeDialog={this.closeDialog}
                        account={this.props.account}
                        delivery={this.props.delivery}
                        futureEvent={futureEvent}
                    />
                ) : null}

                {multiple ? (
                    <div className={style} onClick={this.openDialog}>
                        <div className="text">
                            {startTime} - {endTime}
                            <img
                                className="truck-icon"
                                src={truck}
                                alt={truckAlt}
                            />
                        </div>
                    </div>
                ) : (
                    <div className={style} onClick={this.openDialog}>
                        <h1 className="event-header">Reccuring Pick Up</h1>
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
