import React, { Component } from 'react';
import './ConfirmActivate';
import truck from '../../icons/red_truck.svg';

class ConfirmReject extends Component {
    render() {
        return (
            <div className="confirm-activate-wrapper">
                <h1>
                    {' '}
                    Are you sure? The account will immediately be deleted from
                    the system.{' '}
                </h1>
                <div className="confirm-button-wrapper" />
                <div
                    onClick={this.props.confirmReject}
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

export default ConfirmReject;
