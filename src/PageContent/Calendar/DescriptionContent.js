import React, { Component } from 'react';
import moment from 'moment';
import { AccountType, FoodUnit, StringFormat } from '../../Enums';
import { deliveriesRef } from '../../FirebaseConfig';
import { objectsAreEqual } from '../../utils/Utils';
import './Content.css';
import notes from '../../icons/food_logs.svg';
import groceries from '../../icons/groceries.svg';
import plus from '../../icons/plus-button.svg';

class DescriptionContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditingFoodItems: false,
            isEditingNotes: false,
            currentNote: this.props.delivery.notes,


            // 'waiting' is true after 'Saved' is clicked and before changes
            // from db is propagated down. While it is true, input fields are
            // disabled
            waiting: false,
            savedTimestamp: null,
            foodRows: null, // for rendering editable rows only
        };

        this.saveNotes = this.saveNotes.bind(this);
        this.getEditNotes = this.getEditNotes.bind(this); // used to get current note in textbox
        this.editNotes = this.editNotes.bind(this);
        this.editFoodItems = this.editFoodItems.bind(this);
        this.saveFoodItems = this.saveFoodItems.bind(this);
        this.addRow = this.addRow.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // update state to reflect values properly saved if we were waiting
        // on the update and the update happened after we wrote to db.
        if (this.state.waiting && nextProps.delivery.updatedTimestamp > this.state.savedTimestamp) {
            this.setState({ waiting: false, isEditingFoodItems: false, foodRows: null });
        }
    }
    
    editNotes() {
        this.setState({
            isEditingNotes: true,
            currentNote: this.props.delivery.notes,
        });
    }

    editFoodItems() {
        const description = this.props.delivery.description;

        // copy current food items into state for editing purposes
        let foodRows = [];
        if (description && description.foodItems) {
            foodRows = description.foodItems.slice();
        }

        this.setState({
            isEditingFoodItems: true,
            foodRows: foodRows,
        });
    }

    addRow() {
        if (!this.state.isEditingFoodItems) {
            this.editFoodItems();
        }

        this.setState(prevState => {
            let foodRows = prevState.foodRows;
            foodRows.push({ food: '', quantity: 0, unit: '' });
            return { foodRows: foodRows };
        });
    }

    getEditNotes(e) {
        this.setState({currentNote: e.target.value});
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

    saveNotes(e) {
        e.preventDefault();
        this.setState({ waiting: true });
        let updates = {};
        updates['notes'] = this.state.currentNote;
        deliveriesRef.child(this.props.delivery.id).update(updates).then(() => {
            // record timestamp of when the write was done
            this.setState({ savedTimestamp: moment().valueOf() });
        });
        this.setState({ waiting: false, isEditingNotes: false });    
    }

    saveFoodItems(e) {
        e.preventDefault();

        // disable input fields first
        this.setState({ waiting: true });

        let newFoodItems = [];
        for (let i = 0; i < this.state.foodRows.length; i++) {
            let food = e.target['food' + i].value;
            let quantity = e.target['quantity' + i].value;
            let unit = e.target['unit' + i].value;
            if (food) {
                newFoodItems.push({ food: food, quantity: quantity, unit: unit });
            }
        }

        if (this.foodItemsChanged(newFoodItems)) {
            let updates = {};
            updates['description/foodItems'] = newFoodItems;
            updates[`description/updatedBy/${moment().valueOf()}`] = this.props.account.name;
            deliveriesRef.child(this.props.delivery.id).update(updates).then(() => {
                // record timestamp of when the write was done
                this.setState({ savedTimestamp: moment().valueOf() });
            });
        } else {
            //nothing changed
            this.setState({ waiting: false, isEditingFoodItems: false });
        }
    }

    foodItemsChanged(newFoodItems) {
        const description = this.props.delivery.description;
        if (!description || !description.foodItems) {
            return newFoodItems.length > 0;
        }

        const foodItems = description.foodItems;
        if (foodItems.length !== newFoodItems.length) {
            return true;
        }

        for (let i = 0; i < foodItems.length; i++) {
            if (!objectsAreEqual(foodItems[i], newFoodItems[i])) {
                return true;
            }
        }

        return false;
    }

    render() {
        const { account, delivery, futureEvent } = this.props;
        const accountType = account.accountType;
        const description = delivery.description;

        let lastEdited = null;
        if (accountType === AccountType.DONATING_AGENCY_MEMBER &&
            description && description.updatedBy) {
            // find the latest edit
            let latest = Math.max(...Object.keys(description.updatedBy));
            lastEdited = {
                name: description.updatedBy[latest],
                time: moment(latest).format(StringFormat.DATE_SHORT + ' ' + StringFormat.TIME),
            };
        }

        let editable = (accountType === AccountType.DONATING_AGENCY_MEMBER &&
            !this.state.isEditingFoodItems && !this.state.isEditingNotes && futureEvent);

        return (
            <div className="wrapper">
                {/*FOOD ITEMS*/}
                <img className="content-icon groceries" src={groceries} alt="volunteer" />
                <div className="content-wrapper content-wrapper-description">
                    <h1 className="section-header">Donation Description</h1>

                    {lastEdited &&
                        <p className="edited">
                            {' '}Last edited by {lastEdited.name},{' '}{lastEdited.time}
                        </p>
                    }


                    {!this.state.isEditingFoodItems ? (
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
                                        <button type="button" className="edit-button" onClick={this.editFoodItems}>
                                            Edit
                                        </button>
                                    }
                                </div>
                            ) : editable ? (
                                <button className="add-food" onClick={this.addRow}>
                                    Add Food Items
                                </button>
                            ) : futureEvent ? (
                                <p>To Be Determined</p>
                            ) : (
                                <p>Left empty</p>
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

                {/*NOTES*/}
                <img className="content-icon" src={notes} alt="notes"/>
                <div className="content-wrapper content-wrapper-description">
                    <h1 className="section-header">Notes for Pickup</h1>
                        
                    {!this.state.isEditingNotes ? (
                        <div>
                            {delivery.notes ? (
                                <div>
                                    <div className="content-details-wrapper">
                                        <p className="content-details description-content">
                                            {delivery.notes}
                                        </p>
                                    </div>
                                    {/*{accountType === AccountType.DONATING_AGENCY_MEMBER */}
                                    {editable &&
                                        <button type="button" className="edit-button" onClick={this.editNotes}>
                                            Edit
                                        </button>
                                    }
                                </div>
                            ) : (
                                <p>Left empty</p>
                            )}{' '}
                        </div>
                    ) : (
                        <div className="content-details-wrapper">
                            <form className="edit-dg" onSubmit={this.saveNotes}>
                                <div className="input-wrapper">
                                    <textarea value={this.state.currentNote} onChange={this.getEditNotes}/>
                                </div>
                                <div className="save-button-wrapper">
                                    <input
                                        type="submit"
                                        className="description-edit-button"
                                        value={this.state.waiting ? 'saving...' : 'save'}
                                    />
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
export default DescriptionContent;
