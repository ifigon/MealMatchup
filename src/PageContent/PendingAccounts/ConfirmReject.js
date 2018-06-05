import React, { Component } from 'react';
import './ConfirmActivate';
import close from '../../icons/cross-out.svg';

class ConfirmReject extends Component {
    render() {
        return (
            <div className="confirm-activate-wrapper">
                <h1 className="confirmation-message">
                    {' '}
                    Are you sure? The account will immediately be deleted from
                    the system.{' '}
                </h1>
                <div className="close-dialog">
                    <img
                        className="close-x-confirm"
                        src={close}
                        onClick={this.props.closeDialog}
                        alt="close"
                    />
                </div>
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
