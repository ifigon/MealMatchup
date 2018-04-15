import React, { Component } from 'react';
import { AccountType, DeliveryType } from '../../Enums';
import './Header.css';
import white_cross from '../../icons/white_cross.svg';

class Header extends Component {
    render() {
        let deliveryType = '';
        if (this.props.eventType === DeliveryType.RECURRING) {
            if (this.props.accountType !== AccountType.RECEIVING_AGENCY) {
                deliveryType = 'Recurring Pickup';
            } else {
                deliveryType = 'Recurring Delivery';
            }
        }
        let headerClass = '';
        if (this.props.futureEvent) {
            headerClass = 'header future-header';
        } else {
            headerClass = 'header past-header';
        }
        return (
            <div className={headerClass}>
                <h1 className="pop-up-header-title">{deliveryType}</h1>
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
