import React, { Component } from 'react';
import { StringFormat } from '../../Enums.js';

class DonatingAgencySignUp2 extends Component {
    constructor(props) {
        super(props);
        this.nextStep = this.nextStep.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.nextStep}>
                <div className="signup-content">
                    <div className="form-block">
                        <label className="form-component">Admin Account Details</label><br />
                        <input name="adminName" type="text" className="form-component" placeholder="Name" id="adminName" defaultValue={this.props.fieldValues.adminName} required />
                        <input name="adminPosition" type="text" className="form-component" placeholder="Position" id="adminPosition" defaultValue={this.props.fieldValues.adminPosition} required />
                        <input name="adminPhone" type="tel" pattern={StringFormat.PHONE} className="form-component" placeholder="123-456-7890" id="adminPhone" defaultValue={this.props.fieldValues.adminPhone} required />
                        <div className="gap">
                            <input name="adminEmail" type="email" id="adminEmail" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.adminEmail} required />
                            <input name="adminPassword" type="password" onChange={this.comparePasswords} id="adminPassword" className="form-component" placeholder="Create Password" required />
                            <input type="password" id="confirmPassword" onChange={this.comparePasswords} className="form-component" placeholder="Confirm Password" required />
                        </div>
                    </div>

                    {this.props.error &&
                        <p className="sign-in-error">{this.props.error}</p>
                    }

                    <div className="buttons">
                        <span className="cancel" onClick={this.props.previousStep} >BACK</span>
                        <input type="submit" className="next" value="DONE"></input>
                    </div>
                </div>
            </form>
        );
    }

    comparePasswords(e) {
        var password = document.getElementById('adminPassword');
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
            adminEmail: e.target.adminEmail.value,
            adminPassword: e.target.adminPassword.value,
            adminName: e.target.adminName.value,
            adminPhone: e.target.adminPhone.value,
            adminPosition: e.target.adminPosition.value,
        };

        this.props.saveValues(data);
        this.props.submitRegistration();
    }
}
export default DonatingAgencySignUp2;