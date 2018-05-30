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
        accountsRef.orderByChild('umbrella').equalTo(uid).on('value', (snapshot) => { 
            let accounts = [];
            snapshot.forEach(snap => {
                const account = snap.val();
                if (account.accountType !== AccountType.DONATING_AGENCY_MEMBER) {  // deal with da member in da table below
                    const acctObj = {};
                    acctObj[snap.key] = account;
                    accounts.push(acctObj);
                }
            });
            this.setState({orgAccounts: accounts}); 
        });

        donatingAgenciesRef.orderByChild('umbrella').equalTo(uid).on('value', async (snapshot) => { 
            let daPromises = [];
            snapshot.forEach(snap => {
                const da = snap.val();
                const daPromise = new Promise( async (resolve, reject) => {
                    // get daContact Info
                    const daContactId = da.primaryContact;
                    const daContactSnapshot = await accountsRef.child(daContactId).once('value');
                    da.primaryContact = daContactSnapshot.val();
                    da.primaryContact.uid = daContactId;
                    
                    const daObj = {};
                    daObj[snap.key] = da;
                    resolve(daObj);
                });
                daPromises.push(daPromise);
            });
            const daList = await Promise.all(daPromises);
            this.setState({daAccounts: daList}); 
        }); 
    }

    componentWillUnmount() {
        const { uid } = this.props.account;
        accountsRef.orderByChild('umbrella').equalTo(uid).off();
        donatingAgenciesRef.orderByChild('umbrella').equalTo(uid).off();
    }

    render() {
        const { orgAccounts, daAccounts } = this.state;
        const data = orgAccounts.concat(daAccounts); // combine two data lists

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
