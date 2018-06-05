import React, { Component } from 'react';
import './ConfirmActivate.css';
import close from '../../icons/cross-out.svg';

class ConfirmActivate extends Component {
    render() {
        return (
            <div className="confirm-activate-wrapper">
                <h1 className="confirmation-message">
                    {' '}
                    Are you sure? Once an account is accepted, the user will be
                    able to log in.{' '}
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
