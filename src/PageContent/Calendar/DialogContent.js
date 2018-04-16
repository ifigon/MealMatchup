import React, { Component } from 'react';
import DescriptionContent from './DescriptionContent';
import ReceivingAgencyContent from './ReceivingAgencyContent';
import DonatingAgencyContent from './DonatingAgencyContent';

class DialogContent extends Component {
    render() {
        return (
            <div>
                <DescriptionContent
                    futureEvent={this.props.futureEvent}
                    delivery={this.props.delivery}
                    accountOwnerName={this.props.accountOwnerName}
                    accountType={this.props.accountType}
                />
                <ReceivingAgencyContent delivery={this.props.delivery} />
                <DonatingAgencyContent delivery={this.props.delivery} />
            </div>
        );
    }
}
export default DialogContent;
