import React, { Component } from 'react';
import { AccountType, StringFormat } from '../../Enums';
import { formatPhone } from '../../utils/Utils';
import { accountsRef } from '../../FirebaseConfig.js';


class AccountManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            settings: this.props.account.settings,
        };
    }

    render() {
        //  Different accounts have different email notifications, must check to see which account type and then show notification status based off that
        // set to default empty tags so that only the ones that correspond to the user are updated
        let confirmationStatus = <p></p>;
        let dgUnavailableStatus = <p></p>;
        let raSpecifiedStatus = <p></p>;
        let raUnspecifiedStatus = <p></p>;
        let dgRequestStatus = <p></p>;
        let raUnavailableStatus = <p></p>;
        let confirmationCheckBox = <p></p>;
        let dgUnavailableCheckBox = <p></p>;
        let raSpecifiedCheckBox = <p></p>;
        let raUnspecifiedCheckBox = <p></p>;
        let dgRequestCheckBox = <p></p>;
        let raUnavailableCheckBox = <p></p>;
        
        if(this.props.accountType === AccountType.DONATING_AGENCY_MEMBER) {
            if(this.state.settings.confirmationNotification) {
                confirmationStatus = <p>Email notifications for delivery confirmations: Enabled</p>
            } else {
                confirmationStatus = <p>Email notifications for delivery confirmations: Disabled</p>
            }
            if(this.state.settings.dgUnavailableNotification) {
                dgUnavailableStatus = <p>Email notifications when delivery groups unavailable: Enabled </p>     
            } else {
                dgUnavailableStatus = <p>Email notifications when delivery groups unavailable: Disabled </p>
            }
            if(this.state.settings.raUnavailableNotification) {
                raUnavailableStatus = <p>Email notifications when receiving agencies are unavailable: Enabled </p>
            } else {
                raUnavailableStatus = <p>Email notifications when receiving agencies are unavailable: Disabled </p>
            }
            confirmationCheckBox = (
                <p>Email notifications for delivery confirmations
                    <input 
                type='checkbox'
                checked = {this.state.settings.confirmationNotification}
                name = 'confirmationNotification'
                onChange={this.handleChange}
                />
                </p>);
            dgUnavailableCheckBox = (
                <p>Email notifications when delivery groups unavailable
                <input 
                type='checkbox'
                checked = {this.state.settings.dgUnavailableNotification}
                name = 'dgUnavailableNotification'
                onChange={this.handleChange}
                />
                </p>);
            raUnavailableCheckBox = (
                <p>Email notifications when delivery groups unavailable
                <input 
                type='checkbox'
                checked = {this.state.settings.raUnavailableNotification}
                name = 'raUnavailableNotification'
                onChange={this.handleChange}
                />
                </p>);
        } else if(this.props.accountType === AccountType.RECEIVING_AGENCY) {
            if(this.state.settings.confirmationNotification) {
                confirmationStatus = <p>Receive email notifications for delivery confirmations: Enabled</p>
            } else {
                confirmationStatus = <p>Receive email notifications for delivery confirmations: Disabled</p>
            } 
            if(this.state.settings.dgUnavailableNotification) {
                dgUnavailableStatus = <p>Email notifications when delivery groups unavailable: Enabled </p>
            } else {
                dgUnavailableStatus = <p>Email notifications when delivery groups unavailable: Disabled </p>
            }
            if(this.state.settings.raSpecifiedNotification) {
                raSpecifiedStatus = <p>Email notifications when you're requested to receive a donation: Enabled </p>
            } else {
                raSpecifiedStatus = <p>Email notifications when you're requested to receive a donation: Disabled </p>
            }
            if(this.state.settings.raUnspecifiedNotification) {
                raUnspecifiedStatus = <p>Email notifications when a donation agency posts a new donation: Enabled </p>
            } else {
                raUnspecifiedStatus = <p>Email notifications when a donation agency posts a new donation: Disabled </p>
            }
            confirmationCheckBox = (
                <p>Email notifications for delivery confirmations
                    <input 
                type='checkbox'
                checked = {this.state.settings.confirmationNotification}
                name = 'confirmationNotification'
                onChange={this.handleChange}
                />
                </p>);
             dgUnavailableCheckBox = (
                <p>Email notifications when delivery groups unavailable
                <input 
                type='checkbox'
                checked = {this.state.settings.dgUnavailableNotification}
                name = 'dgUnavailableNotification'
                onChange={this.handleChange}
                />
                </p>);
            raSpecifiedCheckBox = (
                <p>Email notifications when you're requested to receive a donation
                <input 
                type='checkbox'
                checked = {this.state.settings.raSpecifiedNotification}
                name = 'raSpecifiedNotification'
                onChange={this.handleChange}
                />
                </p>);
            raUnspecifiedCheckBox = (
                <p>Email notifications when a donation agency posts a new donation
                <input 
                type='checkbox'
                checked = {this.state.settings.raUnspecifiedNotification}
                name = 'raUnspecifiedNotification'
                onChange={this.handleChange}
                />
                </p>);
        } else {
            if(this.state.settings.confirmationNotification) {
                confirmationStatus = <p>Receive email notifications for delivery confirmations: Enabled</p>
            } else {
                confirmationStatus = <p>Receive email notifications for delivery confirmations: Disabled</p>
            }
            if(this.state.settings.dgRequestNotification) {
                dgRequestStatus = <p>Receive email notifications when you're request to deliver a donation: Enabled</p>
            } else {
                dgRequestStatus = <p>Receive email notifications when you're request to deliver a donation: Disabled</p>
            }
            confirmationCheckBox = (
                <p>Email notifications for delivery confirmations
                    <input 
                type='checkbox'
                checked = {this.state.settings.confirmationNotification}
                name = 'confirmationNotification'
                onChange={this.handleChange}
                />
                </p>);
            dgRequestCheckBox = (
                <p>Receive email notifications when you're request to deliver a donation
                <input 
                type='checkbox'
                checked = {this.state.settings.confirmationNotification}
                name = 'dgRequestNotification'
                onChange={this.handleChange}
                />
                </p>);
        }
        // console.log(this.state);
        // console.log(dgUnavailableStatus);
        // console.log(this.state.settings.raUnavailableNotification);
        return (
            <div className="scs-0">
                <div className="scs-0-content scs-1-content">
                    <h5>Account Manager Details</h5>

                    {!this.state.isEditing ? 
                        
                        <div>
                           
                            <div className="amd-row">
                                <h6>Primary Contact</h6>
                                <div className="amd-details amd-details-1">
                                    <div className="amd-details-child">
                                        <h6>{this.props.account.primaryContact.name}</h6>
                                        <h6>{this.props.account.primaryContact.position}</h6>
                                        <h6>{this.props.account.primaryContact.email}</h6>
                                        <h6>{this.props.account.primaryContact.phone}</h6>
                                    </div>
                                    
                                    <div className="amd-details-child">

                                    {confirmationStatus}
                                    {dgUnavailableStatus}
                                    {raSpecifiedStatus}
                                    {raUnspecifiedStatus}
                                    {dgRequestStatus}
                                    {raUnavailableStatus}
                                        {/* {this.props.account.smsNotif ? <h6>SMS/Text Message</h6> : <div/>}
                                        {this.props.account.emailNotif ? <h6>Email</h6> : <div/>} */}
                                    </div>
                                </div>
                            </div>

                            {this.props.account.secondaryContact ?
                                <div className="amd-row">
                                    <h6>Secondary Contact</h6>
                                    <div className="amd-details amd-details-1">
                                        <div className="amd-details-child">
                                            <h6>{this.props.account.secondaryContact.name}</h6>
                                            <h6>{this.props.account.secondaryContact.position}</h6>
                                            <h6>{this.props.account.secondaryContact.email}</h6>
                                            <h6>{this.props.account.secondaryContact.phone}</h6>
                                        </div>
                                        
                                        <div className="amd-details-child">
                                            <h6>Recieve Notifications via</h6>
                                            <h6>Feature coming soon!</h6>
                                            {/* {this.props.account.smsNotif ? <h6>SMS/Text Message</h6> : <div/>}
                                            {this.props.account.emailNotif ? <h6>Email</h6> : <div/>} */}
                                        </div>
                                    </div>
                                </div>
                                :
                                <span />
                            }

                            {(this.props.accountType === AccountType.DONATING_AGENCY_MEMBER && this.props.isAdmin === false) ?
                                <span />
                                :
                                <div className="amd-edit amd-edit-1">
                                    <button type="button" className="form-button confirm-button" onClick={this.handleEdit.bind(this)}>Edit</button>
                                </div>
                            }

                        </div>

                        :

                        <form onSubmit={this.handleSubmit.bind(this)}>
                            
                            <div>
                                <h6>Primary Contact</h6>
                                <div className="editing-box">
                                    <div className="editing-child-1">
                                        <label className="label-component details">Name</label><br /><br />
                                        <label className="label-component details">Title/Position</label><br /><br />
                                        <label className="label-component details">Email</label><br /><br />
                                        <label className="label-component details">Phone Number</label><br /><br />
                                    </div>
                                    
                                    <div className="editing-child-2 amd-editing-2">
                                        <input name="name" type="text" className="form-input" defaultValue={this.props.account.primaryContact.name} /><br /><br />
                                        <input name="position" type="text" className="form-input" defaultValue={this.props.account.primaryContact.position} /><br /><br />
                                        <input name="email" type="email" className="form-input" defaultValue={this.props.account.primaryContact.email} /><br /><br />
                                        <input name="phone" type="tel" pattern={StringFormat.PHONE} onChange={formatPhone} className="form-input" defaultValue={this.props.account.primaryContact.phone} /><br /><br />
                                    </div> 

                                    <div className="editing-child-3">

                                    {confirmationCheckBox}
                                    {dgUnavailableCheckBox}
                                    {raSpecifiedCheckBox}
                                    {raUnspecifiedCheckBox}
                                    {dgRequestCheckBox}
                                    {raUnavailableCheckBox}
                                        {/* <input type="checkbox" name="smsNotif" value="smsNotif" defaultChecked={this.props.account.smsNotif}/><label className="label-component details">SMS/Text Message</label><br />
                                        <input type="checkbox" name="emailNotif" value="emailNotif" defaultChecked={this.props.account.emailNotif}/><label className="label-component details">Email</label> */}
                                    </div>    
                                </div>
                            </div>

                            {this.props.accountType === AccountType.RECEIVING_AGENCY ?
                                <div>
                                    <h6>Secondary Contact</h6>
                                    {this.props.account.secondaryContact ?
                                        <div className="editing-box">
                                            <div className="editing-child-1">
                                                <label className="label-component details">Name</label><br /><br />
                                                <label className="label-component details">Title/Position</label><br /><br />
                                                <label className="label-component details">Email</label><br /><br />
                                                <label className="label-component details">Phone Number</label><br /><br />
                                            </div>
                                            
                                            <div className="editing-child-2 amd-editing-2">
                                                <input name="sname" type="text" className="form-input" defaultValue={this.props.account.secondaryContact.name} /><br /><br />
                                                <input name="sposition" type="text" className="form-input" defaultValue={this.props.account.secondaryContact.position} /><br /><br />
                                                <input name="semail" type="email" className="form-input" defaultValue={this.props.account.secondaryContact.email} /><br /><br />
                                                <input name="sphone" type="tel" pattern={StringFormat.PHONE} onChange={formatPhone} className="form-input" defaultValue={this.props.account.secondaryContact.phone} /><br /><br />
                                            </div> 

                                            <div className="editing-child-3">
                                                Recieve Notifications via<br />
                                                <h6>Feature coming soon!</h6>
                                                {/* <input type="checkbox" name="smsNotif" value="smsNotif" defaultChecked={this.props.account.smsNotif}/><label className="label-component details">SMS/Text Message</label><br />
                                                <input type="checkbox" name="emailNotif" value="emailNotif" defaultChecked={this.props.account.emailNotif}/><label className="label-component details">Email</label> */}
                                            </div>    
                                        </div>
                                        :
                                        <div>Not Configured</div>
                                    }
                                </div>
      
                                :

                                <span />
                            }
                            <div className="amd-edit amd-edit-1">
                                <button type="submit" className="form-button confirm-button" onSubmit={this.handleSubmit.bind(this)}>Save</button>
                            </div>
                            <div className="amd-edit amd-edit-1">
                                <button type="button" className="form-button confirm-button" onClick={this.handleCancel.bind(this)}>Cancel</button>
                            </div>
                            <div className="scs-spacing" />
                        </form>

                    }

                </div>
            </div>
        );

    }

    // Backend TODO: Uncomment the data!!
    handleSubmit(e) {
        console.log(e.target.confirmationNotification.value)
        e.preventDefault();
        const { account, accountType } = this.props;
        let updates = {
            primaryContact: {
                name: e.target.name.value,
                position: e.target.position.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
            },
            settings: {
                confirmationNotification: e.target.confirmationNotification.value,
                // dgUnavailableNotification: e.target.dgUnavailableNotification,
                // raUnavailableNotification: e.target.raUnavailableNotification
            }
        };

        if (e.target.sname) {
            updates['secondaryContact'] = {
                name: e.target.sname.value,
                position: e.target.sposition.value,
                email: e.target.semail.value,
                phone: e.target.sphone.value
            }
        };

        // write updates to db
        if (accountType === AccountType.DONATING_AGENCY_MEMBER) { // write to /donatingAgencies/
            accountsRef.child(account.uid).update(updates.settings);
            accountsRef.child(account.uid).update(updates.primaryContact, this.setState({isEditing: false}));
        } else { // write to /accounts/
            accountsRef.child(account.uid).update(updates.settings);
            accountsRef.child(account.uid).update(updates, this.setState({isEditing: false}));
        }
    }

    handleEdit() {
        this.setState({
            isEditing: true
        });
    }

    handleCancel() {
        this.setState({
            isEditing: false
        });
    }

    handleChange = (event) => {
        event.preventDefault();
        let field = event.target.name;
        // console.log(field);
        // console.log(event.target.value);
        // console.log(event.target.value);
        // let value = !event.target.value;
        // console.log(value);
        let currSettings = this.state.settings;
        let value = !currSettings[field] 
        console.log(currSettings);
        console.log(currSettings[field]);
        currSettings[field] = value;
        console.log(currSettings[field]);
        console.log(currSettings);
        this.setState(currSettings);     // Update state
    }


}

export default AccountManager;