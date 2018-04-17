import React, { Component } from 'react';
import './Dialog.css';
import Header from './Header';
import DialogContent from './DialogContent';

class Dialog extends Component {
    render() {
        return (
            <dialog className="event-dialog" open>
                <Header
                    eventType={this.props.delivery.eventType}
                    closeDialog={this.props.closeDialog}
                    date={this.props.delivery.date}
                    startTime={this.props.delivery.startTime}
                    endTime={this.props.delivery.endTime}
                    futureEvent={this.props.futureEvent}
                    accountType={this.props.accountType}
                />
                <DialogContent
                    futureEvent={this.props.futureEvent}
                    delivery={this.props.delivery}
                    accountOwnerName={this.props.accountOwnerName}
                    accountType={this.props.accountType}
                />
            </dialog>
        );
    }
}
export default Dialog;
