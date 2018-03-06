import React, { Component } from 'react';
import GoogleMap from 'google-map-react';

class Map extends Component{
    constructor(props){
        super(props);
        this.state  = {
            center: [47.60, -122.33],
            zoom: 13
        };
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
            </div>
        );
    }
}

export default Map;