import React, { Component } from 'react';
import './Content.css';
import shelter from '../../icons/shelter.svg';

class ReceivingAgencyContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            donatingAgency: this.props.delivery[0].receivingAgency.name,
            contactName: this.props.delivery[0].receivingAgency.contact.name,
            phone: this.props.delivery[0].receivingAgency.contact.phone
        };
    }
    render() {
        return (
            <div className="wrapper">
                <img className="content-icon" src={shelter} alt="volunteer" />
                <div className="content-wrapper">
                    <h1 className="section-header">Receipient</h1>
                    <h2 className="organization">
                        {this.state.receivingAgency}
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

export default ReceivingAgencyContent;
