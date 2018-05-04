import React from 'react';
import RequestTime from '../../PageLayout/Notification/Details/RequestTime';
import './PickupSummary.css';
import './Confirmation.css';
import truck from '../../icons/green_truck.svg';
import close from '../../icons/cross-out.svg';

class PickupRequestedConfirmation extends React.Component {
    render() {
        let da = this.props.donatingAgency.name;
        let ra = 'TBD';
        if (this.props.raRequested) {
            ra = this.props.raRequested.name;
        }
        return (
            <div className="backdrop ">
                <div className="modal confirmation-modal">
                    <div onClick={this.props.closeConfirm}>
                        <img
                            className="cross-out-icon"
                            src={close}
                            alt="close"
                        />
                    </div>
                    <div className="top-line" />
                    <img
                        className="truck-icon-confirmation"
                        src={truck}
                        alt="truck"
                    />
                    <h1 className="confirmation-header">
                        Recurring delivery is requested. We will notify you when
                        it is confirmed by all parties and scheduled.
                    </h1>
                    <div className="confirmation-content-wrapper">
                        <div className="to-from-wrapper">
                            <div className="confirm-from confirmation-time-p">
                                <b>From:</b> {da}
                            </div>
                            <div className="confirm-to confirmation-time-p">
                                <b>To:</b> {ra}
                            </div>
                        </div>
                        <RequestTime
                            request={this.props.request}
                            title={false}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default PickupRequestedConfirmation;
