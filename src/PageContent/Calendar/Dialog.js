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
                    deliverer1={
                        this.props.delivery.delivererGroup.deliverers[0].name
                    }
                    phone1={
                        this.props.delivery.delivererGroup.deliverers[0].phone
                    }
                    deliverer2={
                        this.props.delivery.delivererGroup.deliverers[1].name
                    }
                    phone2={
                        this.props.delivery.delivererGroup.deliverers[1].phone
                    }
                    email1={
                        this.props.delivery.delivererGroup.deliverers[0].email
                    }
                    email2={
                        this.props.delivery.delivererGroup.deliverers[1].email
                    }
                />
            </dialog>
        );
    }
}
export default Dialog;
