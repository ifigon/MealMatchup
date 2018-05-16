import React, { Component } from 'react';
import './VerifyAccount.css';
import PendingAccountsListItem from './PendingAccountListItem';
import truck from '../../icons/red_truck.svg';
import Map from '../../Map/Map';

class VerifyAccount extends Component {
    render() {
        return (
            <div className="verify-accounts-wrapper">
                <h1 className="verify-header">
                    {this.props.accountType} Account Request
                </h1>
                <div className="verify-map-wrapper">
                    <Map
                        address={this.props.agencyAddressData}
                        height={'200px'}
                        width={'300px'}
                        marginRight={'30px'}
                        marginTop={'0px'}
                        marginBottom={'0px'}
                        marginLeft={'10px'}
                        display={'inline-block'}
                    />
                </div>
                <div className="address-wrapper">
                    <h2 className="subheader">{this.props.agencyName}</h2>
                    <div>
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
                        <div className="deliveryNote">
                            {this.props.deliveryNote}
                        </div>
                    </div>
                </div>
                <div className="agency-wrapper">
                    <h2 className="subheader">Agency Contact</h2>
                    <div className="contact">
                        <div className="contact-value">
                            {' '}
                            {this.props.primaryContact}
                        </div>
                        <div className="contact-value">
                            {' '}
                            {this.props.primaryContactData.position}
                        </div>
                        <div className="contact-value gray-contact">
                            {' '}
                            {this.props.primaryContactData.email}
                        </div>
                        <div className="contact-value gray-contact">
                            {' '}
                            {this.props.primaryContactData.phone}
                        </div>
                    </div>
                </div>
                {this.props.emergencyPickup && (
                    <div className="emergency-pickup-wrapper">
                        <img
                            className="verify-truck-icon"
                            src={truck}
                            alt="truck"
                        />
                        <div className="verify-emergency-pickup-content">
                            <h2 className="subheader emergency-pickup-subheader">
                                Emergency Pickup Activated
                            </h2>
                            <div className="emergency-pickup-note">
                                This agency can pick up in times of emergency.{' '}
                            </div>
                        </div>
                    </div>
                )}
                <div className="verification-buttons">
                    <div
                        onClick={this.props.closeDialog}
                        className="verify-accept verify-button"
                    >
                        Accept
                    </div>
                    <div
                        onClick={this.props.closeDialog}
                        className="verify-reject verify-button"
                    >
                        Reject
                    </div>
                </div>
            </div>
        );
    }
}

export default VerifyAccount;
