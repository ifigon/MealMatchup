import React, { Component } from 'react';
import './SCSettings0.css';

class SCSettings0 extends Component {

    render() {
        return (
            <div className="scs-0">
                <div className="scs-0-image">
                </div>
                <div className="scs-0-content">
                    <h5>Organization Details</h5>
                    <h6>Email: {this.props.account.email}</h6>
                    <h6>Password: {this.props.account.password}</h6>
                    <div className="scs-spacing" />
                    <h6>Address: {this.props.account.address.street1}, {this.props.account.address.street2}, {this.props.account.address.city}, {this.props.account.address.state}, {this.props.account.address.zip}</h6>
                    <div className="scs-spacing-lg" />
                    <h5>Account Manager Details</h5>
                    <div className="amd-details">
                        <div className="amd-details-child">
                            <h6>{this.props.account.coordinator.name}</h6>
                            <h6>{this.props.account.coordinator.position}</h6>
                            <h6>{this.props.account.coordinator.email}</h6>
                            <h6>{this.props.account.coordinator.phone}</h6>
                        </div>
                        <div className="amd-details-child">
                            <h6>Recieve Notifications via</h6>
                            {this.props.account.smsNotif ? <h6>SMS/Text Message</h6> : <div/>}
                            {this.props.account.emailNotif ? <h6>Email</h6> : <div/>}
                        </div>
                    </div>
                    <div className="amd-edit">
                        <button type="button" className="form-button confirm-button" onClick={this.props.handleEditButton}>Edit</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default SCSettings0;