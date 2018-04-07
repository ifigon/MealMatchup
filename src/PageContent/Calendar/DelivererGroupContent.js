import React, { Component } from 'react';
import { AccountType } from '../../Enums';
import './Content.css';
import volunteer from '../../icons/volunteer.svg';

class DelivererGroupContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            delivererGroup: this.props.delivererGroup,
            deliverer1: this.props.deliverer1,
            deliverer2: this.props.deliverer2,
            phone1: this.props.phone1,
            phone2: this.props.phone2
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
        // pass these in from firebase
        let values = {
            delivererGroup: 'Green Greeks',
            deliverer1: e.target.deliverer1.value,
            phone1: e.target.phone1.value,
            deliverer2: e.target.deliverer2.value,
            phone2: e.target.phone2.value
        };
        this.setState({
            edit: false,
            deliverer1: e.target.deliverer1.value,
            phone1: e.target.phone1.value,
            deliverer2: e.target.deliverer2.value,
            phone2: e.target.phone2.value
        });

        this.props.saveValues(values);
    }

    render() {
        return (
            <div className="wrapper">
                <img className="content-icon" src={volunteer} alt="volunteer" />
                <div className="content-wrapper">
                    {this.props.accountType === AccountType.DELIVERER_GROUP ? (
                        <h1 className="section-header">Student Deliverers</h1>
                    ) : (
                        <h1 className="section-header">Picking Up Donation</h1>
                    )}
                    <h2 className="organization">
                        {this.props.delivererGroup}
                    </h2>
                    {!this.state.edit ? (
                        <div className="content-details-wrapper">
                            <p className="content-details">
                                {this.state.deliverer1} {this.state.phone1}
                            </p>
                            <p className="content-details">
                                {this.state.deliverer2} {this.state.phone2}
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
                                        className="content-details inline-details"
                                        defaultValue={this.state.deliverer1}
                                        name="deliverer1"
                                        type="textyeah "
                                    />
                                    <input
                                        className="content-details inline-details"
                                        defaultValue={this.state.phone1}
                                        name="phone1"
                                        type="tel"
                                    />
                                    <input
                                        className="content-details inline-details"
                                        defaultValue={this.state.deliverer2}
                                        type="text"
                                        name="deliverer2"
                                    />
                                    <input
                                        className="content-details inline-details"
                                        defaultValue={this.state.phone2}
                                        type="tel"
                                        name="phone2"
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
                    {this.props.accountType === AccountType.DELIVERER_GROUP &&
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
export default DelivererGroupContent;
