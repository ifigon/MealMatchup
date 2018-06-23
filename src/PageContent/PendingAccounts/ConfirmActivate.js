import React, { Component } from 'react';
import './ConfirmActivate.css';
import close from '../../icons/cross-out.svg';

class ConfirmActivate extends Component {
    render() {
        return (
            <div className="overlay-wrapper" onClick={this.props.back}>
                <div className="confirm-activate-wrapper">
                    <h1 className="confirmation-message">
                        Are you sure you want to accept {this.props.agencyName}{' '}
                        account? Their account will be fully activated.
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
                                const { agencyUId, accountType, primaryContactData, confirmAccept } = this.props;
                                if (accountType === 'Donating Agency') {
                                    confirmAccept(agencyUId, primaryContactData.uid);
                                } else {
                                    confirmAccept(agencyUId, null);            
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

export default ConfirmActivate;
