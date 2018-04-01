import React from 'react';
import './MobileDelivery.css';
// import { RequestRepeatType, RequestDurationType } from '../../Enums.js';

class MobileDelivery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pickup: {
                date: '3/5', // only need month and day
                startTime: '12:00',
                endTime: '4:00',
                deliverers: [
                    {
                        name: 'Joyce Huang',
                        org: 'Green Greeks',
                        phone: '206-324-1211'
                    },
                    {
                        name: 'Billy Bob',
                        org: 'Green Greeks',
                        phone: '243-255-4444'
                    }
                ],
                daName: 'Local Point',
                daManager: 'Phil Fill',
                daPhone: '999-999-9999',
                raName: 'Seattle Union Gospel Mission',
                raManager: 'Andy Dickinson',
                raPhone: '344-123-9457'
            }
        }; 
    }
    componentDidMount(){
        console.log(this.state.pickup);
    }
    render() {
        return (
            <div className="mobile-delivery">
                <div className="mobile-header">
                    <p>Schedule | <span id="mobile-header-pickup">Pick-up</span></p>
                </div>
                <div className="mobile-start">
                    <div className="mobile-card-line"></div>
                    <div className="mobile-agenda">
                        <p className="mobile-today">Today's Agenda</p>
                        <p className="mobile-today" id="mobile-day">{this.state.pickup.date}</p>
                    </div>
                    <div className="mobile-time">
                        <span className="dot"></span>
                        <p id="mobile-time">{this.state.pickup.startTime} &ndash; {this.state.pickup.endTime}</p>
                    </div>
                    <p id="mobile-request">Pickup Requested</p>
                    <p className="mobile-content-header">Student Deliverers</p>
                    <div className="mobile-deliverers">
                        {
                            // loop through deliverers
                            this.state.pickup.deliverers.map((deliverer, i) => {
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
                            <p id="mobile-name">{this.state.pickup.daName}</p>
                            <p id="mobile-org">{this.state.pickup.daManager}</p>
                            <a href={'tel:' + this.state.pickup.daPhone}>{this.state.pickup.daPhone}</a>
                        </div>
                        <div id="mobile-ra">
                            <p className="mobile-content-header">Deliver To</p>
                            <p id="mobile-name">{this.state.pickup.raName}</p>
                            <p id="mobile-org">{this.state.pickup.raManager}</p>
                            <a href={'tel:' + this.state.pickup.raPhone}>{this.state.pickup.raPhone}</a>
                        </div>
                    </div>
                    
                    <input type="submit" value="Start" id="start-delivery-btn"/> 
                </div>
            </div>
        );
    }
}

export default MobileDelivery;