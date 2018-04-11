import React, { Component } from 'react';
import ContactContent from './ContactContent';

class DialogContent extends Component {
    render() {
        return (
            <div>
                <ContactContent
                    accountType={this.props.accountType}
                    futureEvent={this.props.futureEvent}
                    phone={this.props.delivery.contact.phone}
                    name={this.props.delivery.contact.name}
                />
            </div>
        );
    }
}
export default DialogContent;
