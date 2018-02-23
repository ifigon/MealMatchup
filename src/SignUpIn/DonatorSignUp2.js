import React, { Component } from 'react'
let ReactDOM = require('react-dom');

class DonatorSignUp2 extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.nextStep = this.nextStep.bind(this);
    }
    render() {
        return (
            <div className="signup-content">
                <div className="form-block">
                    <label className="form-component">Admin Account Details</label><br />
                    <input ref="adminName" type="text" className="form-component" placeholder="Name" id="adminName" defaultValue={this.props.fieldValues.adminName} />
                    <input ref="adminPosition" type="text" className="form-component" placeholder="Position" id="adminPosition" defaultValue={this.props.fieldValues.adminPosition} />
                    <input ref="adminPhone" type="text" className="form-component" placeholder="Phone" id="adminPhone" defaultValue={this.props.fieldValues.adminPhone} />
<div className="gap">
                    <input ref="adminEmail" type="text" id="adminEmail" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.adminEmail} />
                    <input ref="adminPassword" type="password" id="adminPassword" className="form-component" placeholder="Create Password" defaultValue={this.props.fieldValues.adminEmail} />
                    <input type="password" className="form-component" placeholder="Confirm Password" />
               </div>
                </div>

                <div className="buttons">
                    <span className="cancel" onClick={this.props.previousStep} >CANCEL</span>
                    <span className="next" onClick={this.props.nextStep}>NEXT</span>
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
            adminEmail: ReactDOM.findDOMNode(this.refs.adminEmail).value,
            adminName: ReactDOM.findDOMNode(this.refs.adminName).value,
            adminPhone: ReactDOM.findDOMNode(this.refs.adminPhone).value,
            adminPosition: ReactDOM.findDOMNode(this.refs.adminPosition).value,

            secondaryName: ReactDOM.findDOMNode(this.refs.secondaryName).value,
            secondaryEmail: ReactDOM.findDOMNode(this.refs.secondaryEmail).value,
            secondaryPhone: ReactDOM.findDOMNode(this.refs.secondaryPhone).value,
            secondaryPosition: ReactDOM.findDOMNode(this.refs.secondaryPosition).value,

        }

        this.props.saveValues(data)
        this.props.nextStep()
    }
}
export default DonatorSignUp2;