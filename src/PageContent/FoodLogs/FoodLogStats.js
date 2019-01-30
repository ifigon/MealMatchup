import React, { Component } from 'react';
import './FoodLogStats.css';

class FoodLogStats extends Component{
    constructor(props) {
        super(props);
        this.state = {
            foodAggregate: {},
        }
    }

    componentDidMount() {
        const deliveries = this.aggregateDonationStats();
    }

    aggregateDonationStats() {
        let allFoods = {};
        console.log(this.props.deliveries);

        this.props.deliveries.forEach((delivery) => {
            if(delivery.description) {
                let items = delivery.description.foodItems;
                items.forEach((item) => {
                    let food = item.food.toLowerCase();
                    let quantity = parseInt(item.quantity);
                    allFoods[food] = allFoods.hasOwnProperty(food) ? 
                            allFoods[food] + quantity : quantity;
                });
            }
        })
        this.setState({foodAggregate : allFoods})
    }

    render() {
        let totalQuantity = 0;
        let foodData = Object.keys(this.state.foodAggregate).map((food) => {
            totalQuantity += this.state.foodAggregate[food];
            return <div>
                <div className="food-name">{food}</div>
                <div className="food-quantity">{this.state.foodAggregate[food]} lbs.</div>
            </div>
        });

        return(
            <div className="food-log-margin">
                <div className="food-history">
                    <div className="food-log-header"><span>{totalQuantity}</span> Total Pounds Donated</div>
                    <div className="food-log-time-selector">
                        <button className="log-button-active">1 Week</button>
                        <button>1 Month</button>
                        <button>2 Months</button>
                        <button>6 Months</button>
                        <button>1 Year</button>
                        <button>All Time</button>
                    </div>
                </div>
                <div className="food-data">
                    {foodData}
                </div>
            </div>);
    }
}

export default FoodLogStats;