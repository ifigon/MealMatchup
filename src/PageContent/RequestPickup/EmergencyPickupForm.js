import React, { Component } from 'react';
import FoodItem from './FoodItem';

class EmergencyPickupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            memberList: [],
            delivererGroups: [],
            receivingAgencies: [],
            fields: {},
            errors: {},
            showPopup: false,
            request: {},
            primaryContact: {},
            raRequested: null,
            dgRequested: null,
            submissionError: null,
            foodRows: [{ foodName: '', foodWeight: '' }]
        };
    }

    handleChange(field, e) {
        var val = e.target.value;
        this.setState(prevState => {
            let fields = prevState.fields;
            fields[field] = val;
            return { fields: fields };
        });
    }

    addFood(name, weight, event) {
        if (name !== '' && weight !== '') {
            var newElement = { foodName: name, foodWeight: weight };
            this.setState({ foodRows: [...this.state.foodRows, newElement] });
        }
    }

    render() {
        return (
            <form
                id={this.formId}
                onSubmit={this.props.createRequest.bind(this)}
            >
                <div className="info">
                    <p id="form-heading">
                        Schedule <span className="red">Emergency</span> Pickup
                    </p>
                    {Object.keys(this.props.errors).map((error, i) => {
                        return (
                            <p className="error" key={i}>
                                {this.state.errors[error]}
                            </p>
                        );
                    })}
                    <span className="flex">
                        <span className="grid">
                            <label>
                                Date <span className="red">*</span>
                            </label>
                            <br />
                            <input
                                type="date"
                                name="Date"
                                onChange={this.handleChange.bind(this, 'Date')}
                                required
                            />
                            <br />
                        </span>
                        <span className="grid">
                            <label>
                                Primary Contact <span className="red">*</span>
                            </label>
                            <br />
                            <select
                                name="primaryContact"
                                defaultValue=""
                                required
                            >
                                <option value="" disabled>
                                    Select
                                </option>
                                {this.props.memberList.map((member, i) => {
                                    return (
                                        <option key={i} value={i}>
                                            {member.name}
                                        </option>
                                    );
                                })}
                            </select>
                            <br />
                        </span>
                    </span>
                    <span className="flex">
                        <span className="grid">
                            <label>
                                Start Time <span className="red">*</span>
                            </label>
                            <br />
                            <input
                                type="time"
                                name="startTime"
                                onChange={this.handleChange.bind(
                                    this,
                                    'startTime'
                                )}
                                required
                            />
                        </span>
                        <span className="grid">
                            <label>
                                End Time <span className="red">*</span>
                            </label>
                            <br />
                            <input
                                type="time"
                                name="endTime"
                                onChange={this.handleChange.bind(
                                    this,
                                    'endTime'
                                )}
                                required
                            />
                        </span>
                    </span>
                    <p id="form-heading">Food Items</p>

                    <div id="food-items">
                        {this.state.foodRows.map((foodItem, i) => {
                            return (
                                <FoodItem
                                    key={i}
                                    foodName={foodItem.foodName}
                                    foodWeight={foodItem.foodWeight}
                                    addFood={this.addFood.bind(this)}
                                    active={
                                        i === this.state.foodRows.length - 1
                                    }
                                />
                            );
                        })}
                    </div>

                    <span className="grid">
                        <p id="form-heading">Notes for Pickup</p>
                        <textarea
                            name="notes"
                            placeholder="Ex: Use the underground parking garage upon entrance. Key card access required after 3:00pm."
                        />
                    </span>
                    <div className="buttons-form">
                        <input type="submit" value="Done" />
                        <input type="reset" value="Cancel" />
                    </div>
                </div>
            </form>
        );
    }
}
export default EmergencyPickupForm;
