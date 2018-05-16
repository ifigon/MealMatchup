import React, { Component } from 'react';
import './VerifyAccount.css';
import PendingAccountsListItem from './PendingAccountListItem';

class VerifyAccount extends Component {
    render() {
        let address = (
            <div className="address-wrapper">
                <div className="address">
                    {this.props.agencyAddressData.street1}
                    {this.props.agencyAddressData.street2},{' '}
                    {this.props.agencyAddressData.city}{' '}
                    {this.props.agencyAddressData.state}{' '}
                    {this.props.agencyAddressData.zipcode}
                </div>
                <div className="officeNo">
                    Office: {this.props.agencyAddressData.officeNo}
                </div>
                <div className="deliveryNote">{this.props.deliveryNote}</div>
            </div>
        );
        return (
            <div className="verify-accounts-wrapper">
                <h1 className="verify-header">
                    {this.props.accountType} Account Request
                </h1>
                <h2 className="subheader">{this.props.agencyName}</h2>
                {address}
            </div>
        );
    }
}

export default VerifyAccount;
