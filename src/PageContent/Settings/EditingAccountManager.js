import React, { Component } from 'react';

class EditingAccountManager extends Component {

    render() {
        return (
            <div className="scs-0">
                <div className="scs-0-content scs-1-content">
                    <h5>Account Manager Details</h5>
                    <div className="amd-details amd-details-1">
                        <div className="amd-details-child">
                            <label className="label-component details">Student 1</label><input name="name" type="text" className="form-input" /><br />
                            <h6>{this.props.coordinator.name}</h6>
                            <h6>{this.props.coordinator.position}</h6>
                            <h6>{this.props.coordinator.email}</h6>
                            <h6>{this.props.coordinator.phone}</h6>
                        </div>
                        <div className="amd-details-child">
                            <h6>Recieve Notifications via</h6>
                            {this.props.smsNotif ? <h6>SMS/Text Message</h6> : <div/>}
                            {this.props.emailNotif ? <h6>Email</h6> : <div/>}
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