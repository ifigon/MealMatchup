import React, { Component } from 'react';
import truck from '../../../icons/red_truck.svg';
import Map from '../../../Map/Map.js';

class EmergencyDeliveryRequest1 extends Component {
    render() {
        let date = '11/15/2017';
        let time = '2:00pm-4:00pm';
        let dining_hall= 'Local Point';
        let contact = 'Andrea Benson';
        let phone = '206-487-2859';
        let email = 'bandrea247@gmail.com';
        let weight = '50 lbs';

        let foods = [{'food':'Baked Beans', 'amount':'15 lbs'}, {'food':'Coleslaw', 'amount':'20-25 lbs'}, {'food':'Corn', 'amount':'6 lbs'}, {'food':'Mashed Potatoes','amount':'8 lbs'}, {'food':'Veggie Burger Patties', 'amount' : '4 lbs'}, {'food':'Bread', 'amount': '40 loaves'}];
        const food = foods.map((food, i) => {
            return (
                <li className="food"> {food['food']} {food['amount']}</li>
            );
        });
        return (
            <div className="wrapper">
                <img className="icon red" src={truck} alt="icon" /><h1>Emergency Pickup Requested</h1>
                <div className="time">{date} {time}</div>
                <div className="pickup-details">
                    <h2 className="emergency-info">Dining Hall</h2>
                    <h3 className="emergency-info">{dining_hall}</h3>
                    <p className="emergency-info">
                        {contact}<br/>
                        {phone}<br/>
                        {email}
                    </p>
                </div>

                {/*To do: pass in coordinates*/}
                <div className="map">
                    <Map className="map"></Map>
                </div>

                <h2 className="emergency-info">Donation Description</h2>
                <div className="weight">Total Weight: {weight}</div>
                {food}

                <h2 className="emergency-info">Notes for Pickup</h2>
                <p>Use the underground parking garage upon entrance. Key card access required after 3:00pm.  </p>

                <div className="buttons">
                    <button onClick={this.props.nextStep} className="claim" type="button">Claim</button> <button onClick={this.props.close} className="reject" type="button">Reject</button>
                </div>
            </div>
        );
    }
}
export default EmergencyDeliveryRequest1;