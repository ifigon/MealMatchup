import React, { Component } from 'react';
import './Dialog.css';
import Header from './Header.js';
import DialogContent from './DialogContent';

class Dialog extends Component {
    render() {
        return (
            <dialog className="event-dialog" open>
                <Header
                    eventType={this.props.eventType}
                    closeDialog={this.props.closeDialog}
                    date={this.props.delivery.date}
                    startTime={this.props.delivery.startTimestamp}
                    endTime={this.props.delivery.endTimestamp}
                    futureEvent={this.props.futureEvent}
                    accountType={this.props.accountType}
                />
                <DialogContent
                    delivery={this.props.delivery}
                    accountType={this.props.accountType}
                />
            </dialog>
        );
    }
}
export default Dialog;
