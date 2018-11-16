import React, { Component } from 'react';
import { AccountType, StringFormat } from '../../Enums';
import './Header.css';
import white_cross from '../../icons/white_cross.svg';
import moment from 'moment';

class Header extends Component {
    render() {
        let title = 'Recurring ';
        if (this.props.accountType !== AccountType.RECEIVING_AGENCY) {
            title += 'Pickup';
        } else {
            title += 'Delivery';
        }

        let headerClass = '';
        if (this.props.futureEvent) {
            if (this.props.delivery.type === 'emergency') {
                headerClass = 'header emergency-header';
            } else {
                headerClass = 'header future-header';
            }
        } else {
            headerClass = 'header past-header';
        }

        return (
            <div className={headerClass}>
                <h1 className="pop-up-header-title">{title}</h1>
                <img
                    onClick={this.props.closeDialog}
                    className="close"
                    src={white_cross}
                    alt="close"
                />
                <p className="header-time">
                    {moment(this.props.startTime).format(StringFormat.DATE_FULL)}{' '}
                    {moment(this.props.startTime).format(StringFormat.TIME)}{' '}
                    -{' '}
                    {moment(this.props.endTime).format(StringFormat.TIME)}
                </p>
            </div>
        );
    }
}
export default Header;
