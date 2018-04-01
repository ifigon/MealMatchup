import React from 'react';
import '../MobileDelivery.css';
import './MobileStart.css';

class MobileStart extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
    }
    render() {
        return (
            <div className="mobile-delivery">
                <div className="mobile-header">
                    <p>Pickup | <span id="mobile-header-pickup">Deliver</span> | <span id="mobile-header-pickup">Complete</span></p>
                </div>
                <div className="mobile-card">
                    <div className="mobile-card-line"></div>
                    <input type="submit" value="Start" id="start-delivery-btn"/> 
                </div>
            </div>
        );
    }
}

export default MobileStart;