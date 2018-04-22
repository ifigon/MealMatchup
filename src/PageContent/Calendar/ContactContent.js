import React, { Component } from 'react';
import { accountsRef, deliveriesRef, donatingAgenciesRef } from '../../FirebaseConfig';
import { AccountType, StringFormat } from '../../Enums';
import './Content.css';
import phone from '../../icons/phone.svg';
import { formatPhone } from '../../utils/Utils';

class ContactContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            // 'waiting' is true after 'Saved' is clicked and before changes
            // from db is propagated down. While it is true, input fields are
            // disabled
            waiting: false,
            savedTimestamp: null,
            daMemberMap: {},
        };

        this.edit = this.edit.bind(this);
        this.saveContact = this.saveContact.bind(this);
    }

    // update this.state.contact when we receive a new prop
    static getDerivedStateFromProps(nextProps, prevState) {
        // update state to reflect values properly saved if we were waiting
        // on the update and the update happened after we wrote to db.
        if (prevState.waiting && nextProps.delivery.updatedTimesamp > prevState.savedTimestamp) {
            return { waiting: false, edit: false };
        }
        return null;
    }

    componentDidMount() {
        const account = this.props.account;
        // fetch DA member list for dropdown
        if (account.accountType === AccountType.DONATING_AGENCY_MEMBER) {
            donatingAgenciesRef.child(account.agency).once('value')
                .then(daSnap => daSnap.val().members)
                .then(members => this.fetchMembersInfo(members));
        }
    }

    async fetchMembersInfo(members) {
        let daMemberList = await Promise.all(
            Object.keys(members).map(i => accountsRef.child(members[i]).once('value')
                .then(snap => {
                    return {
                        id: snap.key,
                        name: snap.val().name,
                    };
                })));

        let daMemberMap = daMemberList.reduce((result, item) => {
            result[item.id] = item.name;
            return result;
        }, {});

        this.setState({ daMemberMap: daMemberMap });
    }

    edit() {
        this.setState({
            edit: true
        });
    }

    saveContact(e) {
        e.preventDefault();
        const { account, delivery } = this.props;

        let contact;
        // let updates = {}; TODO
        if (account.accountType === AccountType.DONATING_AGENCY_MEMBER) {
            contact = {
                id: e.target.primaryContact.value,
                name: this.state.daMemberMap[e.target.primaryContact.value]
            };
        } else {
            contact = {
                name: e.target.name.value,
                phone: e.target.phone.value,
                email: e.target.email.value,
            };
        }

        // TODO write to db
        console.log(contact);

        this.setState({
            waiting: true,
            // savedTimestamp: ,
        });
    }

    // get the right contact based on account type
    getContact() {
        const { account, delivery } = this.props;

        let contact = {};
        if (account.accountType === AccountType.DONATING_AGENCY_MEMBER) {
            contact = delivery.daContact;
        } else if (account.accountType === AccountType.RECEIVING_AGENCY) {
            contact = delivery.raContact;
        }
        return contact;
    }

    render() {
        const { account, futureEvent } = this.props;
        const accountType = account.accountType;
        const contact = this.getContact();

        let title = 'Primary Contact for ';
        if (accountType === AccountType.DONATING_AGENCY_MEMBER) {
            title += 'Delivery';
        } else if (accountType === AccountType.RECEIVING_AGENCY) {
            title += 'Pickup';
        }

        return (
            <div className="wrapper">
                <img
                    className="content-icon phone"
                    src={phone}
                    alt="volunteer"
                />
                <div className="content-wrapper content-wrapper-description">
                    <h1 className="section-header">{title}</h1>

                    {!this.state.edit ? (
                        <div>
                            <div className="content-details-wrapper">
                                <p className="content-details contact-content">
                                    {contact.name} ({contact.phone})
                                </p>
                            </div>
                        </div>
                    ) : accountType === AccountType.DONATING_AGENCY_MEMBER ? (
                        <div>
                            <form onSubmit={this.saveContact}>
                                <fieldset className="fieldset-wrapper" disabled={this.state.waiting}>
                                    <select name="primaryContact" defaultValue={contact.id} required>
                                        {Object.keys(this.state.daMemberMap).map(
                                            (mId, i) => {
                                                return (
                                                    <option key={i} value={mId}>
                                                        {this.state.daMemberMap[mId]}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                    <input 
                                        type="submit" 
                                        className="edit-button"
                                        value={this.state.waiting ? 'saving...' : 'save'}
                                    />
                                </fieldset>
                            </form>
                        </div>
                    ) : accountType === AccountType.RECEIVING_AGENCY ? (
                        <div className="content-details-wrapper">
                            <form className="edit-dg" onSubmit={this.saveContact}>
                                <fieldset className="fieldset-wrapper" disabled={this.state.waiting}>
                                    <div className="input-wrapper contact-wrapper">
                                        <input
                                            type="text"
                                            className="content-details "
                                            defaultValue={contact.name}
                                            name="name"
                                            placeholder="name"
                                            required
                                        />
                                        <input
                                            type="tel"
                                            className="content-details "
                                            defaultValue={contact.phone}
                                            name="phone"
                                            pattern={StringFormat.PHONE}
                                            onChange={formatPhone}
                                            placeholder="xxx-xxx-xxxx"
                                            required
                                        />
                                        <input
                                            type="email"
                                            className="content-details "
                                            defaultValue={contact.email}
                                            name="email"
                                            placeholder="email"
                                            required
                                        />
                                    </div>
                                    <input 
                                        type="submit" 
                                        className="edit-button"
                                        value={this.state.waiting ? 'saving...' : 'save'}
                                    />
                                </fieldset>
                            </form>
                        </div>
                    ) : null}

                    {!this.state.edit && futureEvent &&
                        <button
                            type="button"
                            className="edit-button"
                            onClick={this.edit}
                        >
                            Edit
                        </button>
                    }
                </div>
            </div>
        );
    }
}
export default ContactContent;
