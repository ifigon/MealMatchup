import React, { Component } from 'react';
import './PendingAccounts.css';
import PendingAccountsListItem from './PendingAccountListItem';
import { AccountType } from '../../Enums.js';
import { accountsRef, donatingAgenciesRef } from '../../FirebaseConfig';

class PendingAccounts extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            orgAccounts: [],
            daAccounts: [],
        };
    }
    
    componentDidMount() {
        const { uid } = this.props.account;
        accountsRef.orderByChild('isVerified').equalTo(false).on('value', (snapshot) => { 
            let accounts = [];
            snapshot.forEach(snap => {
                const account = snap.val();
                if (account.umbrella === uid 
                    && account.accountType !== AccountType.DONATING_AGENCY_MEMBER) {  // deal with da member in da table
                        const acctObj = {};
                        acctObj[snap.key] = account;
                        accounts.push(acctObj);
                }
            });
            this.setState({orgAccounts: accounts}); 
        });

        donatingAgenciesRef.orderByChild('isVerified').equalTo(false).on('value', async (snapshot) => { 
            let daPromises = [];
            snapshot.forEach(snap => {
                const da = snap.val();
                if (da.umbrella === uid) {
                    const daPromise = new Promise( async (resolve, reject) => {
                        const daContactId = da.primaryContact;
                        const daContactSnapshot = await accountsRef.child(daContactId).once('value');
                        da.primaryContact = daContactSnapshot.val();
                        da.primaryContact.uid = daContactId;
                        const daObj = {};
                        daObj[snap.key] = da;
                        resolve(daObj);
                    });
                    daPromises.push(daPromise);
                }
            });
            const daList = await Promise.all(daPromises);
            this.setState({daAccounts: daList}); 
        }); 
    }

    componentWillUnmount() {
        accountsRef.orderByChild('isVerified').equalTo(false).off();
        donatingAgenciesRef.orderByChild('isVerified').equalTo(false).off();
    }

    render() {
        const { orgAccounts, daAccounts } = this.state;
        const data = orgAccounts.concat(daAccounts);
        // dummy data
        // let data = [
        //     {
        //         uGOFJ8NqHjbZhKAYzSZFRs1dSKD3: {
        //             accountType: 'receiving_agency',
        //             umbrella: 'RheaQY1WxJT03sTPQICFZ4STpfm1', // uid-key of an umbrella
        //             name: 'Seattle Union Gospel Mission',
        //             email: 'seauniongospel@test.org',
        //             address: {
        //                 street1: '124 Sesame St.',
        //                 street2: '',
        //                 city: 'Seattle',
        //                 state: 'WA',
        //                 zipcode: 98115,
        //                 officeNo: '110A'
        //             },
        //             timezone: 'America/Los_Angeles', // moment.tz.guess()
        //             isVerified: false,
        //             isActivated: true,
        //             primaryContact: {
        //                 name: 'Chris Stack',
        //                 email: 'chrisstack@uniongospel.org',
        //                 phone: '206-586-9876',
        //                 position: 'Manager'
        //             },
        //             secondaryContact: {
        //                 // could be null
        //                 name: 'Dave Stack',
        //                 email: 'davestack@uniongospel.org',
        //                 phone: '206-586-9876',
        //                 position: 'Volunteer'
        //             },
        //             deliveryNotes: 'Park in the lot near the south entrance.',
        //             acceptEmergencyPickups: true
        //         }
        //     },
        //     {
        //         RheaQY1WxJT03sTPQICFZ4STpfm1: {
        //             accountType: 'deliverer_group',
        //             umbrella: 'RheaQY1WxJT03sTPQICFZ4STpfm1', // uid-key of an umbrella
        //             name: 'Phi Sigma Ro',
        //             email: 'phisigmaro@uw.edu',
        //             address: {
        //                 street1: '124 Sesame St.',
        //                 street2: '',
        //                 city: 'Seattle',
        //                 state: 'WA',
        //                 zipcode: 98115
        //             },
        //             timezone: 'America/Los_Angeles', // moment.tz.guess()
        //             isVerified: false,
        //             isActivated: true,
        //             numVolunteers: 50,
        //             primaryContact: {
        //                 name: 'Andy Duncan',
        //                 email: 'andyd@uw.edu',
        //                 phone: '206-487-2859',
        //                 position: 'President'
        //             },
        //             notifications: [
        //                 {
        //                     type: 'recurring_pickup_request', // Enums.NotificationType
        //                     content: '-K9HdKlCLjjk_ka82K0s/-L5QoXeC_UrL5tRRED3e' // {daId}/{deliveryRequestId}
        //                 }
        //             ]
        //         }
        //     },
        //     {
        //         // Donating Agency not an account type
        //         K9HdKlCLjjk_ka82K0s: {
        //             umbrella: 'RheaQY1WxJT03sTPQICFZ4STpfm1', // uid-key of an umbrella
        //             name: 'Local Point',
        //             address: {
        //                 street1: '1201 NE Campus Pkwy',
        //                 street2: '',
        //                 city: 'Seattle',
        //                 state: 'WA',
        //                 zipcode: 98105,
        //                 officeNo: '220'
        //             },
        //             timezone: 'America/Los_Angeles', // moment.tz.guess()
        //             isVerified: false,
        //             isActivated: true,

        //             // TODO: pull this primary contact using the key
        //             primaryContact: {
        //                 accountType: 'donating_agency_member',
        //                 agency: '-K9HdKlCLjjk_ka82K0s', // autogen-key of a donating-agency
        //                 umbrella: 'RheaQY1WxJT03sTPQICFZ4STpfm1', // same as agency's
        //                 name: 'Andrea Benson',
        //                 email: 'bensoa3@uw.edu',
        //                 phone: '206-543-6975',
        //                 position: 'Manager'
        //                 // isAdmin: true
        //             },
        //             members: [
        //                 'dhA03LwTp3cibXVUcb3nQqO34wj1', // uid-key of donating-agency-member
        //                 'fbCm3Yrbi4e12WgpVz3gq25VKea2'
        //             ],
        //             notifications: [
        //                 {
        //                     type: 'recurring_pickup_confirmed', // Enums.NotificationType
        //                     content: '-K9HdKlCLjjk_ka82K0s/-L5QoXeC_UrL5tRRED3e' // {daId}/{deliveryRequestId}
        //                 }
        //             ]
        //         }
        //     }
        // ];
        let listItems = data.map((item, index) => {
            return <PendingAccountsListItem data={item} key={index} />;
        });

        return (
            <div className="pending-accounts-wrapper">
                <div>
                    <div className="group-label label">Type of Group</div>
                    <div className="agency-label label">Agency Name</div>
                    <div className="contact-label label">Primary Contact</div>
                </div>
                {listItems && listItems.length > 0 ? (
                    <div className="listitems">{listItems}</div>
                ) : (
                    <p className="no-pending-accounts">No Pending Accounts.</p>
                )}
            </div>
        );
    }
}

export default PendingAccounts;
