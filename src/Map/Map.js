import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import Geocode from 'react-geocode';
import './Marker.css';

const Marker = ({ text }) => (
    <div className="marker">
        {text}
    </div>
);

class Map extends Component{
    constructor(props){
        super(props);
        
        this.state  = {
            // Defaults to Seattle
            center: {lat:47.60, lng:-122.33},
            zoom: 13
        };
        var address = 'local point';

        // Convert address to Lat, Long
        Geocode.fromAddress(address).then(
            response => {
                this.setState({
                    center: response.results[0].geometry.location
                });
                console.log(this.state.center);
            },
            error => {
                console.error(error);
            }
        );
    }
    render() {
        const style = {
            height: '150px',
            width: '350px',
            marginRight: '30px'
        };
        return (
            <div className='google-map' style={style}>
                <GoogleMap
                    center={ this.state.center }
                    zoom={ this.state.zoom }>
                </GoogleMap>
                {/* <GoogleMap
                    defaultCenter={ this.state.center }
                    defaultZoom={ this.state.zoom }>
                />
                    <Marker
                        latLng={this.state.center}
                        lat={this.state.center.lat}
                        lng={this.state.center.lng}
                        text={'local point'}
                    />
                </GoogleMap> */}
            </div>
        );
    }
}

export default Map;