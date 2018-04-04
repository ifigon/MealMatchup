import React from 'react';
import './Mobile.css';

class MobileComplete extends React.Component {
    render() {
        return (
            <div className="mobile-delivery"> 
                <div className="mobile-header">
                    <p>Schedule | <span id="mobile-header-pickup">Pick-up</span></p>
                </div>
                <div className="mobile-card">
                    <div className="mobile-card-line"></div>
                    <div className="mobile-agenda">
                        <p className="mobile-today">Today's Agenda</p>
                        <p className="mobile-today" id="mobile-day">{this.props.pickup.date}</p>
                    </div>
                    <div className="mobile-time">
                        <span className="dot"></span>
                        {/* TODO: AM/PM */}
                        <p id="mobile-time">{this.props.pickup.startTime} &ndash; {this.props.pickup.endTime}</p>
                    </div>
                    <p id="mobile-request">Pickup Requested</p>
                    <p className="mobile-content-header">Student Deliverers</p>
                    <div className="mobile-deliverers">
                        {
                            // loop through deliverers
                            this.props.pickup.deliverers.map((deliverer, i) => {
                                return (
                                    <div className="mobile-student-info" id={i} key={i}>
                                        <p id="mobile-name">{deliverer.name}</p>
                                        <p id="mobile-org">{deliverer.org}</p>
                                        <a href={'tel:' + deliverer.phone}>{deliverer.phone}</a>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="mobile-to-from">
                        <div id="mobile-da">
                            <p className="mobile-content-header">Pick Up From</p>
                            <p id="mobile-name">{this.props.pickup.daName}</p>
                            <p id="mobile-org">{this.props.pickup.daContact}</p>
                            <a href={'tel:' + this.props.pickup.daPhone}>{this.props.pickup.daPhone}</a>
                        </div>
                        <div id="mobile-ra">
                            <p className="mobile-content-header">Deliver To</p>
                            <p id="mobile-name">{this.props.pickup.raName}</p>
                            <p id="mobile-org">{this.props.pickup.raContact}</p>
                            <a href={'tel:' + this.props.pickup.raPhone}>{this.props.pickup.raPhone}</a>
                        </div>
                    </div>
                    
                    <input type="submit" value="Start" id="start-delivery-btn" /> 
                </div>
            </div>
        );
    }
}

export default MobileComplete;