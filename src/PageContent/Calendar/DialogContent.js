import React, { Component } from 'react';
import { AccountType } from '../../Enums';
import DescriptionContent from './DescriptionContent';
import ContactContent from './ContactContent';
import DelivererGroupContent from './DelivererGroupContent';
import ReceivingAgencyContent from './ReceivingAgencyContent';
import DonatingAgencyContent from './DonatingAgencyContent';

class DialogContent extends Component {
    render() {
        let accountType = this.props.account.accountType;

        return (
            <div className="dialog-content-wrapper">
                <DelivererGroupContent
                    futureEvent={this.props.futureEvent}
                    delivery={this.props.delivery}
                    accountType={accountType}
                />

                {accountType !== AccountType.DONATING_AGENCY_MEMBER &&
                    <DonatingAgencyContent delivery={this.props.delivery} />
                }

                {accountType !== AccountType.RECEIVING_AGENCY &&
                    <ReceivingAgencyContent delivery={this.props.delivery} />
                }

                <DescriptionContent
                    account={this.props.account}
                    futureEvent={this.props.futureEvent}
                    delivery={this.props.delivery}
                />

                {accountType !== AccountType.DELIVERER_GROUP &&
                    <ContactContent
                        account={this.props.account}
                        futureEvent={this.props.futureEvent}
                        delivery={this.props.delivery}
                    />
                }
            </div>
        );
    }
}
export default DialogContent;
