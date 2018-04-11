import React, { Component } from 'react';

class EditOrganization extends Component {

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
                    <h6>Phone: {this.props.account.phone}</h6>
                    <div className="scs-spacing-lg" />
                    <div className="amd-edit amd-edit-1">
                        <button type="button" className="form-button confirm-button" onClick={this.props.handleEditOrg}>Edit</button>
                    </div>
                </div>
            </div>
        );
    }

    handleSubmit() {
        this.setState({

        });
    }

}

export default EditOrganization;