import React, { Component } from 'react';
import './FoodLogStats.css';
import moment from 'moment';

class FoodLogStats extends Component{
    constructor(props) {
        super(props);
        this.allTime = 5200;  // arbitrary constant to represent "all time" filter, filters for last 5200 weeks/ 100 years
        this.state = {
            foodAggregate: {},
            weeks: this.allTime,        
        }
    }

    componentDidMount() {
        this.updateFood(this.allTime);
    }

    filterTime(weeksToFilter) {
        this.setState({weeks: weeksToFilter})
        this.updateFood(weeksToFilter);
    }

    updateFood(weeksToFilter) {
        let allFoods = {};
        let timeCutOff = moment().subtract(weeksToFilter, 'weeks').valueOf();

        this.props.deliveries.forEach((delivery) => {
            if(delivery.description && delivery.endTimestamp > timeCutOff) {
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

    render() {
        let totalQuantity = 0;
        let foodData = Object.keys(this.state.foodAggregate).map((food, index) => {
            totalQuantity += this.state.foodAggregate[food];
            return( <div key={index}>
                        <div className="food-name">{food}</div>
                        <div className="food-quantity">{this.state.foodAggregate[food]} lbs.</div>
                    </div>);
        });

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
                        <button className={this.state.weeks === 5200 ? "log-button-active" : ""} onClick={() => this.filterTime(this.allTime)}>All Time</button>
                    </div>
                </div>
                <div className="food-data">
                    {foodData}
                </div>
            </div>);
    }
}

export default FoodLogStats;