import React, { Component } from 'react';
import moment from 'moment';
import { AccountType, FoodUnit, StringFormat } from '../../Enums';
import './Content.css';
import groceries from '../../icons/groceries.svg';
import plus from '../../icons/plus-button.svg';

class DescriptionContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            // 'waiting' is true after 'Saved' is clicked and before changes
            // from db is propagated down. While it is true, input fields are
            // disabled
            waiting: false,
            savedTimestamp: null,
            foodRows: null, // for rendering editable rows only
        };

        this.edit = this.edit.bind(this);
        this.saveFoodItems = this.saveFoodItems.bind(this);
        this.addRow = this.addRow.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // update state to reflect values properly saved if we were waiting
        // on the update and the update happened after we wrote to db.
        if (this.state.waiting && nextProps.delivery.updatedTimestamp > this.state.savedTimestamp) {
            this.setState({ waiting: false, edit: false, foodRows: null });
        }
    }

    edit() {
        const description = this.props.delivery.description;

        // copy current food items into state for editing purposes
        let foodRows = [];
        if (description && description.foodItems) {
            foodRows = description.foodItems.slice();
        }

        this.setState({
            edit: true,
            foodRows: foodRows,
        });
    }

    addRow() {
        if (!this.state.edit) {
            this.edit();
        }

        this.setState(prevState => {
            let foodRows = prevState.foodRows;
            foodRows.push({ food: '', quantity: 0, unit: '' });
            return { foodRows: foodRows };
        });
    }

    getEditDonation() {
        return this.state.foodRows.map((item, index) => {
            return (
                <div key={index} className="donation-edit-wrapper">
                    <input
                        type="text"
                        className="food"
                        defaultValue={item.food}
                        name={'food' + index}
                    />
                    <div className="weight-unit-wrapper">
                        <input
                            type="number"
                            className="weight"
                            defaultValue={item.quantity}
                            name={'quantity' + index}
                        />
                        <select
                            className="description-unit"
                            defaultValue={item.unit}
                            name={'unit' + index}
                        >
                            {Object.keys(FoodUnit).map((unit, i) => {
                                return <option key={unit}>{FoodUnit[unit]}</option>;
                            })}
                        </select>
                    </div>
                </div>
            );
        });
    }

    saveFoodItems(e) {
        e.preventDefault();

        let newFoodItems = [];
        for (let i = 0; i < this.state.foodRows.length; i++) {
            let food = e.target['food' + i].value;
            let quantity = e.target['quantity' + i].value;
            let unit = e.target['unit' + i].value;
            if (food) {
                newFoodItems.push({ food: food, quantity: quantity, unit: unit });
            }
        }

        // TODO write to db
        console.log(newFoodItems);
        // push {timestamp: name} to updatedBy


        this.setState({
            waiting: true,
            // savedTimestamp: ,
        });
    }

    render() {
        const { account, delivery } = this.props;
        const accountType = account.accountType;
        const description = delivery.description;

        let lastEdited = null;
        if (description && description.updatedBy) {
            let latest = Math.max(...Object.keys(description.updatedBy));
            lastEdited = {
                name: description.updatedBy[latest],
                time: moment(latest).format(StringFormat.DATE_SHORT + ' ' + StringFormat.TIME),
            };
        }

        let editable = (accountType === AccountType.DONATING_AGENCY_MEMBER &&
            !this.state.edit && this.props.futureEvent);

        return (
            <div className="wrapper">
                <img className="content-icon groceries" src={groceries} alt="volunteer" />
                <div className="content-wrapper content-wrapper-description">
                    <h1 className="section-header">Donation Description</h1>

                    {lastEdited &&
                        <p className="edited">
                            {' '}Last edited by {lastEdited.name},{' '}{lastEdited.time}
                        </p>
                    }

                    {!this.state.edit ? (
                        <div>
                            {description && description.foodItems ? (
                                <div>
                                    <div className="content-details-wrapper">
                                        <p className="content-details description-content">
                                            {
                                                description.foodItems
                                                    .map(item => item.food + ' ' + item.quantity + ' ' + item.unit)
                                                    .join(', ')
                                            }
                                        </p>
                                    </div>
                                    {editable &&
                                        <button type="button" className="edit-button" onClick={this.edit}>
                                            Edit
                                        </button>
                                    }
                                </div>
                            ) : editable ? (
                                <button className="add-food" onClick={this.addRow}>
                                    Add Food Items
                                </button>
                            ) : (
                                <p>To Be Determined</p>
                            )}{' '}
                        </div>
                    ) : (
                        <div className="content-details-wrapper">
                            <form className="edit-dg" onSubmit={this.saveFoodItems}>
                                <fieldset className="fieldset-wrapper" disabled={this.state.waiting}>
                                    <div className="input-wrapper">
                                        <div className="food-label">
                                            Food Item<span className="required">*</span>
                                        </div>
                                        <div className="food-weight-label">
                                            Weight<span className="required">*</span>
                                        </div>
                                        {this.getEditDonation()}
                                    </div>
                                    {!this.state.waiting &&
                                        <img
                                            src={plus}
                                            alt="plus"
                                            className="plus-button"
                                            onClick={this.addRow}
                                        />
                                    }
                                    <div className="save-button-wrapper">
                                        <input
                                            type="submit"
                                            className="description-edit-button"
                                            value={this.state.waiting ? 'saving...' : 'save'}
                                        />
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
export default DescriptionContent;
