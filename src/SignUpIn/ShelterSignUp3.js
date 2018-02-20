import React, { Component } from 'react'
let ReactDOM = require('react-dom');

class ShelterSignUp3 extends Component {
    constructor(props){
        super(props);
        console.log(props);
        this.nextStep = this.nextStep.bind(this);
    }
    render() {
        return (
            <div className="signup-content">
                <div className="form-block">
                    <label className="form-component">Primary Contact Details</label><br />
                    <input ref="primaryEmail"type="text" id="primaryEmail" className="form-component" placeholder="Name" defaultValue={this.props.fieldValues.primaryName} /><br />
                    <input ref="primaryEmail" type="text" id="primaryEmail" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.primaryEmail} />
                    <input ref="primaryPhone" type="text" className="form-component" placeholder="Phone" id="primaryPhone" defaultValue={this.props.fieldValues.primaryPhone} />
                    <input ref="primaryPosition" type="text" className="form-component" placeholder="Position" id="primaryPosition" defaultValue={this.props.fieldValues.primaryPosition} />
                </div>
                <div className="form-block">
                <label className="form-component">Secondary Contact Details </label><i>(Optional)</i><br />
                    <input ref="secondaryName"type="text" id="secondaryName" className="form-component" placeholder="Name" defaultValue={this.props.fieldValues.secondaryName} /><br />
                    <input ref="secondaryEmail" type="text" id="secondaryEmail" className="form-component" placeholder="Email" defaultValue={this.props.fieldValues.secondaryEmail} />
                    <input ref="secondaryPhone" id="secondaryPhone" type="text" className="form-component" placeholder="Phone" defaultValue={this.props.fieldValues.secondaryPhone} />
                    <input ref="secondaryPosition" type="text" className="form-component" placeholder="Position" id="secondaryPosition" defaultValue={this.props.fieldValues.secondaryPosition} />
                </div>
                <div className="buttons">
                    <span className="cancel" onClick={this.props.previousStep} >CANCEL</span>
                    <span className="next" onClick={this.props.nextStep}>DONE</span>
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
            primaryEmail: ReactDOM.findDOMNode(this.refs.primaryEmail).value,
            primaryName: ReactDOM.findDOMNode(this.refs.primaryName).value,
            primaryPhone: ReactDOM.findDOMNode(this.refs.primaryPhone).value,
            primaryPosition: ReactDOM.findDOMNode(this.refs.primaryPosition).value,
            
            secondaryName: ReactDOM.findDOMNode(this.refs.secondaryName).value,
            secondaryEmail: ReactDOM.findDOMNode(this.refs.secondaryEmail).value,
            secondaryPhone: ReactDOM.findDOMNode(this.refs.secondaryPhone).value,
            secondaryPosition: ReactDOM.findDOMNode(this.refs.secondaryPosition).value,

        }

        this.props.saveValues(data)
        this.props.nextStep()
    }
}
export default ShelterSignUp3;