// No log in functionality yet

import React, { Component } from 'react'

class DonatorSignUp extends Component {
    constructor(props) {
        super(props);
        this.nextStep = this.nextStep.bind(this);
    }
    render() {
        return (
            <div className="login-buttons">
                <div className="button-wrapper"><button className="button">LOGIN</button> </div>
                <div className="button-wrapper"><button className="button" onClick={this.nextStep}>CREATE ACCOUNT</button></div>
            </div>
        )
    }
    nextStep(e) {
        e.preventDefault()
        this.props.nextStep()
    }
}
export default DonatorSignUp;