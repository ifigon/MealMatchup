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
        const food = this.props.foods.map((food, i) => {
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
                    {this.props.date} {this.props.time}
                </div>
                <div className="content-wrapper">
                    <div className="pickup-wrapper">
                        <div className="pickup-details">
                            <h2 className="emergency-info">Dining Hall</h2>
                            <h3 className="emergency-info">
                                {this.props.receivingAgency}
                            </h3>
                            <p className="emergency-info contact">
                                {this.props.contact}
                                <br />
                                {this.props.phone}
                                <br />
                                {this.props.email}
                            </p>
                        </div>

                        {/*To do: pass in coordinates*/}
                        <div className="map">
                            <Map className="map" />
                        </div>
                    </div>
                    <div className="donation-wrapper">
                        <h2 className="emergency-info">Donation Description</h2>
                        <div className="weight">
                            Total Weight: {this.props.weight}
                        </div>
                        <ol>{food}</ol>
                        <br className="br" />
                        <h2 className="emergency-info">Notes for Pickup</h2>
                        <p className="emergency-info">{this.props.notes}</p>

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
            </div>
        );
    }
}
export default EmergencyDeliveryRequest1;
