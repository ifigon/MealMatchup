import React, { Component } from 'react'
let ReactDOM = require('react-dom');

class StudentSignUp3 extends Component {
    constructor(props){
        super(props);
        this.nextStep = this.nextStep.bind(this);
    }
    render() {
        return (
            <div className="signup-content">
                <div className="form-block">
                    <label className="form-component">Personal Details</label><br />
                    <input ref="memberName" type="text" id="memberName" className="form-component" placeholder="Name" defaultValue={this.props.fieldValues.memberName} /><br />
                    <input ref="position" type="text" id="position" className="form-component" placeholder="Position" defaultValue={this.props.fieldValues.position} />
                    <input ref="memberEmail" type="text" id="memberPassword" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.memberEmail} />
                    <input ref="memberNumber" type="text" id="memberNumber" className="form-component" placeholder="Phone Number" defaultValue={this.props.fieldValues.memberNumber} />
                </div>

                <div className="buttons">
                    <span className="cancel" onClick={this.previousStep}>CANCEL</span>
                    <span className="next">NEXT</span>
                </div>
            </div>
        )
    }
    nextStep(e) {
        e.preventDefault()

        // Get values via this.refs
        var data = {
            memberName: ReactDOM.findDOMNode(this.refs.memberName).value,
            memberNumber: ReactDOM.findDOMNode(this.refs.memberNumber).value,
            memberEmail: ReactDOM.findDOMNode(this.refs.memberEmail).value,
            position: ReactDOM.findDOMNode(this.refs.position).value

        }

        this.props.saveValues(data)
        this.props.nextStep()
    }
}
export default StudentSignUp3;