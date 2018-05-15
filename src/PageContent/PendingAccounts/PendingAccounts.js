import React, { Component } from 'react';
import './PendingAccounts.css';
import PendingAccountsListItem from './PendingAccountListItem';

class PendingAccounts extends Component {
    render() {
        // dummy data

        return (
            <div className="pending-accounts-wrapper">
                <div>
                    <div className="group-label label">Type of Group</div>
                    <div className="agency-label label">Agency Name</div>
                    <div className="contact-label label">Primary Contact</div>
                </div>
                <div className="listitems">
                    <PendingAccountsListItem />
                </div>
            </div>
        );
    }
}

export default PendingAccounts;
