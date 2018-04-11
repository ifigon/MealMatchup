import React, { Component } from 'react';

class EditingOrganization extends Component {

    render() {
        return (
            <div className="scs-0">
                <div className="scs-0-image">
                </div>
                <div className="scs-0-content scs-1-editing">
                    <h5>Organization Details</h5>

                    <div className="editing-box">
                        <div className="editing-child-1">
                            <label className="label-component details">Email</label><br /><br />
                            <label className="label-component details">Password</label><br /><br />
                            <div className="scs-spacing" />
                            <label className="label-component details">Street 1</label><br /><br />
                            <label className="label-component details">Street 2</label><br /><br />
                            <label className="label-component details">City</label><br /><br />
                            <label className="label-component details">State</label><br /><br />
                            <label className="label-component details">Zip</label>
                        </div>
                        
                        <div className="editing-child-2">
                            <input name="name" type="text" className="form-input" placeholder={this.props.email} /><br /><br />
                            <input name="name" type="text" className="form-input" placeholder={this.props.password} /><br /><br />
                            <div className="scs-spacing" />
                            <input name="name" type="text" className="form-input" placeholder={this.props.address.street1} /><br /><br />
                            <input name="name" type="text" className="form-input" placeholder={this.props.address.street2} /><br /><br />
                            <input name="name" type="text" className="form-input" placeholder={this.props.address.city} /><br /><br />
                            <input name="name" type="text" className="form-input" placeholder={this.props.address.state} /><br /><br />
                            <input name="name" type="text" className="form-input" placeholder={this.props.address.zip} /><br />
                        </div>
                    </div>

                    <div className="scs-spacing-lg" />
                    <div className="amd-edit amd-edit-1">
                        <button type="button" className="form-button confirm-button" onClick={this.props.handleOrgSave}>Save</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default EditingOrganization;