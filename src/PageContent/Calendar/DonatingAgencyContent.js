import React, { Component } from 'react';
import './Content.css';
import vitamins from '../../icons/vitamins.svg';

class DonatingAgencyContent extends Component {
    render() {
        const { donatingAgency, daContact } = this.props.delivery;
        return (
            <div className="wrapper">
                <img className="content-icon" src={vitamins} alt="volunteer"/>
                <div className="content-wrapper">
                    <h1 className="section-header">Dining Hall</h1>
                    <h2 className="organization">
                        {donatingAgency}
                    </h2>
                    <div className="content-details-wrapper">
                        <p className="content-details">
                            {daContact.name} ({daContact.phone})
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
export default DonatingAgencyContent;
