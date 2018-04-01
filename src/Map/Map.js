import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import Geocode from 'react-geocode';
import './Marker.css';

const Marker = ({ text }) => (
    <div>
        <div className="pin bounce"></div>
        <div className='pulse'></div>
        <p>{text}</p>
    </div>
    
);

class Map extends Component{
    constructor(props){
        super(props);
        
        this.state  = {
            center: {},
            zoom: 15
        };
        var address = '3411 167th pl sw lynnwood wa 98037';

        // Convert address to Lat, Long
        Geocode.fromAddress(address).then(
            response => {
                this.setState({
                    center: response.results[0].geometry.location
                });
                
            },
            error => {
                return <div>Unable to load map</div>;
            }
        );
    }
    componentDidMount(){
        console.log(this.state.center);
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
                    <Marker
                        latLng={this.state.center}
                        lat={this.state.center.lat}
                        lng={this.state.center.long}
                        text={'Kreyser Avrora'}
                    />
                </GoogleMap>
            </div>
        );
    }
}

export default Map;