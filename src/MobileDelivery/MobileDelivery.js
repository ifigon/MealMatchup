import React from 'react';
import './MobileDelivery.css';
// import { RequestRepeatType, RequestDurationType } from '../../Enums.js';

class MobileDelivery extends React.Component {
    render() {
        return (
            <div className="mobile-delivery">
                <div className="mobile-header">
                    Schedule | Pick-up
                </div>
                <div className="mobile-start">
                    <div className="mobile-card-line">
                    </div>
                    <p>Today's Agenda</p>
                    <p id="mobile-time">12:00 pm - 2:00 pm</p>
                    <p id="mobile-request">Pickup Requested</p>

                    <p id="mobile-deliverers">Student Deliverers</p>
                    <div className="mobile-deliverers">
                        <div className="mobile-student-info">
                            <p id="name">Blake Johnson</p>
                            <p id="student-group">Green Greeks</p>
                            <p id="phone">206-432-1321</p>
                        </div>
                        <div className="mobile-student-info">
                            <p id="name">Blake Johnson</p>
                            <p id="student-group">Green Greeks</p>
                            <p id="phone">206-432-1321</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MobileDelivery;