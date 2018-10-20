import React, { Component } from 'react';
import './Content.scss';
import shelter from '../../icons/shelter.svg';

class ReceivingAgencyContent extends Component {
    render() {
        const { receivingAgency, raContact } = this.props.delivery;
        return (
            <div className="wrapper">
                <img className="content-icon" src={shelter} alt="volunteer" />
                <div className="content-wrapper">
                    <h1 className="section-header">Recipient</h1>
                    <h2 className="organization">
                        {receivingAgency}
                    </h2>
                    <div className="content-details-wrapper">
                        <p className="content-details">
                            {raContact.name} ({raContact.phone})
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReceivingAgencyContent;
