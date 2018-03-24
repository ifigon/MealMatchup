import React, { Component } from 'react';
import truck from '../../../icons/red_truck.svg';
import Map from '../../../Map/Map.js';

class EmergencyDeliveryRequest1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 'shelter'
        };
    }

    render() {
        let date = '11/15/2017';
        let time = '2:00pm-4:00pm';
        let dining_hall = 'Local Point';
        let contact = 'Andrea Benson';
        let phone = '206-487-2859';
        let email = 'bandrea247@gmail.com';
        let weight = '50 lbs';

        let notes =
            ' Use the underground parking garage upon entrance. Key card access required after 3:00pm.';

        let foods = [
            { food: 'Baked Beans', amount: '15 lbs' },
            { food: 'Coleslaw', amount: '20-25 lbs' },
            { food: 'Corn', amount: '6 lbs' },
            { food: 'Mashed Potatoes', amount: '8 lbs' },
            { food: 'Veggie Burger Patties', amount: '4 lbs' },
            { food: 'Bread', amount: '40 loaves' }
        ];
        const food = foods.map((food, i) => {
            return (
                <li className="food">
                    {' '}
                    {food['food']} {food['amount']}
                </li>
            );
        });
        return (
            <div className="wrapper">
                <img className="icon red" src={truck} alt="icon" />
                <h1>Emergency Pickup Requested</h1>
                <div className="time">
                    {date} {time}
                </div>
                {this.state.user === 'shelter' ? (
                    <div className="content-wrapper">
                        <div className="pickup-wrapper">
                            <div className="pickup-details">
                                <h2 className="emergency-info">Dining Hall</h2>
                                <h3 className="emergency-info">
                                    {dining_hall}
                                </h3>
                                <p className="emergency-info contact">
                                    {contact}
                                    <br />
                                    {phone}
                                    <br />
                                    {email}
                                </p>
                            </div>

                            {/*To do: pass in coordinates*/}
                            <div className="map">
                                <Map className="map" />
                            </div>
                        </div>
                        <div className="donation-wrapper">
                            <h2 className="emergency-info">
                                Donation Description
                            </h2>
                            <div className="weight">Total Weight: {weight}</div>
                            <ol>{food}</ol>
                            <br className="br" />
                            <h2 className="emergency-info">Notes for Pickup</h2>
                            <p className="emergency-info">{notes}</p>

                            <div className="buttons">
                                <button
                                    onClick={this.props.nextStep}
                                    className="claim"
                                    type="button"
                                >
                                    Claim
                                </button>{' '}
                                <button
                                    onClick={this.props.close}
                                    className="reject"
                                    type="button"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                ) : this.state.user === 'donating-agency' ? (
                    <div className="content-wrapper">
                        <div className="donation-wrapper">
                            <h2 className="emergency-info">
                                Donation Description
                            </h2>
                            <div className="weight">Total Weight: {weight}</div>
                            <ol>{food}</ol>
                            <h2 className="emergency-info">Notes for Pickup</h2>
                            <p className="emergency-info">
                                Use the underground parking garage upon
                                entrance. Key card access required after 3:00pm.{' '}
                            </p>
                        </div>
                        <div className="pickup-wrapper">
                            <div className="pickup-details">
                                <h2 className="emergency-info">Dining Hall</h2>
                                <h3 className="emergency-info">
                                    {dining_hall}
                                </h3>
                                <p className="emergency-info contact">
                                    {contact}
                                    <br />
                                    {phone}
                                    <br />
                                    {email}
                                </p>
                            </div>

                            {/*To do: pass in coordinates*/}
                            <div className="map">
                                <Map className="map" />
                            </div>
                        </div>
                        <div className="buttons">
                            <button
                                onClick={this.props.nextStep}
                                className="claim"
                                type="button"
                            >
                                Confirm
                            </button>{' '}
                            <button
                                onClick={this.props.close}
                                className="reject"
                                type="button"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}
export default EmergencyDeliveryRequest1;
