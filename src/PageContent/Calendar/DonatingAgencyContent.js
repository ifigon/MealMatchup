import React, { Component } from 'react';
import './Content.css';
import shelter from '../../icons/shelter.svg';

class DonatingAgencyContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            donatingAgency: this.props.delivery.donatingAgency.name,
            contactName: this.props.delivery.donatingAgency.contact.name,
            email: this.props.delivery.donatingAgency.contact.email,
            phone: this.props.delivery.donatingAgency.contact.phone
        };
    }
    render() {
        return (
            <div className="wrapper">
                <img className="content-icon" src={shelter} alt="volunteer" />
                <div className="content-wrapper">
                    <h1 className="section-header">Dining Hall</h1>
                    <h2 className="organization">
                        {this.state.donatingAgency}
                    </h2>
                    <div className="content-details-wrapper">
                        <p className="content-details">
                            {this.state.contactName} ({this.state.phone})
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
export default DonatingAgencyContent;
