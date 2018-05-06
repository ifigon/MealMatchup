import React, { Component } from 'react';
import add from '../../icons/plus-button-blue.svg';
import { FoodUnit } from '../../Enums';
import './Toggle.css';

class FoodItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodName: '',
            foodWeight: ''
        };
    }

    changeName(e) {
        this.setState({
            foodName: e.target.value
        });
    }

    changeWeight(e) {
        this.setState({
            foodWeight: e.target.value
        });
    }

    render() {
        return (
            <div>
                <span className="flex">
                    <span className="grid">
                        <label>Name</label>
                        <br />
                        <input
                            name="foodName"
                            defaultValue=""
                            required
                            onChange={this.changeName.bind(this)}
                        />
                    </span>
                    <div className="toggle-container">
                        <span className="grid">
                            <label>Weight</label>
                            <br />
                            <div>
                                <input
                                    name="foodWeight"
                                    placeholder={FoodUnit.LB}
                                    onChange={this.changeWeight.bind(this)}
                                    type="number"
                                    min="0"
                                    required
                                />
                            </div>
                        </span>
                        {this.props.active && (
                            <img
                                className="add-food-item"
                                src={add}
                                alt="add item"
                                onClick={() => {
                                    this.props.addFood(
                                        this.state.foodName,
                                        this.state.foodWeight
                                    );
                                }}
                            />
                        )}
                    </div>
                </span>
            </div>
        );
    }
}
export default FoodItem;
