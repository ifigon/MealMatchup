import React, { Component } from 'react';
import { StringFormat } from '../../Enums.js';
import { formatPhone } from '../../utils/Utils.js';

class DelivererGroupSignUp2 extends Component {
    constructor(props) {
        super(props);
        this.nextStep = this.nextStep.bind(this);
    }
    render() {
        return (
            <form onSubmit={this.nextStep}>
                <div className="signup-content">
                    <div className="form-block">
                        <label className="form-component">Account Details</label><br />
                        <input type="email" name="email" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.email} required /><br />
                        <input type="password" id="password" onChange={this.comparePasswords} name="password" className="form-component" placeholder="Password" defaultValue={this.props.fieldValues.password} required />
                        <input type="password" id="confirmPassword" onChange={this.comparePasswords} name="confirmPw" className="form-component" placeholder="Confirm Password" defaultValue={this.props.fieldValues.password} required />
                    </div>
                    <div className="form-block">
                        <label className="form-component">Coordinator Contact Information</label><br />
                        <input name="contactName" type="text" className="form-component" placeholder="Name" defaultValue={this.props.fieldValues.contactName} required /><br />
                        <input name="contactPosition" type="text" className="form-component" placeholder="Position" defaultValue={this.props.fieldValues.contactPosition} required /><br />
                        <input name="contactEmail" type="email" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.contactEmail} required /><br />
                        <input name="contactNumber" onChange={formatPhone} type="tel" pattern={StringFormat.PHONE} className="form-component" placeholder="123-456-7890" defaultValue={this.props.fieldValues.contactNumber} required /><br />
                    </div>

                    {this.props.error &&
                        <p className="sign-in-error">{this.props.error}</p>
                    }

                    <div className="buttons">
                        <span className="cancel" onClick={this.props.previousStep}>BACK</span>
                        <input type="submit" value="DONE" className="next"></input>
                    </div>
                </div>
            </form>
        );
    }

    comparePasswords(e) {
        var password = document.getElementById('password');
        var confirmPassword = document.getElementById('confirmPassword');
        if (confirmPassword.value !== password.value) {
            confirmPassword.setCustomValidity('Passwords Don\'t Match');
        } else {
            confirmPassword.setCustomValidity('');
        }
    }

    nextStep(e) {
        e.preventDefault();

        var data = {
            email: e.target.email.value,
            password: e.target.password.value,
            contactName: e.target.contactName.value,
            contactPosition: e.target.contactPosition.value,
            contactEmail: e.target.contactEmail.value,
            contactNumber: e.target.contactNumber.value,

        };

        this.props.saveValues(data);
        this.props.submitRegistration();
    }
}
export default DelivererGroupSignUp2;