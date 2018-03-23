import React, { Component } from 'react';

class EditingAccountManager extends Component {

    render() {
        return (
            <div className="scs-0">
                <div className="scs-0-content scs-1-content">
                    <h5>Account Manager Details</h5>

                     <div className="editing-box">
                        <div className="editing-child-1">
                            <label className="label-component details">Name</label><br /><br />
                            <label className="label-component details">Title/Position</label><br /><br />
                            <label className="label-component details">Email</label><br /><br />
                            <label className="label-component details">Phone Number</label><br /><br />
                        </div>
                        
                        <div className="editing-child-2 amd-editing-2">
                            <input name="name" type="text" className="form-input" placeholder={this.props.coordinator.name} /><br /><br />
                            <input name="name" type="text" className="form-input" placeholder={this.props.coordinator.position} /><br /><br />
                            <input name="name" type="text" className="form-input" placeholder={this.props.coordinator.email} /><br /><br />
                            <input name="name" type="text" className="form-input" placeholder={this.props.coordinator.phone} /><br /><br />
                        </div>

                        <div className="editing-child-3">
                            Recieve Notifications via<br />
                            <input type="radio" name="smsNotif" value="smsNotif" defaultChecked={this.props.smsNotif}/><label className="label-component details">SMS/Text Message</label><br />
                            <input type="radio" name="emailNotif" value="emailNotif" defaultChecked={this.props.emailNotif}/><label className="label-component details">Email</label>
                        </div>
                    </div>

                    <div className="amd-edit amd-edit-1">
                        <button type="button" className="form-button" id="confirm-button" onClick={this.props.handleAccSave}>Save</button>
                    </div>

                </div>
            </div>
        );
    }

}

export default EditingAccountManager;