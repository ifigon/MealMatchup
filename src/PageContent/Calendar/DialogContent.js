import React, { Component } from 'react';
import ContactContent from './ContactContent';

class DialogContent extends Component {
    render() {
        return (
            <div>
                <ContactContent
                    accountType={this.props.accountType}
                    futureEvent={this.props.futureEvent}
                    saveValues={this.props.saveValues}
                    phone={this.props.phone}
                    name={this.props.name}
                />
            </div>
        );
    }
}
export default DialogContent;
