import React, { Component } from 'react';
import { AccountType, StringFormat } from '../../Enums';
import './Content.css';
import phone from '../../icons/phone.svg';

class DescriptionContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            name: this.props.name,
            phone: this.props.phone
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
            name: e.target.name.value,
            phone: e.target.phone.value
        };
        this.setState({
            name: e.target.name.value,
            phone: e.target.phone.value,
            edit: false
        });
        this.props.saveValues(values);
    }

    render() {
        return (
            <div className="wrapper">
                <img className="content-icon" src={phone} alt="volunteer" />
                <div className="content-wrapper content-wrapper-description">
                    <h1 className="section-header">Donation Description</h1>
                    {!this.state.edit ? (
                        <div className="content-details-wrapper">
                            <p className="content-details contact-content">
                                {this.state.name} ({this.state.phone})
                            </p>
                        </div>
                    ) : (
                        <div className="content-details-wrapper">
                            <form
                                className="edit-dg"
                                onSubmit={this.handleChange}
                            >
                                <div className="input-wrapper contact-wrapper">
                                    <input
                                        type="text"
                                        className="content-details "
                                        defaultValue={this.state.name}
                                        name="name"
                                    />
                                    <input
                                        type="tel"
                                        className="content-details "
                                        defaultValue={this.state.phone}
                                        name="phone"
                                        pattern={StringFormat.PHONE}
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
export default DescriptionContent;
