import React, { Component } from 'react'

class SignUpComplete extends Component {
    render() {
        return (
            <div className="signup-complete-wrapper">
            <div className="signup-complete">
            <label className="signup-complete-label">Account created successfully!</label>
                <p>Before this account is activated, it will need to be approved. This agency will receive an email when this account is approved and activated.</p>
            <div className="ok-button">OK</div>
            </div>
            </div>
        )
    }
// push data to firebase here?
}
export default SignUpComplete;