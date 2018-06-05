import React, { Component } from 'react';
import FoodItem from './FoodItem';

class EmergencyPickupForm extends Component {
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
                                {this.props.errors[error]}
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
                                onChange={this.props.handleChange.bind(this, 'Date')}
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
                                onChange={this.props.handleChange.bind(
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
                                onChange={this.props.handleChange.bind(
                                    this,
                                    'endTime'
                                )}
                                required
                            />
                        </span>
                    </span>

                    <p id="form-heading">Food Items</p>
                    <div id="food-items">
                        {this.props.foodRows.map((foodItem, i) => {
                            return (
                                <FoodItem
                                    key={i}
                                    addFood={this.props.addFood.bind(this)}
                                    active={
                                        i === this.props.foodRows.length - 1
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
