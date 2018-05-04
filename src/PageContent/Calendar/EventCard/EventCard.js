import React, { Component } from 'react';
import './EventCard.css';
import green_truck from '../../../icons/green_truck.svg';
import grey_truck from '../../../icons/grey_truck.svg';
import white_truck from '../../../icons/white_truck.svg';
import plus from '../../../icons/plus-button.svg';
import moment from 'moment';
import { AccountType, StringFormat } from '../../../Enums';
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
        const { account, delivery } = this.props;
        let icon = '';
        let iconAlt = '';
        let iconClass = 'eventcard-icon ';
        let style = 'event-container ';
        let futureEvent = moment(delivery.startTimestamp).isAfter(moment());
        let actionNeeded = futureEvent && (
            (account.accountType === AccountType.DELIVERER_GROUP && !delivery.deliverers) ||
            (account.accountType === AccountType.DONATING_AGENCY_MEMBER && 
                (!delivery.description || !delivery.description.foodItems)));

        if (futureEvent) {
            style += 'event-container-future';
            if (actionNeeded) {
                // use red plus icon if an action is required for this delivery
                icon = plus;
                iconAlt = 'plus';
                iconClass += 'eventcard-plus-icon';
            } else {
                icon = green_truck;
                iconAlt = 'green truck';
                iconClass += 'truck-icon';
            }
        } else {
            style += 'event-container-past';
            icon = grey_truck;
            iconAlt = 'grey truck';
            iconClass += 'truck-icon';
        }

        if (this.state.dialogOpen) {
            style += '-clicked';
            if (!actionNeeded) {
                icon = white_truck;
                iconAlt = 'white truck';
            }
        }

        let startTime = moment(delivery.startTimestamp).format(StringFormat.TIME);
        let endTime = moment(delivery.endTimestamp).format(StringFormat.TIME);

        let multiple = false;
        if (this.props.eventClass === 'multiple-events') {
            multiple = true;
        }

        return (
            <div className={this.props.eventClass}>
                {this.state.dialogOpen ? (
                    <Dialog
                        closeDialog={this.closeDialog}
                        account={account}
                        delivery={delivery}
                        futureEvent={futureEvent}
                    />
                ) : null}

                {multiple ? (
                    <div className={style} onClick={this.openDialog}>
                        <div className="text">
                            {startTime} - {endTime}
                            <img
                                className={iconClass}
                                src={icon}
                                alt={iconAlt}
                            />
                        </div>
                    </div>
                ) : (
                    <div className={style} onClick={this.openDialog}>
                        <h1 className="event-header">Reccuring Pick Up</h1>
                        <img
                            className={iconClass}
                            src={icon}
                            alt={iconAlt}
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
