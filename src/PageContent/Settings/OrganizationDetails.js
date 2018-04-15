import React, { Component } from 'react';

class OrganizationDetails extends Component {

    render() {
        return (
            <div className="scs-0">
                <div className="scs-0-image">
                </div>

                {!this.props.isEditingOrg ?

                    <div className="scs-0-content">
                        <h5>Organization Details</h5>
                        <h6>Email: {this.props.account.email}</h6>
                        <h6>Password: {this.props.account.password}</h6>
                        <div className="scs-spacing" />
                        <h6>Address: {this.props.account.address.street1}, {this.props.account.address.street2}, {this.props.account.address.city}, {this.props.account.address.state}, {this.props.account.address.zip}</h6>
                        <h6>Office Number: {this.props.account.organizationPhone}</h6>
                        <div className="scs-spacing-lg" />
                        <div className="amd-edit amd-edit-1">
                            <button type="button" className="form-button confirm-button" onClick={this.props.handleEditOrg}>Edit</button>
                        </div>
                    </div>

                    :

                    <div className="scs-0-content scs-1-editing">
                        <h5>Organization Details</h5>

                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="editing-box">
                                <div className="editing-child-1">
                                    <label className="label-component details">Email</label><br /><br />
                                    <label className="label-component details">Password</label><br /><br />
                                    <div className="scs-spacing" />
                                    <label className="label-component details">Name</label><br /><br />
                                    <label className="label-component details">Street 1</label><br /><br />
                                    <label className="label-component details">Street 2</label><br /><br />
                                    <label className="label-component details">City</label><br /><br />
                                    <label className="label-component details">State</label><br /><br />
                                    <label className="label-component details">Zip</label><br /><br />
                                    <label className="label-component details">Office Number</label>
                                </div>
                                
                                <div className="editing-child-2">
                                    <input name="email" type="text" className="form-input" defaultValue={this.props.account.email} /><br /><br />
                                    <input name="password" type="text" className="form-input" defaultValue={this.props.account.password} /><br /><br />
                                    <div className="scs-spacing" />
                                    <input name="name" type="text" className="form-input" defaultValue={this.props.account.name} /><br /><br />
                                    <input name="street1" type="text" className="form-input" defaultValue={this.props.account.address.street1} /><br /><br />
                                    <input name="street2" type="text" className="form-input" defaultValue={this.props.account.address.street2} /><br /><br />
                                    <input name="city" type="text" className="form-input" defaultValue={this.props.account.address.city} /><br /><br />
                                    <input name="state" type="text" className="form-input" defaultValue={this.props.account.address.state} /><br /><br />
                                    <input name="zip" type="text" className="form-input" defaultValue={this.props.account.address.zipcode} /><br /><br />
                                    <input name="phone" type="tel" className="form-input" defaultValue={this.props.account.organizationPhone} /><br />
                                </div>
                            </div>
                            <div className="scs-spacing-lg" />
                            <div className="amd-edit amd-edit-1">
                                <button type="submit" className="form-button confirm-button" onSubmit={this.handleSubmit.bind(this)}>Save</button>
                            </div>
                        </form>
                    </div>

                }

            </div>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        let org = {
            email: e.target.email.value,
            password: e.target.password.value,
            name: e.target.name.value,
            address: {
                street1: e.target.street1.value,
                street2: e.target.street2.value,
                city: e.target.city.value,
                state: e.target.state.value,
                zipcode: e.target.zip.value
            },
            phone: e.target.phone.value
        };
        this.props.handleOrgSave(org);
    }

}

export default OrganizationDetails;