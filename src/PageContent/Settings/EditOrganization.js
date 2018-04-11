import React, { Component } from 'react';

class EditOrganization extends Component {

    render() {
        return (
            <div className="scs-0">
                <div className="scs-0-image">
                </div>
                <div className="scs-0-content">
                    <h5>Organization Details</h5>
                    <h6>Email: {this.props.email}</h6>
                    <h6>Password: {this.props.password}</h6>
                    <div className="scs-spacing" />
                    <h6>Address: {this.props.address.street1}, {this.props.address.street2}, {this.props.address.city}, {this.props.address.state}, {this.props.address.zip}</h6>
                    <div className="scs-spacing-lg" />
                    <div className="amd-edit amd-edit-1">
                        <button type="button" className="form-button confirm-button" onClick={this.props.handleEditOrg}>Edit</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default EditOrganization;