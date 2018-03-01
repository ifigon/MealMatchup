import React, { Component } from 'react'
let ReactDOM = require('react-dom');

class DonatingAgencySignUp3 extends Component {
    constructor(props) {
        super(props);
        this.nextStep = this.nextStep.bind(this);
    }
    render() {
        return (
            <div className="signup-content">
                <div className="form-block">
                    <label className="form-component">New Member Account</label><br />
                    <input ref="memberName" type="text" className="form-component" placeholder="Name" id="memberName" defaultValue={this.props.fieldValues.memberName} />
                    <input ref="memberPosition" type="text" className="form-component" placeholder="Position" id="memberPosition" defaultValue={this.props.fieldValues.memberPosition} />
                    <input ref="memberPhone" type="text" className="form-component" placeholder="Phone" id="memberPhone" defaultValue={this.props.fieldValues.memberPhone} />
<div className="gap">
                    <input ref="memberEmail" type="text" id="memberEmail" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.memberEmail} />
                    <input ref="memberPassword" type="password" id="memberPassword" className="form-component" placeholder="Create Password" defaultValue={this.props.fieldValues.memberPassword} />
                    <input type="password" className="form-component" placeholder="Confirm Password" />
               </div>
                </div>

                <div className="buttons">
                    <span className="cancel" onClick={this.props.previousStep} >CANCEL</span>
                    <span className="next" onClick={this.nextStep}>DONE</span>
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
            memberName: ReactDOM.findDOMNode(this.refs.memberName).value,
            memberPosition: ReactDOM.findDOMNode(this.refs.memberPosition).value,
            memberPhone: ReactDOM.findDOMNode(this.refs.memberPhone).value,

            memberEmail: ReactDOM.findDOMNode(this.refs.memberEmail).value,
            memeberPassword: ReactDOM.findDOMNode(this.refs.memberPassword).value

        }
    
        this.props.saveValues(data);
        this.props.submitRegistration();
    }
}
export default DonatingAgencySignUp3;