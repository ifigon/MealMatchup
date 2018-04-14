import React, { Component } from 'react';
import ContactContent from './ContactContent';

class DialogContent extends Component {
    render() {
        return (
            <div>
                <ContactContent
                    accountType={this.props.accountType}
                    futureEvent={this.props.futureEvent}
                    delivery={this.props.delivery}
                />
            </div>
        );
    }
}
export default DialogContent;
