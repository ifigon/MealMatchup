import React, { Component } from 'react'
let ReactDOM = require('react-dom');

class StudentSignUp1 extends Component {
    constructor(props){
        super(props);
        this.nextStep = this.nextStep.bind(this);
    }
    render() {
        return (
            <div className="signup-content">
                <div className="form-block">
                    <label className="form-component">Organizing Details</label><br />
                    <input ref="organizationName"type="text" id="organization" className="form-component" placeholder="Organization Name" defaultValue={this.props.fieldValues.organizationName} /><br />
                    <input ref="numVolunteers" type="text" id="volunteerNumber" className="form-component" placeholder="Number of Student Volunteers" defaultValue={this.props.fieldValues.numVolunteers} />
                </div>
                <div className="form-block">
                    <label className="form-component">Coordinator Contact Information</label><br />
                    <input ref="contactName" type="text" id="name" className="form-component" placeholder="Name" defaultValue={this.props.fieldValues.contactName} /><br />
                    <input ref="contactEmail" type="text" id="email" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.contactEmail} /><br />
                    <input ref="contactNumber" type="text" id="phone" className="form-component" placeholder="Phone" defaultValue={this.props.fieldValues.contactNumber} /><br />

                </div>

                <div className="disclaimer">
                    All fields are required unless specified
                    </div>
                <div className="buttons">
                    <span className="cancel" onClick={this.props.previousStep} >CANCEL</span>
                    <span className="next" onClick={this.nextStep}>NEXT</span>
                </div>
            </div>
        )
    }
    nextStep(e) {
        e.preventDefault()
        console.log(this);
        console.log(this.refs);
        // Get values via this.refs
        var data = {
            organizationName: ReactDOM.findDOMNode(this.refs.organizationName).value,
            numVolunteers: ReactDOM.findDOMNode(this.refs.numVolunteers).value,
            contactName: ReactDOM.findDOMNode(this.refs.contactName).value,
            contactEmail: ReactDOM.findDOMNode(this.refs.contactEmail).value,
            contactNumber: ReactDOM.findDOMNode(this.refs.contactNumber).value,
        }

        this.props.saveValues(data)
        this.props.nextStep()
    }
}
export default StudentSignUp1;