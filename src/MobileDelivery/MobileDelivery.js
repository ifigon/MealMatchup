import React from 'react';
import Map from '../Map/Map';
import Geocode from '../react-geocode';
import moment from 'moment';
import './Mobile.css';
import MobileConfirm from './MobileConfirm';

import firebase from '../FirebaseConfig';
const db = firebase.database();

class MobileDelivery extends React.Component {
    constructor(props){
        super(props);
        
        this.state  = {
            lat: '', 
            long: '',
            fullAddress: '',
            submitPressed: false
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        var deliveredInfo = {
            signature: e.target.signature.value,
            printtName: e.target.print.value,
            timestamp: moment().unix(),
        };
        // this.props.saveValues(data);
        db.ref(`${this.props.dbRef}`).update({deliveredInfo: deliveredInfo});
        this.setState({submitPressed:true, deliveredInfo: deliveredInfo});
    }

    componentDidMount(){
        // concatenate address in a specific order
        var keyOrder = ['street1', 'street2', 'city', 'state', 'zipcode'];
        var address = keyOrder.map(key => this.props.ra.address[key]).join(' ');
        // Convert address to Lat, Long
        Geocode.fromAddress(address).then(
            response => {
                this.setState({
                    lat: response.results[0].geometry.location.lat,
                    long: response.results[0].geometry.location.lng,
                    fullAddress: address
                });
            }
        );
    }

    render() {
        return (
            <div className="mobile-delivery">
                <div className="mobile-header">
                    <p><span id="mobile-header-pickup">Pickup</span> | <span id="ms-highlight">Deliver</span> | <span id="mobile-header-pickup">Complete</span></p>
                </div>
                <div className="mobile-card">
                    <div className="mobile-card-line"></div>
                    <p className="ms-header">{this.props.ra.agency}</p>
                    <p className="ms-pickup-time">Deliver by {moment.unix(this.props.deliveryObj.pickedUpInfo.timestamp).add(3, 'hours').format('LT')}
                    </p>
                    <Map marginTop="10px" marginLeft="20px" height="90px" width="90%" address={this.props.ra.address}/>
                    {/* Prompts user to open maps on their phone */}
                    <a id="ms-address" href={'geo:' + this.state.lat + ',' + this.state.long} target="_blank">{this.state.fullAddress}</a>
                    <div className="ms-content">
                        <div id="ms-notes">
                            <p className="ms-content-header">Notes</p>
                            <p className="ms-notes">{this.props.ra.notes}</p>
                        </div>
                        <div id="ms-contact">
                            <p className="ms-content-header">Contact</p>
                            <p id="ms-name">{this.props.ra.primaryContact.name}</p>
                            <p id="ms-position">{this.props.ra.primaryContact.position}</p>
                            <a href={'tel:' + this.props.ra.primaryContact.phone}>{this.props.ra.primaryContact.phone}</a>
                        </div>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <div id="ms-confirm">
                            <p className="ms-content-header">Confirmation Signature</p>
                            <p className="ms-notes">Get a confirmation signature and printed name from 
                            {this.props.ra.primaryContact.name} at the non profit after you drop-off food items at the destination.</p>
                            {/* TODO: Signature */}
                            <input name="signature" className="ms-signature-delivery" type="text" placeholder="Sign Here" required/>
                            <input name="print" className="ms-input-delivery" type="text" placeholder="Print Name" required/>
                        </div>
                        <input type="submit" value="Next" id="ms-next-btn"/> 
                    </form>
                </div>
                {this.state.submitPressed &&
                    <MobileConfirm 
                        deliveredInfo={this.state.deliveredInfo}
                        da={this.props.da}
                        ra={this.props.ra}
                        dbRef={this.props.dbRef}
                        deliveryObj={this.props.deliveryObj}/>
                }
            </div>
        );
    }
}

export default MobileDelivery;