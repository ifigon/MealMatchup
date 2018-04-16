import React, { Component } from 'react';
import { AccountType } from '../../Enums';
import './DialogContent.css';
import ReceivingAgencyContent from './ReceivingAgencyContent';
import DonatingAgencyContent from './DonatingAgencyContent';

class DialogContent extends Component {
    render() {
        return (
            <div>
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
