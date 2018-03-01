import React, { Component } from 'react';
import GoogleMap from 'google-map-react';

class Map extends Component{
    constructor(props) {
        super(props);
      }
    
    static defaultProps = {
        center: [47.60, -122.33],
        zoom: 13
    }

    render() {
        const style = {
            height: '150px',
            width: '350px',
            marginRight: '30px'
        }
        return (
            <div className='google-map' style={style}>
                <GoogleMap
                    center={ this.props.center }
                    zoom={ this.props.zoom }>
                </GoogleMap>
            </div>
        );
    }
}

export default Map;