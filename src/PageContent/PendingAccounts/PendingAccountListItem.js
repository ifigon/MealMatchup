import React, { Component } from 'react';
import './PendingAccounts.css';
import { AccountType } from '../../Enums';
import VerifyAccount from './VerifyAccount';
import { accountsRef, donatingAgenciesRef } from '../../FirebaseConfig';

class PendingAccountsListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: false
        };
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.rejectAccount = this.rejectAccount.bind(this);
        this.acceptAccount = this.acceptAccount.bind(this);
    }
    openDialog() {
        this.setState({
            dialog: true
        });
    }

    closeDialog() {
        this.setState({
            dialog: false
        });
    }

    acceptAccount(uid, daContactId) {
        const updates = { isVerified: true, isActivated: true };
        if (daContactId) { // accountType == donating agency 
            donatingAgenciesRef.child(uid).update(updates);
            accountsRef.child(daContactId).update(updates);
        } else {
            accountsRef.child(uid).update(updates);
        }
        this.closeDialog();
    }

    rejectAccount(uid, daContactId) {
        if (daContactId) { // accountType == donating agency 
            donatingAgenciesRef.child(uid).remove();
            accountsRef.child(daContactId).remove();
        } else {
            accountsRef.child(uid).remove();
        }
        this.closeDialog();
    }

    render() {
        let key = Object.keys(this.props.data);
        let agencyObject = this.props.data[key];
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
        let primaryContact = agencyObject.primaryContact.name;

        let statusStyle = '';
        let statusText = '';
        switch (agencyObject.isVerified) {
        case false:
            statusStyle = 'status-button unverified';
            statusText = 'View';
            break;
        default:
            statusStyle = 'status-button verified ';
            statusText = 'Accepted';
            break;
        }
        return (
            <div className="pending-accounts-item-wrapper">
                <div className="group-value value">{accountType}</div>
                <div className="agency-value value">{agencyName}</div>
                <div className="contact-value value">{primaryContact}</div>
                <div onClick={this.openDialog} className={statusStyle}>
                    {statusText}
                </div>
                {this.state.dialog && (
                    <VerifyAccount
                        accountType={accountType}
                        agencyName={agencyName}
                        agencyUId={key[0]}
                        agencyAddressData={agencyObject.address}
                        primaryContact={primaryContact}
                        primaryContactData={agencyObject.primaryContact}
                        emergencyPickup={agencyObject.acceptEmergencyPickups}
                        deliveryNotes={agencyObject.deliveryNotes}
                        rejectAccount={this.rejectAccount}
                        acceptAccount={this.acceptAccount}
                    />
                )}
            </div>
        );
    }
}

export default PendingAccountsListItem;
