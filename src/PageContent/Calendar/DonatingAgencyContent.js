import React, { Component } from 'react';
import './Content.css';
import vitamins from '../../icons/vitamins.svg';

class DonatingAgencyContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            donatingAgency: this.props.delivery[0].donatingAgency.name,
            contactName: this.props.delivery[0].donatingAgency.contact.name,
            phone: this.props.delivery[0].donatingAgency.contact.phone
        };
    }
    render() {
        return (
            <div className="wrapper">
                <img className="content-icon" src={vitamins} alt="volunteer" />
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
