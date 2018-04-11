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
                    accountType={this.props.accountType}
                    futureEvent={this.props.futureEvent}
                    delivererGroup={this.props.delivery.delivererGroup.name}
                    delivery={this.props.delivery}
                />
            </dialog>
        );
    }
}
export default Dialog;
