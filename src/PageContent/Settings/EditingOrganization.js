import React, { Component } from 'react';

class EditingOrganization extends Component {

    render() {
        return (
            <div className="scs-0">
                <div className="scs-0-image">
                </div>
                <div className="scs-0-content">
                    <h5>Organization Details</h5>
                    <label className="label-component details">Email</label><input name="name" type="text" className="form-input" placeholder={this.props.email} /><br />
                    <label className="label-component details">Password</label><input name="name" type="text" className="form-input" placeholder={this.props.password} /><br />
                    <div className="scs-spacing" />
                    <label className="label-component details">Street 1</label><input name="name" type="text" className="form-input" placeholder={this.props.address.street1} /><br />
                    <label className="label-component details">Street 2</label><input name="name" type="text" className="form-input" placeholder={this.props.address.street2} /><br />
                    <label className="label-component details">City</label><input name="name" type="text" className="form-input" placeholder={this.props.address.city} /><br />
                    <label className="label-component details">State</label><input name="name" type="text" className="form-input" placeholder={this.props.address.state} /><br />
                    <label className="label-component details">Zip</label><input name="name" type="text" className="form-input" placeholder={this.props.address.zip} /><br />
                    <div className="scs-spacing-lg" />
                    <div className="amd-edit amd-edit-1">
                        <button type="button" className="form-button" id="confirm-button" onClick={this.props.handleOrgSave}>Save</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default EditingOrganization;