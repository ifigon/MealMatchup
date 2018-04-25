import React, { Component } from 'react';
import './Dialog.css';
import Header from './Header.js';
import DialogContent from './DialogContent';

class Dialog extends Component {
    render() {
        return (
            <dialog className="event-dialog" open>
                <Header
                    closeDialog={this.props.closeDialog}
                    startTime={this.props.delivery.startTimestamp}
                    endTime={this.props.delivery.endTimestamp}
                    futureEvent={this.props.futureEvent}
                    accountType={this.props.account.accountType}
                />
                <DialogContent
                    futureEvent={this.props.futureEvent}
                    delivery={this.props.delivery}
                    account={this.props.account}
                />
            </dialog>
        );
    }
}
export default Dialog;
