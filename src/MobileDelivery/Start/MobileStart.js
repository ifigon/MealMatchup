import React from 'react';
import Map from '../../Map/Map';
import Geocode from '../../react-geocode';
import fDegrees from '../../icons/fahrenheit.svg';
import '../MobileDelivery.css';
import './MobileStart.css';

class MobileStart extends React.Component {
    constructor(props){
        super(props);
        
        this.state  = {
            lat: '',
            long: '',
            fullAddress: Object.keys(this.props.pickup.address).map(key => this.props.pickup.address[key]).join(' ')
        };
    }

    componentDidMount(){
        // Convert address to Lat, Long
        Geocode.fromAddress(this.state.fullAddress).then(
            response => {
                this.setState({
                    lat: response.results[0].geometry.location.lat,
                    long: response.results[0].geometry.location.lng
                });
            }
        );
    }

    render() {
        return (
            <div className="mobile-delivery">
                <div className="mobile-header">
                    <p><span id="ms-highlight">Pickup</span> | <span id="mobile-header-pickup">Deliver</span> | <span id="mobile-header-pickup">Complete</span></p>
                </div>
                <div className="mobile-card">
                    <div className="mobile-card-line"></div>
                    <p className="ms-header">{this.props.pickup.daName}</p>
                    <p className="ms-pickup-time">Pickup between {this.props.pickup.startTime} - {this.props.pickup.endTime} pm</p>
                    <Map marginLeft="20px" height="90px" width="90%" address={this.props.pickup.address}/>
                    {/* Prompts user to open maps on their phone */}
                    <a id="ms-address" href={'geo:' + this.state.lat + ',' + this.state.long} target="_blank">{this.state.fullAddress}</a>
                    <div className="ms-content">
                        <div id="ms-notes">
                            <p className="ms-content-header">Notes</p>
                            <p className="ms-notes">{this.props.pickup.notes}</p>
                        </div>
                        <div id="ms-contact">
                            <p className="ms-content-header">Contact</p>
                            <p id="ms-name">{this.props.pickup.daContact}</p>
                            <p id="ms-position">{this.props.pickup.daPosition}</p>
                            <a href={'tel:' + this.props.pickup.daPhone}>{this.props.pickup.daPhone}</a>
                        </div>
                    </div>
                    <div className="ms-temp">
                        <p className="ms-content-header">Temperature Directions</p>
                        <p className="ms-notes">Take the initial temperature of the freezer where the food being delivered is stored before deliviering.</p>
                        <input className="ms-input" type="number" placeholder="Freezer Temperature"/>
                    </div>
                    <div id="ms-confirm">
                        <p className="ms-content-header">Confirmation Signature</p>
                        <p className="ms-notes">Get a confirmation signature from {this.props.pickup.daContact} at {this.props.pickup.raName} after you drop-off food items at the destination.</p>
                        {/* TODO: Signature */}
                        <input className="ms-signature" type="text" placeholder="Signature"/>
                    </div>
                    
                </div>
                <input type="submit" value="Next" id="ms-next-btn"/> 
            </div>
        );
    }
}

export default MobileStart;