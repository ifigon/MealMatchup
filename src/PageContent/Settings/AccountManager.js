import React, { Component } from 'react';

class AccountManager extends Component {

    render() {

        return (
            <div className="scs-0">
                <div className="scs-0-content scs-1-content">
                    <h5>Account Manager Details</h5>

                    {!this.props.isEditingAcc ? 
                        
                        <div>
                           
                            <div className="amd-row">
                                <div className="amd-details amd-details-1">
                                    <div className="amd-details-child">
                                        <h6>{this.props.account.details.name}</h6>
                                        <h6>{this.props.account.details.position}</h6>
                                        <h6>{this.props.account.details.email}</h6>
                                        <h6>{this.props.account.details.phone}</h6>
                                    </div>
                                    
                                    <div className="amd-details-child">
                                        <h6>Recieve Notifications via</h6>
                                        <h6>Feature coming soon!</h6>
                                        {/* {this.props.account.smsNotif ? <h6>SMS/Text Message</h6> : <div/>}
                                        {this.props.account.emailNotif ? <h6>Email</h6> : <div/>} */}
                                    </div>
                                </div>
                            </div>

                            {this.props.secondaryContact ?
                                <div className="amd-row">
                                    <div className="amd-details amd-details-1">
                                        <div className="amd-details-child">
                                            <h6>{this.props.secondaryContact.name}</h6>
                                            <h6>{this.props.secondaryContact.position}</h6>
                                            <h6>{this.props.secondaryContact.email}</h6>
                                            <h6>{this.props.secondaryContact.phone}</h6>
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

                            {this.props.isAdmin === 'admin' ? 

                                <div className="amd-edit amd-edit-1">
                                    <button type="button" className="form-button confirm-button" onClick={this.props.handleEditAccManager}>Edit</button>
                                </div>

                                :

                                <span />
                            }

                        </div>

                        :

                        <form onSubmit={this.handleSubmit.bind(this)}>
                            
                            <div className="editing-box">
                                <div className="editing-child-1">
                                    <label className="label-component details">Name</label><br /><br />
                                    <label className="label-component details">Title/Position</label><br /><br />
                                    <label className="label-component details">Email</label><br /><br />
                                    <label className="label-component details">Phone Number</label><br /><br />
                                </div>
                                
                                <div className="editing-child-2 amd-editing-2">
                                    <input name="name" type="text" className="form-input" defaultValue={this.props.account.details.name} /><br /><br />
                                    <input name="position" type="text" className="form-input" defaultValue={this.props.account.details.position} /><br /><br />
                                    <input name="email" type="text" className="form-input" defaultValue={this.props.account.details.email} /><br /><br />
                                    <input name="phone" type="tel" className="form-input" defaultValue={this.props.account.details.phone} /><br /><br />
                                </div> 

                                <div className="editing-child-3">
                                    Recieve Notifications via<br />
                                    <h6>Feature coming soon!</h6>
                                    {/* <input type="checkbox" name="smsNotif" value="smsNotif" defaultChecked={this.props.account.smsNotif}/><label className="label-component details">SMS/Text Message</label><br />
                                    <input type="checkbox" name="emailNotif" value="emailNotif" defaultChecked={this.props.account.emailNotif}/><label className="label-component details">Email</label> */}
                                </div>    
                            </div>

                            {this.props.secondaryContact ?

                                <div className="editing-box">
                                    <div className="editing-child-1">
                                        <label className="label-component details">Name</label><br /><br />
                                        <label className="label-component details">Title/Position</label><br /><br />
                                        <label className="label-component details">Email</label><br /><br />
                                        <label className="label-component details">Phone Number</label><br /><br />
                                    </div>
                                    
                                    <div className="editing-child-2 amd-editing-2">
                                        <input name="sname" type="text" className="form-input" defaultValue={this.props.secondaryContact.name} /><br /><br />
                                        <input name="sposition" type="text" className="form-input" defaultValue={this.props.secondaryContact.position} /><br /><br />
                                        <input name="semail" type="text" className="form-input" defaultValue={this.props.secondaryContact.email} /><br /><br />
                                        <input name="sphone" type="tel" className="form-input" defaultValue={this.props.secondaryContact.phone} /><br /><br />
                                    </div> 

                                    <div className="editing-child-3">
                                        Recieve Notifications via<br />
                                        <h6>Feature coming soon!</h6>
                                        {/* <input type="checkbox" name="smsNotif" value="smsNotif" defaultChecked={this.props.account.smsNotif}/><label className="label-component details">SMS/Text Message</label><br />
                                        <input type="checkbox" name="emailNotif" value="emailNotif" defaultChecked={this.props.account.emailNotif}/><label className="label-component details">Email</label> */}
                                    </div>    
                                </div>

                                :

                                <span />
                            }

                            <div className="amd-edit amd-edit-1">
                                <button type="submit" className="form-button confirm-button" onSubmit={this.handleSubmit.bind(this)}>Save</button>
                            </div>
                        </form>

                    }

                </div>
            </div>
        );

    }

    handleSubmit(e) {
        e.preventDefault();
        let acc = {
            details: {
                name: e.target.name.value,
                position: e.target.position.value,
                email: e.target.email.value,
                phone: e.target.phone.value
            }
        };
        let secondaryContact = null;
        if(e.target.sname) {
            secondaryContact = {
                name: e.target.sname.value,
                position: e.target.sposition.value,
                email: e.target.semail.value,
                phone: e.target.sphone.value
            }
        }
        this.props.handleAccSave(acc, secondaryContact);   
    }

}

export default AccountManager;