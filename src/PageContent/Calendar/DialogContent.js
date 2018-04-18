import React, { Component } from 'react';
import { AccountType } from '../../Enums';
import DescriptionContent from './DescriptionContent';
import ContactContent from './ContactContent';
import DelivererGroupContent from './DelivererGroupContent';
import ReceivingAgencyContent from './ReceivingAgencyContent';
import DonatingAgencyContent from './DonatingAgencyContent';

class DialogContent extends Component {
    render() {
        return (
            <div className="dialog-content-wrapper">
                <DelivererGroupContent
                    futureEvent={this.props.futureEvent}
                    delivery={this.props.delivery}
                    accountOwnerName={this.props.accountOwnerName}
                    accountType={this.props.accountType}
                />
                {this.props.accountType !== AccountType.DONATING_AGENCY_MEMBER ? (
                    <DonatingAgencyContent delivery={this.props.delivery} />
                ) : null}
                {this.props.accountType !==
                AccountType.RECEIVING_AGENCY ? (
                        <ReceivingAgencyContent delivery={this.props.delivery} />
                    ) : null}

                <DescriptionContent
                    accountType={this.props.accountType}
                    futureEvent={this.props.futureEvent}
                    delivery={this.props.delivery}
                    accountOwnerName={this.props.accountOwnerName}
                />
                {this.props.accountType !== AccountType.DELIVERER_GROUP ? (
                    <ContactContent
                        accountType={this.props.accountType}
                        futureEvent={this.props.futureEvent}
                        delivery={this.props.delivery}
                    />
                ) : null}
            </div>
        );
    }
}
export default DialogContent;
