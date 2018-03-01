import React, { Component } from 'react'
import ReactDOM from 'react-dom';

class DelivererGroupSignUp2 extends Component {
    constructor(props) {
        super(props);
        this.nextStep = this.nextStep.bind(this);
    }
    render() {
        return (
            <div className="signup-content">
                <div className="form-block">
                    <label className="form-component">Account Details</label><br />
                    <input ref="email" type="text" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.email} /><br />
                    <input ref="password" type="password" className="form-component" placeholder="Password" defaultValue={this.props.fieldValues.password} />
                    <input type="password" className="form-component" placeholder="Confirm Password" defaultValue={this.props.fieldValues.password} />
                </div>
                <div className="form-block">
                    <label className="form-component">Coordinator Contact Information</label><br />
                    <input ref="contactName" type="text"  className="form-component" placeholder="Name" defaultValue={this.props.fieldValues.contactName} /><br />
                    <input ref="contactPosition" type="text" className="form-component" placeholder="Position" defaultValue={this.props.fieldValues.contactPosition} /><br />
                    <input ref="contactEmail" type="text" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.contactEmail} /><br />
                    <input ref="contactNumber" type="text" className="form-component" placeholder="Phone" defaultValue={this.props.fieldValues.contactNumber} /><br />
                </div>

                <div className="buttons">
                    <span className="cancel" onClick={this.props.previousStep}>CANCEL</span>
                    <span className="next" onClick={this.props.nextStep}>DONE</span>
                </div>
            </div>
        )
    }
    nextStep(e) {
        e.preventDefault()

        // Get values via this.refs
        var data = {
            email: ReactDOM.findDOMNode(this.refs.email).value,
            password: ReactDOM.findDOMNode(this.refs.password).value,
            contactName: ReactDOM.findDOMNode(this.refs.contactName).value,
            contactPosition: ReactDOM.findDOMNode(this.refs.contactPosition).value,
            contactEmail: ReactDOM.findDOMNode(this.refs.contactEmail).value,
            contactNumber: ReactDOM.findDOMNode(this.refs.contactNumber).value,

        }

        this.props.saveValues(data)
        this.props.nextStep()
    }
}
export default DelivererGroupSignUp2;