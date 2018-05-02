import React, { Component } from 'react';
import { StringFormat } from '../../Enums.js';
import { formatPhone } from '../../utils/Utils.js';

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
                        <input name="primaryName" type="text" id="primaryName" className="form-component" placeholder="Name" defaultValue={this.props.fieldValues.primaryName} required /><br />
                        <input name="primaryEmail" type="email" id="primaryEmail" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.primaryEmail} required />
                        <input name="primaryPhone" onChange={formatPhone} type="tel" pattern={StringFormat.PHONE} className="form-component" placeholder="123-456-7890" id="primaryPhone" defaultValue={this.props.fieldValues.primaryPhone} required />
                        <input name="primaryPosition" type="text" className="form-component" placeholder="Position" id="primaryPosition" defaultValue={this.props.fieldValues.primaryPosition} required />
                    </div>
                    <div className="form-block">
                        <label className="form-component">Secondary Contact Details </label><i>(Optional)</i><br />
                        <input name="secondaryName" type="text" id="secondaryName" className="form-component" placeholder="Name" defaultValue={this.props.fieldValues.secondaryName} /><br />
                        <input name="secondaryEmail" type="email" id="secondaryEmail" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.secondaryEmail} />
                        <input name="secondaryPhone" id="secondaryPhone" onChange={formatPhone} type="tel" pattern={StringFormat.PHONE} className="form-component" placeholder="123-456-7890" defaultValue={this.props.fieldValues.secondaryPhone} />
                        <input name="secondaryPosition" type="text" className="form-component" placeholder="Position" id="secondaryPosition" defaultValue={this.props.fieldValues.secondaryPosition} />
                    </div>
                    <div className="disclaimer">
                        All fields are required unless specified
                    </div>

                    {this.props.error &&
                        <p className="sign-in-error">{this.props.error}</p>
                    }

                    <div className="buttons">
                        <span className="cancel" onClick={this.props.previousStep}>BACK</span>
                        <input className="next" type="submit" value="DONE"></input>
                    </div>
                </div>
            </form>
        );
    }

    checkSecondaryContact() {
        let name = document.getElementById('secondaryName').value.length;
        let email = document.getElementById('secondaryEmail').value.length;
        let phone = document.getElementById('secondaryPhone').value.length;
        let position = document.getElementById('secondaryPosition').value.length;
        if(name > 0 || email > 0 || phone > 0 || position > 0) {
            if(name === 0) {
                return false;
            }
            else if(email === 0) {
                return false;
            }
            else if(phone === 0) {
                return false;
            }
            else if(position === 0) {
                return false;
            }
        }
        return true;
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

        if(this.checkSecondaryContact()) {
            this.props.saveValues(data);
            this.props.submitRegistration();
        }
    }
}
export default ReceivingAgencySignUp4;