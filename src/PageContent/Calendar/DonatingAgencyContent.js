import React, { Component } from 'react';
import { AccountType } from '../../Enums';
import './Content.css';
import shelter from '../../icons/shelter.svg';

class DonatingAgencyContent extends Component {
    convertPhone(phone) {
        if (phone !== undefined) {
            let phoneString = phone.toString();
            let formattedPhone =
                phoneString.substr(0, 3) +
                '-' +
                phoneString.substr(3, 3) +
                '-' +
                phoneString.substr(6);
            return formattedPhone;
        }
    }
    render() {
        let phone = this.convertPhone(this.props.donatingAgencyContactPhone);
        return (
            <div className="wrapper">
                <img className="content-icon" src={shelter} alt="volunteer" />
                <div className="content-wrapper">
                    {this.props.accountType ===
                    AccountType.DONATING_AGENCY_MEMBER ? (
                            <h1 className="section-header">Recipient</h1>
                        ) : (
                            <h1 className="section-header">Dining Hall</h1>
                        )}
                    <h2 className="organization">
                        {this.props.donatingAgency}
                    </h2>
                    <div className="content-details-wrapper">
                        <p className="content-details">
                            {this.props.donatingAgencyContactName} ({phone})
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
export default DonatingAgencyContent;
