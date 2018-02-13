import React, { Component } from 'react'

class StudentSignUp2 extends Component {
    render() {
        return (
            <div className="signup">
                <div className="form-block">
                    <label className="form-component">Account Details</label><br />
                    <input type="text" id="email" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.email} /><br />
                    <input type="password" id="password" className="form-component" placeholder="Password" defaultValue={this.props.fieldValues.password} />
                    <input type="password" id="password" className="form-component" placeholder="Confirm Password" defaultValue={this.props.fieldValues.password} />
                </div>

                <div className="buttons">
                    <span className="cancel" onClick={this.previousStep.bind(this)}>CANCEL</span>
                    <span className="next">NEXT</span>
                </div>
            </div>
        )
    }
    nextStep(e) {
        e.preventDefault()

        // Get values via this.refs
        var data = {
            email: this.refs.email.getDOMNode().value,
            password: this.refs.password.getDOMNode().value,
        }

        this.props.saveValues(data)
        this.props.nextStep()
    }
}
export default StudentSignUp2;