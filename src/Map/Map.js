import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import Geocode from '../react-geocode';
import './Marker.css';

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
            center: {},
            zoom: 15,
            validAddress: true
        };
    }

    componentDidMount(){
        // concatenate address in a specific order
        var keyOrder = ['street1', 'street2', 'city', 'state', 'zipcode'];
        var address = keyOrder.map(key => this.props.address[key]).join(' ');

        // Convert address to Lat, Long
        Geocode.fromAddress(address).then(
            response => {
                this.setState({
                    center: response.results[0].geometry.location
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
                        center={ this.state.center }
                        zoom={ this.state.zoom }>
                        <Marker
                            latLng={this.state.center}
                            lat={this.state.center.lat}
                            lng={this.state.center.long}
                        />
                    </GoogleMap>
                    :
                    <div className="error">Unable to load map</div>
                }
            </div>
        );
    }
}

export default Map;