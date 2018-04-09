import React, { Component } from 'react';
import './Dialog.css';
import Header from './Header';
import DialogContent from './DialogContent';

let values = {
    name: 'Chris Stack',
    phone: 2065436975
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
                    saveValues={this.saveValues.bind(this)}
                    phone={values.phone}
                    name={values.name}
                />
            </dialog>
        );
    }
}
export default Dialog;
