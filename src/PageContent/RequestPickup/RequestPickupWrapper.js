import React, { Component } from 'react';
import RequestPickup from './RequestPickup';
import RequestTypeToggle from './RequestTypeToggle';
import { DeliveryType } from '../../Enums';

class RequestPickupWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeUserViewing: DeliveryType.RECURRING
        };
    }

    toggle() {
        if (this.state.typeUserViewing === DeliveryType.RECURRING) {
            this.setState({ typeUserViewing: DeliveryType.EMERGENCY });
        } else {
            this.setState({ typeUserViewing: DeliveryType.RECURRING });
        }
    }

    render() {
        return (
            <div>
                <RequestTypeToggle
                    type={this.state.typeUserViewing}
                    toggle={this.toggle.bind(this)}
                />
                <RequestPickup
                    account={this.props.account}
                    donatingAgency={this.props.donatingAgency}
                    type={this.state.typeUserViewing}
                />
            </div>
        );
    }
}
export default RequestPickupWrapper;
