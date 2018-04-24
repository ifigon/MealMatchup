import React, { Component } from 'react';
import { AccountType, StringFormat } from '../../Enums';
import './Content.css';
import volunteer from '../../icons/volunteer.svg';
import { formatPhone } from '../../utils/Utils';

class DelivererGroupContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            delivererGroup: this.props.delivery.delivererGroup.group,
            deliverers: this.props.delivery.delivererGroup.deliverers
        };

        this.edit = this.edit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    edit() {
        this.setState({
            edit: true
        });
    }

    handleChange(e) {
        e.preventDefault();

        this.setState({
            edit: false,
            deliverer1: e.target.deliverer1.value,
            phone1: e.target.phone1.value,
            deliverer2: e.target.deliverer2.value,
            phone2: e.target.phone2.value,
            email1: e.target.email1.value,
            email2: e.target.email2.value
        });

        // TODO: Save values to firebase
    }

    render() {
        let deliverer1 = '';
        let deliverer2 = '';
        let phone1 = '';
        let phone2 = '';
        let email1 = '';
        let email2 = '';

        // First check if deliverers exist. Then arbitrarily check if
        // deliverer group details exist using first deliverer name
        // if state has not been set, get data from props
        // if state is set, get data from state
        if (
            this.state.deliverers !== undefined &&
            this.state.deliverer1 === undefined
        ) {
            deliverer1 = this.props.delivery.delivererGroup.deliverers[0].name;
            deliverer2 = this.props.delivery.delivererGroup.deliverers[1].name;
            phone1 = this.props.delivery.delivererGroup.deliverers[0].phone;
            phone2 = this.props.delivery.delivererGroup.deliverers[1].phone;
            email1 = this.props.delivery.delivererGroup.deliverers[0].email;
            email2 = this.props.delivery.delivererGroup.deliverers[1].email;
        } else if (this.state.deliverer1 !== undefined) {
            deliverer1 = this.state.deliverer1;
            deliverer2 = this.state.deliverer2;
            phone1 = this.state.phone1;
            phone2 = this.state.phone2;
            email1 = this.state.email1;
            email2 = this.state.email2;
        }
        return (
            <div className="wrapper">
                <img className="content-icon" src={volunteer} alt="volunteer" />
                <div className="content-wrapper">
                    {this.props.accountType === AccountType.DELIVERER_GROUP ? (
                        <h1 className="section-header">Student Deliverers</h1>
                    ) : (
                        <h1 className="section-header">Picking Up Donation</h1>
                    )}

                    <div>
                        <h2 className="organization">
                            {this.state.delivererGroup}
                        </h2>
                        {this.state.deliverers !== undefined ? (
                            <div>
                                {!this.state.edit ? (
                                    <div className="content-details-wrapper">
                                        <p className="content-details">
                                            {deliverer1} ({phone1})
                                        </p>
                                        <p className="content-details">
                                            {deliverer2} ({phone2})
                                        </p>
                                    </div>
                                ) : (
                                    <div className="content-details-wrapper">
                                        <form
                                            className="edit-dg"
                                            onSubmit={this.handleChange}
                                        >
                                            <div className="input-wrapper">
                                                <input
                                                    className="content-details deliverer-group-details"
                                                    defaultValue={deliverer1}
                                                    name="deliverer1"
                                                    type="text "
                                                    required
                                                />
                                                <input
                                                    className="content-details deliverer-group-details"
                                                    defaultValue={phone1}
                                                    name="phone1"
                                                    type="tel"
                                                    onChange={formatPhone}
                                                    pattern={StringFormat.PHONE}
                                                    required
                                                />
                                                <input
                                                    className="content-details deliverer-group-details"
                                                    defaultValue={email1}
                                                    name="email1"
                                                    type="email"
                                                    required
                                                />
                                                <input
                                                    className="content-details deliverer-group-details"
                                                    defaultValue={deliverer2}
                                                    type="text"
                                                    name="deliverer2"
                                                    required
                                                />
                                                <input
                                                    className="content-details deliverer-group-details"
                                                    defaultValue={phone2}
                                                    type="tel"
                                                    onChange={formatPhone}
                                                    name="phone2"
                                                    pattern={StringFormat.PHONE}
                                                    required
                                                />
                                                <input
                                                    className="content-details deliverer-group-details"
                                                    defaultValue={email2}
                                                    name="email2"
                                                    type="email"
                                                    required
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
                                    AccountType.DELIVERER_GROUP &&
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
                        ) : (
                            <div className="unassigned">
                                Volunteers not yet assigned.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
export default DelivererGroupContent;
