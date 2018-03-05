import React, { Component } from 'react'

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
                        <input name="adminName" type="text" className="form-component" placeholder="Name" id="adminName" defaultValue={this.props.fieldValues.adminName} />
                        <input name="adminPosition" type="text" className="form-component" placeholder="Position" id="adminPosition" defaultValue={this.props.fieldValues.adminPosition} />
                        <input name="adminPhone" type="text" className="form-component" placeholder="Phone" id="adminPhone" defaultValue={this.props.fieldValues.adminPhone} />
                        <div className="gap">
                            <input name="adminEmail" type="text" id="adminEmail" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.adminEmail} />
                            <input name="adminPassword" type="password" id="adminPassword" className="form-component" placeholder="Create Password" defaultValue={this.props.fieldValues.adminEmail} />
                            <input type="password" className="form-component" placeholder="Confirm Password" />
                        </div>
                    </div>

                    <div className="buttons">
                        <span className="cancel" onClick={this.props.previousStep} >BACK</span>
                        <input type="submit" className="next" value="NEXT"></input>
                    </div>
                </div>
            </form>
        )
    }
    nextStep(e) {
        e.preventDefault()
        var data = {
            adminEmail: e.target.adminEmail.value,
            adminPassword:  e.target.adminPassword.value,
            adminName:  e.target.adminName.value,
            adminPhone:  e.target.adminPhone.value,
            adminPosition:  e.target.adminPosition.value,
        }

        this.props.saveValues(data)
        this.props.nextStep()
    }
}
export default DonatingAgencySignUp2;