import React, { Component } from 'react';
import { AccountType, StringFormat } from '../../Enums';
import { formatPhone } from '../../utils/Utils';
import './Content.css';
import volunteer from '../../icons/volunteer.svg';

class DelivererGroupContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            // 'waiting' is true after 'Saved' is clicked and before changes
            // from db is propagated down. While it is true, input fields are
            // disabled
            waiting: false,
            savedTimestamp: null,
        };

        this.edit = this.edit.bind(this);
        this.saveVolunteers = this.saveVolunteers.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // update state to reflect values properly saved if we were waiting
        // on the update and the update happened after we wrote to db.
        if (prevState.waiting && nextProps.delivery.updatedTimesamp > prevState.savedTimestamp) {
            return { waiting: false, edit: false };
        }
        return null;
    }

    edit() {
        this.setState({
            edit: true
        });
    }

    saveVolunteers(e) {
        e.preventDefault();

        let deliverers = [];
        for (let i = 0; i < 2; i++) {
            deliverers.push({
                name: e.target['name' + i].value,
                phone: e.target['phone' + i].value,
                email: e.target['email' + i].value,
            });
        }
        
        // TODO: write to db
        console.log(deliverers);

        this.setState({
            waiting: true,
            // savedTimestamp: ,
        });

    }

    renderDelivererInputs(deliverers) {
        let inputs = [];
        for (let i = 0; i < 2; i++) {
            inputs.push((
                <div key={i}>
                    <input
                        className="content-details deliverer-group-details"
                        defaultValue={deliverers ? deliverers[i].name : ''}
                        placeholder="name"
                        name={'name' + i}
                        type="text"
                        required
                    />
                    <input
                        className="content-details deliverer-group-details"
                        defaultValue={deliverers ? deliverers[i].phone : ''}
                        placeholder="xxx-xxx-xxxx"
                        name={'phone' + i}
                        type="tel"
                        pattern={StringFormat.PHONE}
                        onChange={formatPhone}
                        required
                    />
                    <input
                        className="content-details deliverer-group-details"
                        defaultValue={deliverers ? deliverers[i].email : ''}
                        placeholder="email"
                        name={'email' + i}
                        type="email"
                        required
                    />
                </div>
            ));
        }
        return inputs;
    }

    render() {
        const { accountType, delivery } = this.props;
        const { delivererGroup, deliverers } = delivery;

        let title = 'Picking Up Donation';
        if (accountType === AccountType.DELIVERER_GROUP) {
            title = 'Student Deliverers';
        }

        let editable = (accountType === AccountType.DELIVERER_GROUP && 
            !this.state.edit && this.props.futureEvent);

        return (
            <div className="wrapper">
                <img className="content-icon" src={volunteer} alt="volunteer" />
                <div className="content-wrapper">
                    <h1 className="section-header">{title}</h1>
                    <div>
                        <h2 className="organization">
                            {delivererGroup}
                        </h2>
                        {deliverers ? (
                            <div>
                                {!this.state.edit ? (
                                    <div className="content-details-wrapper">
                                        <p className="content-details">
                                            {deliverers[0].name} ({deliverers[0].phone})
                                        </p>
                                        <p className="content-details">
                                            {deliverers[1].name} ({deliverers[1].phone})
                                        </p>
                                    </div>
                                ) : (
                                    <div className="content-details-wrapper">
                                        <form className="edit-dg" onSubmit={this.saveVolunteers}>
                                            <fieldset className="fieldset-wrapper" disabled={this.state.waiting}>
                                                <div className="input-wrapper">
                                                    {this.renderDelivererInputs(deliverers)}
                                                </div>
                                                <input 
                                                    type="submit" 
                                                    className="edit-button" 
                                                    value={this.state.waiting ? 'saving...' : 'save'}
                                                />
                                            </fieldset>
                                        </form>
                                    </div>
                                )}

                                {editable &&
                                    <button type="button" className="edit-button" onClick={this.edit}>
                                    Edit
                                    </button>
                                }
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
