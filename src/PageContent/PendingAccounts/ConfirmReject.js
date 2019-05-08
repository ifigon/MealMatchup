import React, { Component } from 'react';
import './ConfirmActivate';
import close from '../../icons/cross-out.svg';

class ConfirmReject extends Component {
    render() {
        return (
            <div className="overlay-wrapper" onClick={this.props.back}>
                <div className="confirm-activate-wrapper">
                    <h1 className="confirmation-message">
                        {' '}
                        Are you sure you want to reject{' '}
                        <div className="agency-name-style">
                            {this.props.agencyName}
                        </div>? The account will immediately be deleted from the
                        system.{' '}
                    </h1>
                    <div className="close-dialog">
                        <img
                            className="close-x-confirm"
                            src={close}
                            onClick={this.props.closeDialog}
                            alt="close"
                        />
                    </div>
                    <div className="confirm-button-wrapper">
                        <div
                            onClick={() => { 
                                const { agencyUId, umbrellaUId, accountType, primaryContactData, confirmReject } = this.props;
                                if (accountType === 'Donating Agency') {
                                    confirmReject(accountType, agencyUId, umbrellaUId, primaryContactData.uid);
                                } else {
                                    confirmReject(accountType, agencyUId, umbrellaUId, null);            
                                }
                            }}
                            className="verify-accept-popup verify-button-popup"
                        >
                            Confirm
                        </div>
                        <div
                            onClick={this.props.back}
                            className="verify-reject-popup verify-button-popup"
                        >
                            Cancel
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfirmReject;
