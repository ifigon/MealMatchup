import React, { Component } from 'react';
import RequestPickup from './RequestPickup';
import RequestTypeToggle from './RequestTypeToggle';
import { DeliveryType } from '../../Enums';

class RequestPickupWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formType: DeliveryType.RECURRING
        };
    }

    toggle() {
        if (this.state.formType === DeliveryType.RECURRING) {
            this.setState({ formType: DeliveryType.EMERGENCY });
        } else {
            this.setState({ formType: DeliveryType.RECURRING });
        }
    }

    render() {
        return (
            <div>
                <RequestTypeToggle
                    formType={this.state.formType}
                    toggle={this.toggle.bind(this)}
                />
                <RequestPickup
                    account={this.props.account}
                    donatingAgency={this.props.donatingAgency}
                    formType={this.state.formType}
                />
            </div>
        );
    }
}
export default RequestPickupWrapper;
