import React, { Component } from 'react';
import moment from 'moment';
import { AccountType } from '../../Enums';
import './Content.css';
import groceries from '../../icons/groceries.svg';
import plus from '../../icons/plus-button.svg';

class DescriptionContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            donationDescriptionText: this.stringifyDonation()
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
        console.log('add row');
    }

    stringifyDonation() {
        let foodList = '';
        if (this.props.donationDescription.length > 0) {
            foodList +=
                this.props.donationDescription[0].name +
                ' ' +
                this.props.donationDescription[0].amount +
                ' ' +
                this.props.donationDescription[0].unit;
            for (let i = 1; i < this.props.donationDescription.length; i++) {
                foodList +=
                    ', ' +
                    this.props.donationDescription[i].name +
                    ' ' +
                    this.props.donationDescription[i].amount +
                    ' ' +
                    this.props.donationDescription[i].unit;
            }
        }
        return foodList;
    }

    handleChange(e) {
        e.preventDefault();
        // pass these in from firebase
        this.setState({
            donationDescription: e.target.donationDescription.value,
            edit: false,
            editedBy: this.props.accountOwnerName,
            editedAt: moment().format('MM/DD h:mma')
        });
    }

    render() {
        let editDonation = this.props.donationDescription.map((item, index) => {
            return (
                <div className="donation-edit-wrapper">
                    <input
                        type="text"
                        className="food"
                        defaultValue={item.name}
                    />
                    <div className="weight-unit-wrapper">
                        <input
                            type="text"
                            className="weight"
                            defaultValue={item.amount}
                        />
                        <select
                            className="description-unit"
                            defaultValue={item.unit}
                        >
                            <option>lbs</option>
                            <option>loaves</option>
                            <option>cases</option>
                        </select>
                    </div>
                </div>
            );
        });
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
                        <div className="content-details-wrapper">
                            <p className="content-details description-content">
                                {this.state.donationDescriptionText}
                            </p>
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
                    {this.props.accountType ===
                        AccountType.DONATING_AGENCY_MEMBER &&
                    !this.state.edit &&
                    this.props.futureEvent ? (
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
