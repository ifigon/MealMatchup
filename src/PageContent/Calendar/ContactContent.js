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
            daMemberList: [],
            // Saving contact to state so that we can display the updated
            // contact info when 'Save' is clicked and before the updated
            // info gets propagated down. This state will be updated when
            // new props are received.
            contact: this.getContact(props),
        };

        this.edit = this.edit.bind(this);
        this.saveContact = this.saveContact.bind(this);
    }

    // update this.state.contact when we receive a new prop
    static getDerivedStateFromProps(nextProps, prevState) {
        return { contact: this.getContact(nextProps) };
    }

    getContact(props) {
        const { account, delivery } = props;
        let contact = {};
        if (account.accountType === AccountType.DONATING_AGENCY_MEMBER) {
            contact = delivery.daContact;
        } else if (account.accountType === AccountType.RECEIVING_AGENCY) {
            contact = delivery.raContact;
        }
        return contact;
    }

    componentDidMount() {
        const account = this.props.account;
        if (account.accountType === AccountType.DONATING_AGENCY_MEMBER) {
            donatingAgenciesRef.child(account.agency).once('value').then((daSnap) => {
                return daSnap.val().members;
            }).then((members) => {
                this.fetchMembersInfo(members);
            });
        }
    }

    async fetchMembersInfo(members) {
        let daMemberList = await Promise.all(
            Object.keys(members).map(i => accountsRef.child(members[i])
                .once('value').then((snap) => {
                    return { 
                        id: snap.key,
                        contact: {
                            name: snap.val().name,
                            phone: snap.val().phone,
                            email: snap.val().email,
                        },
                    };
                })
            ));
        this.setState({ daMemberList: daMemberList });
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
            let member = this.state.daMemberList[e.target.primaryContact.value];
            contact = member.contact;
        } else {
            contact = {
                name: e.target.name.value,
                phone: e.target.phone.value,
                email: e.target.email.value,
            };
        }

        // TODO write to db

        this.setState({
            edit: false,
            contact: contact,
        });
    }

    render() {
        const { account, futureEvent } = this.props;
        const accountType = account.accountType;
        const contact = this.state.contact;

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
                                <select name="primaryContact" defaultValue="" required>
                                    <option value="" disabled>Select</option>
                                    {this.state.daMemberList.map(
                                        (member, i) => {
                                            return (
                                                <option key={i} value={i}>
                                                    {member.contact.name}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                                <input type="submit" value="save" className="edit-button"/>
                            </form>
                        </div>
                    ) : accountType === AccountType.RECEIVING_AGENCY ? (
                        <div className="content-details-wrapper">
                            <form className="edit-dg" onSubmit={this.saveContact}>
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
                                <input type="submit" className="edit-button" value="save"/>
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
