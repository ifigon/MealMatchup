import React, { Component } from 'react';
import { AccountType } from '../../Enums';
import './DialogContent.css';
import DelivererGroupContent from './DelivererGroupContent';
import ReceivingAgencyContent from './ReceivingAgencyContent';
import DonatingAgencyContent from './DonatingAgencyContent';

class DialogContent extends Component {
    render() {
        return (
            <div>
                <DelivererGroupContent
                    accountType={this.props.accountType}
                    futureEvent={this.props.futureEvent}
                    delivery={this.props.delivery}
                />
                {this.props.accountType !== AccountType.RECEIVING_AGENCY ? (
                    <ReceivingAgencyContent delivery={this.props.delivery} />
                ) : null}
                {this.props.accountType !==
                AccountType.DONATING_AGENCY_MEMBER ? (
                        <DonatingAgencyContent delivery={this.props.delivery} />
                    ) : null}
            </div>
        );
    }
}
export default DialogContent;
