import React, { Component } from 'react';
import RecurringPickupRequest from './RecurringPickupRequest';
import RequestTypeToggle from './RequestTypeToggle';

class RequestPickupWrapper extends Component {
    render() {
        return (
            <div>
                <RequestTypeToggle />
                <RecurringPickupRequest
                    account={this.props.account}
                    donatingAgency={this.props.donatingAgency}
                />
            </div>
        );
    }
}
export default RequestPickupWrapper;
