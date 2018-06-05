import React, {
    Component
} from 'react';
import add from '../../icons/plus-button-blue.svg';
import {
    FoodUnit
} from '../../Enums';
import './Toggle.css';

class FoodItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodName: '',
            foodWeight: '',
            foodWeightLabel: ''
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

    changeWeightLabel(e) {
        this.setState({
            foodWeightLabel: e.target.value
        });
    }

    render() {
        return (
            <div className="flex">
                <span className="grid">
                    <label>Name</label>
                    <br />
                    <input
                        name="foodName"
                        defaultValue=""
                        required={!this.props.active}
                        onChange={this.changeName.bind(this)}
                    />
                </span>
                <span className="grid">
                    <label>Weight</label>
                    <br />
                    <div>
                        <input
                            name="foodWeight"
                            onChange={this.changeWeightLabel.bind(this)}
                            type="number"
                            min="0"
                            required={!this.props.active}
                        />
                    </div>
                </span>
                <span className="grid">
                    <label>Unit</label>
                    <br />
                    <select
                        className="food-unit"
                        name="foodWeightLabel"
                        onChange={this.changeWeight.bind(this)}
                        defaultValue=""
                        required={!this.props.active}
                    >
                        <option value="" disabled>
                            Select
                        </option>
                        {Object.keys(FoodUnit).map((type, i) => {
                            return (
                                <option key={i} value={type} required={this.props.active}>
                                    {type.toLowerCase()}
                                </option>
                            );
                        })}
                    </select>
                </span>
                {this.props.active && (
                    <img
                        className="add-food-item"
                        src={add}
                        alt="add item"
                        onClick={() => {
                            this.props.addFood(
                                this.state.foodName,
                                this.state.foodWeight,
                                this.state.foodWeightLabel
                            );
                        }}
                    />
                )}
            </div>
        );
    }
}
export default FoodItem;