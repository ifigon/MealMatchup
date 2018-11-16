import React, { Component } from 'react';
import './Dialog.css';
import Header from './Header.js';
import DialogContent from './DialogContent';

class Dialog extends Component {
    render() {
        return (
            <div className="dialog-wrapper">
                {/* close dialog if anywhere outside of dialog is clicked */}
                <div className="dialog-overlay" onClick={this.props.closeDialog}></div> 
                <dialog className="event-dialog" open>
                    <Header
                        closeDialog={this.props.closeDialog}
                        startTime={this.props.delivery.startTimestamp}
                        endTime={this.props.delivery.endTimestamp}
                        futureEvent={this.props.futureEvent}
                        accountType={this.props.account.accountType}
                        delivery={this.props.delivery}
                    />
                    <DialogContent
                        futureEvent={this.props.futureEvent}
                        delivery={this.props.delivery}
                        account={this.props.account}
                    />
                </dialog>
            </div>
        );
    }
}
export default Dialog;
