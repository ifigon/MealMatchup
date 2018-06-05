import React, { Component } from 'react';
import './ConfirmActivate.css';
import truck from '../../icons/red_truck.svg';

class ConfirmActivate extends Component {
    render() {
        return (
            <div className="confirm-activate-wrapper">
                <h1>
                    {' '}
                    Are you sure? Once an account is accepted, the user will be
                    able to log in.{' '}
                </h1>
                <div className="confirm-button-wrapper" />
                <div
                    onClick={this.props.confirmAccept}
                    className="verify-accept verify-button"
                >
                    Confirm
                </div>
                <div
                    onClick={this.props.back}
                    className="verify-reject verify-button"
                >
                    Back
                </div>
            </div>
        );
    }
}

export default ConfirmActivate;
