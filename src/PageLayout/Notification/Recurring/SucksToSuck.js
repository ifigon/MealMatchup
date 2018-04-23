import React, { Component } from 'react';
import truck from '../../../icons/grey_truck.svg';
import RequestTime from '../Details/RequestTime';
import { NotificationMap } from '../NotificationMap';

class SucksToSuck extends Component {
    render() {
        return (
            <div className="modal-wrapper">
                <img className="icon" id="disclaimer-icon" src={truck} alt="icon" />
                <div className="modal-left-align">
                    <h1> Unable to claim request</h1>
                    <p>Unfortunately, another group has already claimed this request.</p>
                    <div className="popup-buttons">
                        <button onClick={this.props.close} className="cancel" type="button">OK</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default SucksToSuck;