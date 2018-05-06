import React, { Component } from 'react';
import RecurringPickupRequest from './RecurringPickupRequest';
import RequestTypeToggle from './RequestTypeToggle';
import { DeliveryType } from '../../Enums';

class RequestPickupWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: DeliveryType.EMERGENCY
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
            <div>
                <RequestTypeToggle
                    type={this.state.type}
                    toggle={this.toggle.bind(this)}
                />
                <RecurringPickupRequest
                    account={this.props.account}
                    donatingAgency={this.props.donatingAgency}
                    type={this.state.type}
                />
            </div>
        );
    }
}
export default RequestPickupWrapper;
