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
                        <input name="email" type="text" id="organization" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.email} required /><br />
                        <input name="password" type="password" id="password" className="form-component" placeholder="Password" required />
                        <input type="password" className="form-component" placeholder="Confirm Password" required />
                    </div>
                    <div className="buttons">
                        <span className="cancel" onClick={this.props.previousStep} >BACK</span>
                        <input type="submit" className="next" value="NEXT"></input>
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
        };

        this.props.saveValues(data);
        this.props.nextStep();
    }
}
export default ReceivingAgencySignUp2;