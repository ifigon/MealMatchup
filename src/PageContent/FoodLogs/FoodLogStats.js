import React, { Component } from 'react';
import './FoodLogStats.css';

class FoodLogStats extends Component{
    render() {
        return(
            <div className="food-log-margin">
                <div className="food-history">
                    <div className="food-log-header"><span>23</span> Total Pounds Donated</div>
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
                    {/* Test Data */}
                    <div>
                        <div className="food-name">White Bread</div>
                        <div className="food-quantity">1 lb.</div>
                    </div>
                    <div>
                        <div className="food-name">Eggs</div>
                        <div className="food-quantity">5 lb.</div>
                    </div>
                    <div>
                        <div className="food-name">Sugar</div>
                        <div className="food-quantity">3 lb.</div>
                    </div>
                    <div>
                        <div className="food-name">Lettuce</div>
                        <div className="food-quantity">5 lb.</div>
                    </div>
                    <div>
                        <div className="food-name">Sandwiches</div>
                        <div className="food-quantity">9 lb.</div>
                    </div>
                </div>
            </div>);
    }
}

export default FoodLogStats;