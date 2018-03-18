import React, { Component } from 'react';

class DelivererGroupSignUp2 extends Component {
    constructor(props) {
        super(props);
        this.nextStep = this.nextStep.bind(this);
        console.log(this.props.fieldValues);
    }
    render() {
        return (
            <form onSubmit={this.nextStep}>
                <div className="signup-content">
                    <div className="form-block">
                        <label className="form-component">Account Details</label><br />
                        <input name="email" type="text" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.email} /><br />
                        <input name="password" type="password" className="form-component" placeholder="Password" defaultValue={this.props.fieldValues.password} />
                        <input type="password" className="form-component" placeholder="Confirm Password" defaultValue={this.props.fieldValues.password} />
                    </div>
                    <div className="form-block">
                        <label className="form-component">Coordinator Contact Information</label><br />
                        <input name="contactName" type="text" className="form-component" placeholder="Name" defaultValue={this.props.fieldValues.contactName} /><br />
                        <input name="contactPosition" type="text" className="form-component" placeholder="Position" defaultValue={this.props.fieldValues.contactPosition} /><br />
                        <input name="contactEmail" type="text" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.contactEmail} /><br />
                        <input name="contactNumber" type="text" className="form-component" placeholder="Phone" defaultValue={this.props.fieldValues.contactNumber} /><br />
                    </div>

                    <div className="buttons">
                        <span className="cancel" onClick={this.props.previousStep}>BACK</span>
                        <input type="submit" value="DONE" className="next"></input>
                    </div>
                </div>
            </form>
        );
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