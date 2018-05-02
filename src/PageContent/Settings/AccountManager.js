import React, { Component } from 'react';
import { AccountType } from '../../Enums';
import { StringFormat } from '../../Enums';

class AccountManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false
        };
    }

    render() {

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
                                        <h6>Recieve Notifications via</h6>
                                        <h6>Feature coming soon!</h6>
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

                            {(this.props.account.accountType === AccountType.DONATING_AGENCY_MEMBER && this.props.isAdmin === false) ?
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
                                        <input name="phone" type="tel" pattern={StringFormat.PHONE} className="form-input" defaultValue={this.props.account.primaryContact.phone} /><br /><br />
                                    </div> 

                                    <div className="editing-child-3">
                                        Recieve Notifications via<br />
                                        <h6>Feature coming soon!</h6>
                                        {/* <input type="checkbox" name="smsNotif" value="smsNotif" defaultChecked={this.props.account.smsNotif}/><label className="label-component details">SMS/Text Message</label><br />
                                        <input type="checkbox" name="emailNotif" value="emailNotif" defaultChecked={this.props.account.emailNotif}/><label className="label-component details">Email</label> */}
                                    </div>    
                                </div>
                            </div>

                            {this.props.account.accountType === AccountType.RECEIVING_AGENCY ?
                                
                                <div>
                                    <h6>Secondary Contact</h6>
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
                                            <input name="sphone" type="tel" pattern={StringFormat.PHONE} className="form-input" defaultValue={this.props.account.secondaryContact.phone} /><br /><br />
                                        </div> 

                                        <div className="editing-child-3">
                                            Recieve Notifications via<br />
                                            <h6>Feature coming soon!</h6>
                                            {/* <input type="checkbox" name="smsNotif" value="smsNotif" defaultChecked={this.props.account.smsNotif}/><label className="label-component details">SMS/Text Message</label><br />
                                            <input type="checkbox" name="emailNotif" value="emailNotif" defaultChecked={this.props.account.emailNotif}/><label className="label-component details">Email</label> */}
                                        </div>    
                                    </div>
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
        e.preventDefault();
        // let acc = {
        //     details: {
        //         name: e.target.name.value,
        //         position: e.target.position.value,
        //         email: e.target.email.value,
        //         phone: e.target.phone.value
        //     }
        // };
        // let secondaryContact = null;
        // if(e.target.sname) {
        //     secondaryContact = {
        //         name: e.target.sname.value,
        //         position: e.target.sposition.value,
        //         email: e.target.semail.value,
        //         phone: e.target.sphone.value
        //     };
        // };
        this.setState({
            isEditing: false
        });
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

}

export default AccountManager;