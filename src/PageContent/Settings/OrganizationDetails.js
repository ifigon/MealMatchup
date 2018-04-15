import React, { Component } from 'react';
import Map from '../../Map/Map.js';

class OrganizationDetails extends Component {

    render() {
        return (
            <div className="scs-0">
                <div className="scs-0-image">
                    <Map
                        marginLeft="20px" 
                        height="150px" 
                        width="70%" 
                        marginTop="10px" 
                        marginRight="0px"
                        marginBottom="0px"
                        address={this.props.account.address}
                    />
                </div>

                {!this.props.isEditingOrg ?

                    <div className="scs-0-content">
                        <h5>Organization Details</h5>
                        <h6>{this.props.account.name}</h6>
                        <div className="scs-spacing" />
                        <h6>Address: {this.props.account.address.street1} {this.props.account.address.street2} {this.props.account.address.city}, {this.props.account.address.state} {this.props.account.address.zipcode}</h6>
                        <h6>Office Number: {this.props.account.organizationPhone}</h6>
                        {this.props.account.numVolunteers ? 
                            <h6>Volunteers: {this.props.account.numVolunteers}</h6>
                            :
                            <span />
                        }
                        {this.props.account.notes ? 
                            <h6>Notes: {this.props.account.notes}</h6>
                            :
                            <span />
                        }
                        {this.props.account.emergencypickup ? 
                            <h6>Emergency Pickup Activated: {this.props.account.emergencypickup}</h6>
                            :
                            <span />
                        }
                        <div className="scs-spacing-lg" />
                        {this.props.account.user_type == 'admin' ?
                            <div className="amd-edit amd-edit-1">
                                <button type="button" className="form-button confirm-button" onClick={this.props.handleEditOrg}>Edit</button>
                            </div>
                            :
                            <span />
                        }
                    </div>

                    :

                    <div className="scs-0-content scs-1-editing">
                        <h5>Organization Details</h5>

                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="editing-box">
                                <div className="editing-child-1">
                                    <label className="label-component details">Name</label><br /><br />
                                    <div className="scs-spacing" />
                                    <label className="label-component details">Street 1</label><br /><br />
                                    <label className="label-component details">Street 2</label><br /><br />
                                    <label className="label-component details">City</label><br /><br />
                                    <label className="label-component details">State</label><br /><br />
                                    <label className="label-component details">Zip</label><br /><br />
                                    <label className="label-component details">Office Number</label><br /><br />
                                    {this.props.account.numVolunteers ? 
                                        <label className="label-component details">Volunteers</label>
                                        :
                                        <span />
                                    }
                                    {this.props.account.notes ? 
                                        <label className="label-component details">Notes</label>
                                        :
                                        <span />
                                    }
                                    {this.props.account.emergencypickup ? 
                                        <label className="label-component details">Emergency Pickup</label>
                                        :
                                        <span />
                                    }
                                </div>
                                
                                <div className="editing-child-2">
                                    <input name="name" type="text" className="form-input" defaultValue={this.props.account.name} /><br /><br />
                                    <div className="scs-spacing" />
                                    <input name="street1" type="text" className="form-input" defaultValue={this.props.account.address.street1} /><br /><br />
                                    <input name="street2" type="text" className="form-input" defaultValue={this.props.account.address.street2} /><br /><br />
                                    <input name="city" type="text" className="form-input" defaultValue={this.props.account.address.city} /><br /><br />
                                    <input name="state" type="text" className="form-input" defaultValue={this.props.account.address.state} /><br /><br />
                                    <input name="zip" type="text" className="form-input" defaultValue={this.props.account.address.zipcode} /><br /><br />
                                    <input name="phone" type="tel" className="form-input" defaultValue={this.props.account.organizationPhone} /><br /><br />
                                    {this.props.account.numVolunteers ? 
                                        <input name="nv" type="text" className="form-input" defaultValue={this.props.account.numVolunteers} />
                                        :
                                        <span />
                                    }
                                    {this.props.account.notes ? 
                                        <input name="notes" type="text" className="form-input" defaultValue={this.props.account.notes} />
                                        :
                                        <span />
                                    }
                                    {this.props.account.emergencypickup ? 
                                        <input name="ep" type="text" className="form-input" defaultValue={this.props.account.emergencypickup} />
                                        :
                                        <span />
                                    }
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
        let nv = null;
        let notes = null;
        let ep = null;
        if(e.target.nv)
            nv = e.target.nv.value;
        if(e.target.notes)
            notes = e.target.notes.value;
        if(e.target.ep)
            ep = e.target.ep.value;
        let org = {
            name: e.target.name.value,
            address: {
                street1: e.target.street1.value,
                street2: e.target.street2.value,
                city: e.target.city.value,
                state: e.target.state.value,
                zipcode: e.target.zip.value
            },
            organizationPhone: e.target.phone.value,
            numVolunteers: nv,
            notes: notes,
            emergencypickup: ep
        };
        this.props.handleOrgSave(org);
    }

}

export default OrganizationDetails;