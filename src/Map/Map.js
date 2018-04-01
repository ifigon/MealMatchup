import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import Geocode from 'react-geocode';
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
        // Convert address to Lat, Long
        Geocode.fromAddress(this.props.address).then(
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
            marginRight: this.props.marginRight
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
                            text={'Kreyser Avrora'}
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