import React, { Component } from 'react';
import truck from '../../../icons/red_truck.svg';

class EmergencyDeliveryRequest3 extends Component {
    render() {
        let location = 'Local Point Dining Hall';
        let date = '11/15/2017';
        let time = '2:00pm-4:00pm';
        let weight = ' 50 lbs';
        return (
            <div className="wrapper">
                <img className="icon red" src={truck} alt="icon" /><h1>Emergency pick up scheduled!</h1>
                <p>{location}<br />
                    Date: {date} {time}<br />
                    Total weight of donation: {weight}
                </p>

                <div className="buttons">
                    <button onClick={this.props.close} className="claim end" type="button">View on calendar</button>
                </div>
            </div >
        );
    }
}
export default EmergencyDeliveryRequest3;