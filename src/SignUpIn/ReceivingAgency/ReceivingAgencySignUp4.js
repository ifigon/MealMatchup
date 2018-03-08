import React, { Component } from 'react';

class ReceivingAgencySignUp4 extends Component {
    constructor(props) {
        super(props);
        this.nextStep = this.nextStep.bind(this);
    }
    render() {
        return (
            <form onSubmit={this.nextStep}>
                <div className="signup-content">
                    <div className="form-block">
                        <label className="form-component">Primary Contact Details</label><br />
                        <input name="primaryName" type="text" id="primaryEmail" className="form-component" placeholder="Name" defaultValue={this.props.fieldValues.primaryName} /><br />
                        <input name="primaryEmail" type="text" id="primaryEmail" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.primaryEmail} />
                        <input name="primaryPhone" type="text" className="form-component" placeholder="Phone" id="primaryPhone" defaultValue={this.props.fieldValues.primaryPhone} />
                        <input name="primaryPosition" type="text" className="form-component" placeholder="Position" id="primaryPosition" defaultValue={this.props.fieldValues.primaryPosition} />
                    </div>
                    <div className="form-block">
                        <label className="form-component">Secondary Contact Details </label><i>(Optional)</i><br />
                        <input name="secondaryName" type="text" id="secondaryName" className="form-component" placeholder="Name" defaultValue={this.props.fieldValues.secondaryName} /><br />
                        <input name="secondaryEmail" type="text" id="secondaryEmail" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.secondaryEmail} />
                        <input name="secondaryPhone" id="secondaryPhone" type="text" className="form-component" placeholder="Phone" defaultValue={this.props.fieldValues.secondaryPhone} />
                        <input name="secondaryPosition" type="text" className="form-component" placeholder="Position" id="secondaryPosition" defaultValue={this.props.fieldValues.secondaryPosition} />
                    </div>
                    <div className="disclaimer">
                        All fields are required unless specified
                    </div>
                    <div className="buttons">
                        <span className="cancel" onClick={this.props.previousStep}>BACK</span>
                        <input className="next" type="submit" value="DONE"></input>
                    </div>
                </div>
            </form>
        );
    }
    nextStep(e) {
        e.preventDefault();
        var data = {
            primaryEmail: e.target.primaryEmail.value,
            primaryName: e.target.primaryName.value,
            primaryPhone: e.target.primaryPhone.value,
            primaryPosition: e.target.primaryPosition.value,

            secondaryName: e.target.secondaryName.value,
            secondaryEmail: e.target.secondaryEmail.value,
            secondaryPhone: e.target.secondaryPhone.value,
            secondaryPosition: e.target.secondaryPosition.value,
        };

        this.props.saveValues(data);
        this.props.nextStep();
    }
}
export default ReceivingAgencySignUp4;