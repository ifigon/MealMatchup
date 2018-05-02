import React, { Component } from 'react';
import { DeliveryType } from '../../Enums';
import './Toggle.css';
import info from '../../icons/info.svg';

class RequestTypeToggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: DeliveryType.RECURRING
        };
    }

    toggle() {
        if (this.state.type === DeliveryType.RECURRING) {
            this.setState({ type: DeliveryType.EMERGENCY });
        } else {
            this.setState({ type: DeliveryType.RECURRING });
        }
    }

    render() {
        return (
            <div className="toggle-wrapper" onClick={this.toggle.bind(this)}>
                <div className="toggle-container">
                    {this.state.type === DeliveryType.RECURRING ? (
                        <div className="recurring-toggle toggle">
                            Schedule Recurring Pickup
                        </div>
                    ) : (
                        <div className="emergency-toggle toggle">
                            Schedule Emergency Pickup
                        </div>
                    )}

                    <img src={info} alt="info" className="toggle-info" />
                </div>
            </div>
        );
    }
}
export default RequestTypeToggle;
