import React, { Component } from 'react';

class EditingAccountManager extends Component {

    render() {
        return (
            <div className="scs-0">
                <div className="scs-0-content scs-1-content">
                    <h5>Account Manager Details</h5>

                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="editing-box">
                            <div className="editing-child-1">
                                <label className="label-component details">Name</label><br /><br />
                                <label className="label-component details">Title/Position</label><br /><br />
                                <label className="label-component details">Email</label><br /><br />
                                <label className="label-component details">Phone Number</label><br /><br />
                            </div>
                            
                            <div className="editing-child-2 amd-editing-2">
                                <input name="name" type="text" className="form-input" defaultValue={this.props.coordinator.name} /><br /><br />
                                <input name="position" type="text" className="form-input" defaultValue={this.props.coordinator.position} /><br /><br />
                                <input name="email" type="text" className="form-input" defaultValue={this.props.coordinator.email} /><br /><br />
                                <input name="phone" type="tel" className="form-input" defaultValue={this.props.coordinator.phone} /><br /><br />
                            </div>

                            <div className="editing-child-3">
                                Recieve Notifications via<br />
                                <input type="checkbox" name="smsNotif" value="smsNotif" defaultChecked={this.props.coordinator.smsNotif}/><label className="label-component details">SMS/Text Message</label><br />
                                <input type="checkbox" name="emailNotif" value="emailNotif" defaultChecked={this.props.coordinator.emailNotif}/><label className="label-component details">Email</label>
                            </div>
                        </div>

                        <div className="amd-edit amd-edit-1">
                            <button type="submit" className="form-button confirm-button" onSubmit={this.handleSubmit.bind(this)}>Save</button>
                        </div>
                    </form>

                </div>
            </div>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        let acc = {
            name: e.target.name.value,
            position: e.target.position.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            smsNotif: e.target.smsNotif.checked,
            emailNotif: e.target.emailNotif.checked
        };
        this.props.handleAccSave(acc);   
    }

}

export default EditingAccountManager;