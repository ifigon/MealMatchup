import React, { Component } from 'react';
import { DeliveryType } from '../../Enums';
import './Header.css';
import white_cross from '../../icons/white_cross.svg';

class Header extends Component {
    render() {
        let deliveryType = '';
        if (this.props.eventType === DeliveryType.RECURRING) {
            deliveryType = 'Recurring Delivery';
        }
        return (
            <div className="header">
                <h1 className="header-title">{deliveryType}</h1>
                <img
                    onClick={this.props.closeDialog}
                    className="close"
                    src={white_cross}
                    alt="close"
                />
                <p className="header-time">
                    {this.props.date} {this.props.startTime} -{' '}
                    {this.props.endTime}
                </p>
            </div>
        );
    }
}
export default Header;
