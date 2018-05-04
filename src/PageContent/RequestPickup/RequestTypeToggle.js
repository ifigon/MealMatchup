import React, { Component } from 'react';
import { DeliveryType } from '../../Enums';
import './Toggle.css';
import info from '../../icons/info.svg';

class RequestTypeToggle extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     type: ''
        // };
    }

    // componentWillReceiveProps() {
    //     this.setState({ type: this.props.type });
    // }

    render() {
        return (
            <div className="toggle-wrapper" onClick={this.props.toggle}>
                <div className="toggle-container">
                    {this.props.type === DeliveryType.RECURRING ? (
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
