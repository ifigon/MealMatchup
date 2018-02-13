import React, { Component } from 'react'

class StudentSignUp1 extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="signup-content">
                <div className="form-block">
                    <label className="form-component">Organizing Details</label><br />
                    <input type="text" id="organization" className="form-component" placeholder="Organization Name" defaultValue={this.props.fieldValues.organizationName} /><br />
                    <input type="text" id="volunteerNumber" className="form-component" placeholder="Number of Student Volunteers" defaultValue={this.props.fieldValues.numVolunteers} />
                </div>
                <div className="form-block">
                    <label className="form-component">Coordinator Contact Information</label><br />
                    <input type="text" id="name" className="form-component" placeholder="Name" defaultValue={this.props.fieldValues.contactName} /><br />
                    <input type="text" id="email" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.contactEmail} /><br />
                    <input type="text" id="phone" className="form-component" placeholder="Phone" defaultValue={this.props.fieldValues.contactNumber} /><br />

                </div>

                <div className="disclaimer">
                    All fields are required unless specified
                    </div>
                <div className="buttons">
                    <span className="cancel" onClick={this.previousStep} >CANCEL</span>
                    <span className="next" onClick={this.nextStep}>NEXT</span>
                </div>
            </div>
        )
    }
    nextStep(e) {
        e.preventDefault()

        // Get values via this.refs
        var data = {
            organizationName: this.refs.organizationName.getDOMNode().value,
            numVolunteers: this.refs.numVolunteers.getDOMNode().value,
            contactName: this.refs.contactName.getDOMNode().value,
            contactEmail: this.refs.contactEmail.getDOMNode().value,
            contactNumber: this.refs.contactNumber.getDOMNode().value,
        }

        this.props.saveValues(data)
        this.props.nextStep()
    }
}
export default StudentSignUp1;