import React, { Component } from 'react';
import './PendingAccounts.css';
import { AccountType } from '../../Enums';
import VerifyAccount from './VerifyAccount';
import ConfirmActivate from './ConfirmActivate';
import ConfirmReject from './ConfirmReject';

class PendingAccountsListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: false,
            acceptPopUp: false,
            rejectPopUp: false
        };
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.acceptPopUp = this.acceptPopUp.bind(this);
        this.back = this.back.bind(this);
        this.confirmAccept = this.confirmAccept.bind(this);
        this.confirmReject = this.confirmReject.bind(this);
        this.rejectPopUp = this.rejectPopUp.bind(this);
    }
    openDialog() {
        this.setState({
            dialog: true
        });
    }

    closeDialog() {
        this.setState({
            dialog: false,
            acceptPopUp: false,
            rejectPopUp: false
        });
    }
    acceptPopUp() {
        this.setState({
            acceptPopUp: true
        });
    }
    rejectPopUp() {
        this.setState({
            rejectPopUp: true
        });
    }
    confirmAccept() {
        this.setState({
            acceptPopUp: false,
            dialog: false
        });
    }
    confirmReject() {
        this.setState({
            rejectPopUp: false,
            dialog: false
        });
    }
    back() {
        this.setState({
            acceptPopUp: false,
            rejectPopUp: false
        });
    }

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
                        agencyAddressData={agencyObject.address}
                        primaryContact={primaryContact}
                        primaryContactData={agencyObject.primaryContact}
                        emergencyPickup={agencyObject.acceptEmergencyPickups}
                        deliveryNotes={agencyObject.deliveryNotes}
                        closeDialog={this.closeDialog}
                        acceptPopUp={this.acceptPopUp}
                        rejectPopUp={this.rejectPopUp}
                    />
                )}
                {this.state.acceptPopUp && (
                    <ConfirmActivate
                        confirmAccept={this.confirmAccept}
                        back={this.back}
                        closeDialog={this.closeDialog}
                        agencyName={agencyName}
                    />
                )}
                {this.state.rejectPopUp && (
                    <ConfirmReject
                        confirmReject={this.confirmReject}
                        back={this.back}
                        closeDialog={this.closeDialog}
                        agencyName={agencyName}
                    />
                )}
            </div>
        );
    }
}

export default PendingAccountsListItem;
