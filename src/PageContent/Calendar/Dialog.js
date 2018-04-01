import React, { Component } from 'react';
import './Dialog.css';
import Header from './Header';
import DialogContent from './DialogContent';

class Dialog extends Component {
    render() {
        return (
            <dialog className="event-dialog" open>
                <Header
                    eventType="recurring"
                    closeDialog={this.props.closeDialog}
                    eventTime="11/14/2017 10am-12pm"
                />
                <DialogContent />
            </dialog>
        );
    }
}
export default Dialog;
