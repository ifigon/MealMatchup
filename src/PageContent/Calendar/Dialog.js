import React, { Component } from 'react';
import './Dialog.css';
import Header from './Header';
import DialogContent from './DialogContent';

let values = {
    delivererGroup: 'Green Greeks',
    deliverer1: 'Blake Johnson',
    phone1: '(206-389-2318)',
    deliverer2: 'Erika Zhang',
    phone2: '(206-876-5432)'
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
                />
                <DialogContent
                    accountType={this.props.accountType}
                    futureEvent={this.props.futureEvent}
                    delivererGroup={values.delivererGroup}
                    deliverer1={values.deliverer1}
                    phone1={values.phone1}
                    deliverer2={values.deliverer2}
                    phone2={values.phone2}
                    saveValues={this.saveValues.bind(this)}
                />
            </dialog>
        );
    }
}
export default Dialog;
