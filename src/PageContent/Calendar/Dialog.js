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
                    startTime={this.props.delivery.startTimestamp}
                    endTime={this.props.delivery.endTimestamp}
                    futureEvent={this.props.futureEvent}
                    accountType={this.props.accountType}
                />
                <DialogContent
                    accountType={this.props.accountType}
                    futureEvent={this.props.futureEvent}
                    delivery={this.props.delivery}
                />
            </dialog>
        );
    }
}
export default Dialog;
