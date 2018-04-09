import React, { Component } from 'react';
import './Dialog.css';
import Header from './Header';
import DialogContent from './DialogContent';

let values = {
    donationDescription: [
        {
            name: 'Baked beans',
            amount: 15,
            unit: 'lbs'
        },
        {
            name: 'Coleslaw',
            amount: 20,
            unit: 'lbs'
        },
        {
            name: 'Corn',
            amount: 6,
            unit: 'lbs'
        },
        {
            name: 'Mashed potatoes',
            amount: 8,
            unit: 'lbs'
        },
        {
            name: 'Veggie burger patties',
            amount: 4,
            unit: 'lbs'
        },
        {
            name: 'Bread',
            amount: 40,
            unit: 'loaves'
        }
    ]
};

class Dialog extends Component {
    saveValues(fields) {
        return (function() {
            values = Object.assign({}, values, fields);
        })();
    }
    render() {
        return (
            <dialog className="event-dialog" open>
                <Header
                    eventType={this.props.eventType}
                    closeDialog={this.props.closeDialog}
                    date={this.props.date}
                    startTime={this.props.startTime}
                    endTime={this.props.endTime}
                    futureEvent={this.props.futureEvent}
                    accountType={this.props.accountType}
                />
                <DialogContent
                    futureEvent={this.props.futureEvent}
                    accountType={this.props.accountType}
                    donationDescription={values.donationDescription}
                    saveValues={this.saveValues.bind(this)}
                    accountOwnerName={this.props.accountOwnerName}
                />
            </dialog>
        );
    }
}
export default Dialog;
