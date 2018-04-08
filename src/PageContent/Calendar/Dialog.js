import React, { Component } from 'react';
import './Dialog.css';
import Header from './Header';
import DialogContent from './DialogContent';

class Dialog extends Component {
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
                    donatingAgency={'Local Point'}
                    donatingAgencyContactName={'Andrea Benson'}
                    donatingAgencyContactPhone={2065436975}
                    accountType={this.props.accountType}
                />
            </dialog>
        );
    }
}
export default Dialog;
