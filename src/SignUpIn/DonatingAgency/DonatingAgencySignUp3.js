import React, { Component } from 'react'

class DonatingAgencySignUp3 extends Component {
    constructor(props) {
        super(props);
        this.nextStep = this.nextStep.bind(this);
    }
    render() {
        return (
            <form onSubmit={this.nextStep}>
            <div className="signup-content">
                <div className="form-block">
                    <label className="form-component">New Member Account</label><br />
                    <input name="memberName" type="text" className="form-component" placeholder="Name" id="memberName" defaultValue={this.props.fieldValues.memberName} />
                    <input name="memberPosition" type="text" className="form-component" placeholder="Position" id="memberPosition" defaultValue={this.props.fieldValues.memberPosition} />
                    <input name="memberPhone" type="text" className="form-component" placeholder="Phone" id="memberPhone" defaultValue={this.props.fieldValues.memberPhone} />
<div className="gap">
                    <input name="memberEmail" type="text" id="memberEmail" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.memberEmail} />
                    <input name="memberPassword" type="password" id="memberPassword" className="form-component" placeholder="Create Password" defaultValue={this.props.fieldValues.memberEmail} />
                    <input type="password" className="form-component" placeholder="Confirm Password" />
               </div>
                </div>

                <div className="buttons">
                    <span className="cancel" onClick={this.props.previousStep} >BACK  </span>
                    <input type="submit" className="next" value="DONE"></input>
                </div>
            </div>
            </form>
        )
    }
    nextStep(e) {
        e.preventDefault()
        var data = {
            memberName: e.target.memberName.value,
            memberPosition: e.target.memberPosition.value,
            memberPhone: e.target.memberPhone.value,

            memberEmail: e.target.memberEmail.value,
            memberPassword: e.target.memberPassword.value
        }

        this.props.saveValues(data)
        this.props.nextStep()
    }
}
export default DonatingAgencySignUp3;