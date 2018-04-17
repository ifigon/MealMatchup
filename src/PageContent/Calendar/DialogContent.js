import React, { Component } from 'react';
import ContactContent from './ContactContent';
import DelivererGroupContent from './DelivererGroupContent';
import ReceivingAgencyContent from './ReceivingAgencyContent';
import DonatingAgencyContent from './DonatingAgencyContent';

class DialogContent extends Component {
    render() {
        return (
            <div>
                <ContactContent
                    accountType={this.props.accountType}
                    futureEvent={this.props.futureEvent}
                    delivery={this.props.delivery}
                />
                <DelivererGroupContent
                    accountType={this.props.accountType}
                    futureEvent={this.props.futureEvent}
                    delivery={this.props.delivery}
                />
                <ReceivingAgencyContent delivery={this.props.delivery} />
                <DonatingAgencyContent delivery={this.props.delivery} />
            </div>
        );
    }
}
export default DialogContent;
