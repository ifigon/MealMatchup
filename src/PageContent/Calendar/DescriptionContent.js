import React, { Component } from 'react';
import moment from 'moment';
import { AccountType, FoodUnit } from '../../Enums';
import './Content.css';
import groceries from '../../icons/groceries.svg';
import plus from '../../icons/plus-button.svg';

class DescriptionContent extends Component {
    constructor(props) {
        super(props);
        let donation = [];
        if (this.props.delivery.donationDescription) {
            donation = this.props.delivery.donationDescription;
        }
        this.state = {
            edit: false,
            donationObject: donation,
            accountType: this.props.accountType
        };

        this.edit = this.edit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addRow = this.addRow.bind(this);
    }
    edit() {
        this.setState({
            edit: true
        });
    }

    addRow() {
        this.edit();
        let blankRow = { name: '', amount: 0, unit: '' };
        let currentDonation = this.state.donationObject;
        currentDonation.push(blankRow);
        this.setState({
            donationObject: currentDonation
        });
    }

    stringifyDonation(donation) {
        let foodList = '';
        if (donation !== undefined) {
            if (donation.length > 0) {
                foodList +=
                    donation[0].name +
                    ' ' +
                    donation[0].amount +
                    ' ' +
                    donation[0].unit;
                for (let i = 1; i < donation.length; i++) {
                    foodList +=
                        ', ' +
                        donation[i].name +
                        ' ' +
                        donation[i].amount +
                        ' ' +
                        donation[i].unit;
                }
            }
        }
        return foodList;
    }

    handleChange(e) {
        e.preventDefault();
        // pass these in from firebase
        let newDonation = [];
        for (let i = 0; i < this.state.donationObject.length; i++) {
            let name = e.target[i + 'name'].value;
            let amount = e.target[i + 'amount'].value;
            let unit = e.target[i + 'unit'].value;
            if(name !== ""){
                newDonation.push({ name: name, amount: amount, unit: unit });

            }
        }
        this.setState({
            donationObject: newDonation,
            edit: false,
            editedBy: this.props.accountOwnerName,
            editedAt: moment().format('MM/DD h:mma')
        });

        // TODO: push data to firebase
    }

    render() {
        let donation = this.stringifyDonation(this.state.donationObject);

        let editDonation = '';

        if (this.state.donationObject.length > 0) {
            editDonation = this.state.donationObject.map((item, index) => {
                return (
                    <div className="donation-edit-wrapper">
                        <input
                            type="text"
                            className="food"
                            defaultValue={item.name}
                            name={index + 'name'}
                        />
                        <div className="weight-unit-wrapper">
                            <input
                                type="number"
                                className="weight"
                                defaultValue={item.amount}
                                name={index + 'amount'}
                            />
                            <select
                                className="description-unit"
                                defaultValue={item.unit}
                                name={index + 'unit'}
                            >
                                <option>{FoodUnit.LB}</option>
                                <option>{FoodUnit.LOAVES}</option>
                                <option>{FoodUnit.CASES}</option>
                            </select>
                        </div>
                    </div>
                );
            });
        }
        return (
            <div className="wrapper">
                <img className="content-icon" src={groceries} alt="volunteer" />
                <div className="content-wrapper content-wrapper-description">
                    <h1 className="section-header">Donation Description</h1>
                    {this.state.editedBy ? (
                        <p className="edited">
                            {' '}
                            Edited by {this.state.editedBy},{' '}
                            {this.state.editedAt}
                        </p>
                    ) : null}
                    {!this.state.edit ? (
                        <div>
                            {this.state.donationObject.length > 0 ? (
                                <div className="content-details-wrapper">
                                    <p className="content-details description-content">
                                        {donation}
                                    </p>
                                </div>
                            ) : this.state.accountType ===
                            AccountType.DONATING_AGENCY_MEMBER ? (
                                    <button
                                        className="add-food"
                                        onClick={this.addRow}
                                    >
                                    Add Food Items
                                    </button>
                                ) : (
                                    <p>To Be Determined</p>
                                )}{' '}
                        </div>
                    ) : (
                        <div className="content-details-wrapper">
                            <form
                                className="edit-dg"
                                onSubmit={this.handleChange}
                            >
                                <div className="input-wrapper">
                                    <div className="food-label">
                                        Food Item<span className="required">
                                            *
                                        </span>
                                    </div>
                                    <div className="food-weight-label">
                                        Weight<span className="required">
                                            *
                                        </span>
                                    </div>
                                    {editDonation}
                                </div>
                                <img
                                    src={plus}
                                    alt="plus"
                                    className="plus"
                                    onClick={this.addRow}
                                />
                                <div className="save-button-wrapper">
                                    <input
                                        type="submit"
                                        className="description-edit-button"
                                        value="Save"
                                    />
                                </div>
                            </form>
                        </div>
                    )}
                    {this.state.accountType ===
                        AccountType.DONATING_AGENCY_MEMBER &&
                    !this.state.edit &&
                    this.props.futureEvent &&
                    this.state.donationObject.length > 0 ? (
                            <button
                                type="button"
                                className="edit-button"
                                onClick={this.edit}
                            >
                            Edit
                            </button>
                        ) : null}
                </div>
            </div>
        );
    }
}
export default DescriptionContent;
