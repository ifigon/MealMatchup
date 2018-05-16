import React, { Component } from 'react';
import './PendingAccounts.css';
import { AccountType } from '../../Enums';

class PendingAccountsListItem extends Component {
    render() {
        let keys = Object.keys(this.props.data);
        let agencyObject = this.props.data[keys];
        let accountType = '';
        switch (agencyObject.accountType) {
        case AccountType.RECEIVING_AGENCY:
            accountType = 'Receiving Agency';
            break;
        case AccountType.DELIVERER_GROUP:
            accountType = 'Deliverer Group';
            break;
        default:
            accountType = 'Donating Agency';
        }
        let agencyName = agencyObject.name;
        let primaryContact = '';
        if (accountType === 'Donating Agency') {
            // TODO: query for that id number for the contact
            primaryContact = agencyObject.primaryContact;
        } else {
            primaryContact = agencyObject.primaryContact.name;
        }

        // let statusStyle = ''
        // switch(agencyObject.isVerified)
        return (
            <div className="pending-accounts-item-wrapper">
                <div className="group-value value">{accountType}</div>
                <div className="agency-value value">{agencyName}</div>
                <div className="contact-value value">{primaryContact}</div>
                <div className="status-button">View</div>
            </div>
        );
    }
}

export default PendingAccountsListItem;
