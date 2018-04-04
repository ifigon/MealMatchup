import React, { Component } from 'react';
import { DeliveryType, AccountType } from '../../Enums';
import './Content.css';
import volunteer from '../../icons/volunteer.svg';

class DelivererGroupContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        };
        this.edit = this.edit.bind(this);
    }
    edit() {
        this.setState({
            edit: true
        });
    }

    render() {
        let delivererGroup = 'Green Greeks';
        let deliverer1 = 'Blake Johnson';
        let phone1 = '(206-389-2318)';
        let deliverer2 = 'Erika Zhang';
        let phone2 = '(206-876-5432)';
        let buttonContent = '';
        let buttonClass = '';
        if (!this.state.edit) {
            buttonContent = 'edit';
            buttonClass = 'edit-button';
        } else {
            buttonContent = 'save';
            buttonClass = 'edit-button editing';
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
                    <h2 className="organization">{delivererGroup}</h2>
                    {!this.state.edit ? (
                        <div className="content-details-wrapper">
                            <p className="content-details">
                                {deliverer1} {phone1}
                            </p>
                            <p className="content-details">
                                {deliverer2} {phone2}
                            </p>
                        </div>
                    ) : (
                        <div className="content-details-wrapper inline-wrapper">
                            <input
                                className="content-details inline-details"
                                value={deliverer1}
                            />
                            <input
                                className="content-details inline-details"
                                value={phone1}
                            />
                            <input
                                className="content-details inline-details"
                                value={deliverer2}
                            />
                            <input
                                className="content-details inline-details"
                                value={phone2}
                            />
                        </div>
                    )}
                    {this.props.accountType === AccountType.DELIVERER_GROUP ? (
                        <button
                            className="edit-button"
                            type="button"
                            onClick={this.edit}
                        >
                            {buttonContent}
                        </button>
                    ) : null}
                </div>
            </div>
        );
    }
}
export default DelivererGroupContent;
