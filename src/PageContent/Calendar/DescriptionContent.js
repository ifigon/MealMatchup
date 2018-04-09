import React, { Component } from 'react';
import moment from 'moment';
import { AccountType } from '../../Enums';
import './Content.css';
import groceries from '../../icons/groceries.svg';

class DescriptionContent extends Component {
    constructor(props) {
        super(props);
        let foodList = '';
        if (typeof this.props.donationDescription === 'string') {
            foodList = this.props.donationDescription;
        } else {
            if (this.props.donationDescription.length > 0) {
                foodList +=
                    this.props.donationDescription[0].name +
                    ' ' +
                    this.props.donationDescription[0].amount +
                    ' ' +
                    this.props.donationDescription[0].unit;
                for (
                    let i = 1;
                    i < this.props.donationDescription.length;
                    i++
                ) {
                    foodList +=
                        ', ' +
                        this.props.donationDescription[i].name +
                        ' ' +
                        this.props.donationDescription[i].amount +
                        ' ' +
                        this.props.donationDescription[i].unit;
                }
            }
        }

        this.state = {
            edit: false,
            donationDescription: foodList
        };
        this.edit = this.edit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    edit() {
        this.setState({
            edit: true
        });
    }
    convertPhone(phone) {
        if (phone !== undefined) {
            let phoneString = phone.toString();
            let formattedPhone =
                phoneString.substr(0, 3) +
                '-' +
                phoneString.substr(3, 3) +
                '-' +
                phoneString.substr(6);
            return formattedPhone;
        }
    }

    handleChange(e) {
        e.preventDefault();
        // pass these in from firebase
        let values = {
            donationDescription: e.target.donationDescription.value
        };
        this.setState({
            donationDescription: e.target.donationDescription.value,
            edit: false,
            editedBy: this.props.accountOwnerName,
            editedAt: moment().format('MM/DD h:mma')
        });
        this.props.saveValues(values);
    }

    render() {
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
                                {this.state.donationDescription}
                            </p>
                        </div>
                    ) : (
                        <div className="content-details-wrapper">
                            <form
                                className="edit-dg"
                                onSubmit={this.handleChange}
                            >
                                <div className="input-wrapper">
                                    <textarea
                                        className="content-details inline-details description-input"
                                        defaultValue={
                                            this.state.donationDescription
                                        }
                                        name="donationDescription"
                                    />
                                </div>

                                <input
                                    type="submit"
                                    className="edit-button"
                                    value="save"
                                />
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
