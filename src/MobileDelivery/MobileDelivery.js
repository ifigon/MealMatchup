import React from 'react';
import Map from '../Map/Map';
import moment from 'moment';
import './Mobile.scss';
import { DeliveryStatus, StringFormat } from '../Enums';

import firebase from '../FirebaseConfig';
const db = firebase.database();

class MobileDelivery extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        var deliveredInfo = {
            signature: e.target.signature.value,
            timestamp: moment().valueOf()
            // printtName: e.target.print.value, // @Leon 04/11/2018: doesn't yet support hand-writing signiture
        };
        // write deliveredInfo and status change to db
        db.ref(`${this.props.dbRef}`).update({
            deliveredInfo: deliveredInfo,
            status: DeliveryStatus.COMPLETED
        });
        this.props.toggleShowSummary(); // notify controller to show summary dialog
    }

    render() {
        return (
            <div className="mobile-delivery">
                <div className="mobile-header">
                    <p>
                        <span id="mobile-header-pickup">Pickup</span> |{' '}
                        <span id="ms-highlight">Deliver</span> |{' '}
                        <span id="mobile-header-pickup">Complete</span>
                    </p>
                </div>
                <div className="mobile-card">
                    <div className="mobile-card-line" />
                    <p className="ms-header">{this.props.ra.agency}</p>
                    <p className="ms-pickup-time">
                        Deliver by{' '}
                        {moment(this.props.deliveryObj.pickedUpInfo.timestamp)
                            .add(3, 'hours')
                            .format(StringFormat.TIME)}
                    </p>
                    <Map
                        marginTop="10px"
                        marginLeft="20px"
                        marginBottom="8px"
                        height="90px"
                        width="90%"
                        address={this.props.ra.address}
                    />
                    <div className="ms-content">
                        <div id="ms-notes">
                            <p className="ms-content-header">Notes</p>
                            <p className="ms-notes">{this.props.ra.notes}</p>
                        </div>
                        <div id="ms-contact">
                            <p className="ms-content-header">Contact</p>
                            <p id="ms-name">{this.props.ra.primaryContact.name}</p>
                            <p id="ms-position">{this.props.ra.primaryContact.position}</p>
                            <a href={'tel:' + this.props.ra.primaryContact.phone}>
                                {this.props.ra.primaryContact.phone}
                            </a>
                        </div>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <div id="ms-confirm">
                            <p className="ms-content-header">Confirmation Signature</p>
                            <p className="ms-notes">
                                Get a confirmation signature and printed name from
                                {this.props.ra.primaryContact.name} at the non profit after you
                                drop-off food items at the destination.
                            </p>
                            {/* TODO: Signature */}
                            <input
                                name="signature"
                                className="ms-signature-delivery"
                                type="text"
                                placeholder="Sign Here"
                                required
                            />
                            {/*  
                                TODO: @Leon 04/11/2018: Hide one of the signiture input for now 
                                since we dont't yet support hand-writing signiture  
                            */}
                            {/* <input name="print" className="ms-input-delivery" type="text" placeholder="Print Name" required/> */}
                        </div>
                        <input type="submit" value="Done" id="ms-next-btn" />
                    </form>
                </div>
            </div>
        );
    }
}

export default MobileDelivery;
