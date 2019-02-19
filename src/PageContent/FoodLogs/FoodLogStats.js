import React, { Component } from 'react';
import './FoodLogStats.css';

class FoodLogStats extends Component{
    constructor(props) {
        super(props);
        this.state = {
            foodAggregate: {},
            weeks: 5200,
        }
    }

    componentDidMount() {
        let allFoods = {};
        this.props.deliveries.forEach((delivery) => {
            if(delivery.description) {
                let items = delivery.description.foodItems;
                items.forEach((item) => {
                    let food = item.food.toLowerCase();
                    let quantity = parseInt(item.quantity, 10);
                    allFoods[food] = allFoods.hasOwnProperty(food) ? 
                            allFoods[food] + quantity : quantity;
                });
            }
        })
        this.setState({foodAggregate : allFoods})    
    }

    filterTime(weeksToFilter) {
        this.setState({weeks: weeksToFilter})
    }

    render() {
        let totalQuantity = 0;
        let foodData = Object.keys(this.state.foodAggregate).map((food, index) => {
            totalQuantity += this.state.foodAggregate[food];
            return( <div key={index}>
                        <div className="food-name">{food}</div>
                        <div className="food-quantity">{this.state.foodAggregate[food]} lbs.</div>
                    </div>);
        });

        let filterTimeButtons = [

        ]

        return(
            <div className="food-log-margin">
                <div className="food-history">
                    <div className="food-log-header"><span>{totalQuantity}</span> Total Pounds Donated</div>
                    <div className="food-log-time-selector">
                        <button className={this.state.weeks === 1 ? "log-button-active" : ""} onClick={() => this.filterTime(1)}>1 Week</button>
                        <button className={this.state.weeks === 4 ? "log-button-active" : ""} onClick={() => this.filterTime(4)}>1 Month</button>
                        <button className={this.state.weeks === 8 ? "log-button-active" : ""} onClick={() => this.filterTime(8)}>2 Months</button>
                        <button className={this.state.weeks === 24 ? "log-button-active" : ""} onClick={() => this.filterTime(24)}>6 Months</button>
                        <button className={this.state.weeks === 52 ? "log-button-active" : ""} onClick={() => this.filterTime(52)}>1 Year</button>
                        <button className={this.state.weeks === 5200 ? "log-button-active" : ""} onClick={() => this.filterTime(5200)}>All Time</button>
                    </div>
                </div>
                <div className="food-data">
                    {foodData}
                </div>
            </div>);
    }
}

export default FoodLogStats;