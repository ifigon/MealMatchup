import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import Geocode from '../react-geocode';
import './Marker.css';
import { isMobile } from '../utils/Utils';

const GoogleMap_API_KEY = 'AIzaSyBhUNXr9HGzNW1k0Va7EGeyFsJqUSlkwCU';

const Marker = ({ text }) => (
    <div>
        <div className="pin bounce"></div>
        <div className='pulse'></div>
    </div>
);

class Map extends Component{
    constructor(props){
        super(props);
        
        this.state  = {
            center: {lat: 0, lng: 0}, // initial marker state
            zoom: 15,
            validAddress: true,
            address: '',
        };
    }

    componentDidMount(){
        this.updateMapInfo(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.updateMapInfo(nextProps); 
        }
    }

    updateMapInfo(props) {
        // concatenate address in a specific order
        var keyOrder = ['street1', 'street2', 'city', 'state', 'zipcode'];
        var address = keyOrder.map(key => props.address[key]).join(' ');

        // Convert address to Lat, Long
        Geocode.fromAddress(address, GoogleMap_API_KEY).then(

            response => {
                this.setState({
                    center: response.results[0].geometry.location,
                    address: address,
                });
            },
            error => {
                this.setState((prevState) => {
                    return {validAddress: !prevState.validAddress};
                });
            }
        );
    }

    render() {
        const style = {
            height: this.props.height,
            width: this.props.width,
            marginLeft: this.props.marginLeft,
            marginRight: this.props.marginRight,
            marginTop: this.props.marginTop,
            marginBottom: this.props.marginBottom
        };
        return (
            <div className='google-map' style={style}>
                {this.state.validAddress ?
                    <GoogleMap
                        bootstrapURLKeys={{
                            key: GoogleMap_API_KEY,
                        }}
                        center={ this.state.center }
                        zoom={ this.state.zoom }>
                        <Marker
                            latLng={this.state.center}
                            lat={this.state.center.lat}
                            lng={this.state.center.lng}
                        />
                    </GoogleMap>
                    :
                    <div className="error">Unable to load map</div>
                }
                {/* Prompts user to open maps on their phone or shows link to Google Maps */}
                {
                    isMobile() ?
                        <a id="ms-address" href={'http://maps.apple.com/?q=' + this.state.center.lat + ',' + this.state.center.lng} target="_blank">{this.state.address}</a>
                        :
                        <a id="ms-address-desktop" href={'http://maps.google.com/maps?saddr=' + this.state.center.lat + ',' + this.state.center.lng} target="_blank">{this.state.address}</a>
                }
            </div>
        );
    }
}

export default Map;