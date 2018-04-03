import React from 'react';
import Map from '../Map/Map';
import Geocode from '../react-geocode';
import './Mobile.css';

class MobileDelivery extends React.Component {
    constructor(props){
        super(props);
        
        this.state  = {
            lat: '',
            long: '',
            fullAddress: ''
        };
    }

    componentDidMount(){
        // concatenate address in a specific order
        var keyOrder = ['street1', 'street2', 'city', 'state', 'zipcode'];
        var address = keyOrder.map(key => this.props.pickup.raAddress[key]).join(' ');
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
                    <p className="ms-header">{this.props.pickup.raName}</p>
                    <p className="ms-pickup-time">Deliver by {this.props.pickup.startTime} - {this.props.pickup.endTime} pm</p>
                    <Map marginLeft="20px" height="90px" width="90%" address={this.props.pickup.raAddress}/>
                    {/* Prompts user to open maps on their phone */}
                    <a id="ms-address" href={'geo:' + this.state.lat + ',' + this.state.long} target="_blank">{this.state.fullAddress}</a>
                    <div className="ms-content">
                        <div id="ms-notes">
                            <p className="ms-content-header">Notes</p>
                            <p className="ms-notes">{this.props.pickup.raNotes}</p>
                        </div>
                        <div id="ms-contact">
                            <p className="ms-content-header">Contact</p>
                            <p id="ms-name">{this.props.pickup.raContact}</p>
                            <p id="ms-position">{this.props.pickup.raPosition}</p>
                            <a href={'tel:' + this.props.pickup.raPhone}>{this.props.pickup.raPhone}</a>
                        </div>
                    </div>
                    <div id="ms-confirm">
                        <p className="ms-content-header">Confirmation Signature</p>
                        <p className="ms-notes">Get a confirmation signature and printed name from {this.props.pickup.raContact} at the non profit after you drop-off food items at the destination.</p>
                        {/* TODO: Signature */}
                        <input className="ms-signature-deliver" type="text" placeholder="Sign Here"/>
                        <input className="ms-input" type="text" placeholder="Print Name"/>
                    </div>
                    
                </div>
                <input type="submit" value="Next" id="ms-next-btn"/> 
            </div>
        );
    }
}

export default MobileDelivery;