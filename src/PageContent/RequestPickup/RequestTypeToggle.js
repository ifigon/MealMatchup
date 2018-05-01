import React, { Component } from 'react';
import { DeliveryType } from '../../Enums';
import './Toggle.css';

class RequestTypeToggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'recurring'
        };

        // this.toggle = this.toggle.bind(this);
    }

    toggle() {
        if (this.state.type === DeliveryType.RECURRING) {
            this.setState({ type: DeliveryType.EMERGENCY });
        } else {
            this.setState({ type: DeliveryType.RECURRING });
        }
    }

    render() {
        // if (this.state.type === DeliveryType.RECURRING) {

        // } else {
        //     this.setState({ type: DeliveryType.EMERGENCY });
        // }

        return (
            <div className="toggle" onClick={this.toggle.bind(this)}>
                <span className={this.state.type}>toggle</span>
                <span className="more-info">?</span>
            </div>
        );
    }
}
export default RequestTypeToggle;
