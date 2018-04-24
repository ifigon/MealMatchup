import React, { Component } from 'react';

class ReceivingAgencySignUp2 extends Component {
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
                        <input name="email" type="email" id="organization" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.email} required /><br />
                        <input name="password" type="password" onChange={this.comparePasswords} id="password" className="form-component" placeholder="Password" required />
                        <input type="password" id="confirmPassword" onChange={this.comparePasswords} className="form-component" placeholder="Confirm Password" required />
                    </div>
                    <div className="buttons">
                        <span className="cancel" onClick={this.props.previousStep} >BACK</span>
                        <input type="submit" className="next" value="NEXT"></input>
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
        };

        this.props.saveValues(data);
        this.props.nextStep();
    }
}
export default ReceivingAgencySignUp2;