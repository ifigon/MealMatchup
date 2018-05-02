import React, { Component } from 'react';
import OrganizationDetails from './OrganizationDetails';
import AccountManager from './AccountManager';
import { AccountType, SettingsFields } from '../../Enums';
import MemberAccount from './MemberAccount';
import PersonalAccount from './PersonalAccount';
import './SCSettings0.css';
import './SCSettings1.css';

import { accountsRef, donatingAgenciesRef } from '../../FirebaseConfig.js';
const pick = require('lodash.pick');

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            org : null,
            manager: null,
            memberAccounts: [],
            personal: null,
        };
    }

    componentDidMount() {
        const { account } = this.props;
        this.getAccountInfo(account);
        if (account.accountType === AccountType.DONATING_AGENCY_MEMBER) { // Add listener
            donatingAgenciesRef.child(account.agency).on('value', () => {
                this.getAccountInfo(account);
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.account !== nextProps.account) {
            this.getAccountInfo(nextProps.account);
        }
    }

    componentWillUnmount() {
        const { account } = this.props;
        if (account.accountType === AccountType.DONATING_AGENCY_MEMBER) {
            donatingAgenciesRef.child(account.agency).off();
        }
    }

    async getAccountInfo(account) {
        if (account.accountType === AccountType.DONATING_AGENCY_MEMBER) {
            const daSnapshot = await donatingAgenciesRef.child(account.agency).once('value');
            const daAgency = daSnapshot.val();
            let org = pick(daAgency, SettingsFields.ORGANIZATION);
            org.uid = account.agency;


            const daContactSnapshot = await accountsRef.child(daAgency.primaryContact).once('value');
            let manager = {};
            manager.primaryContact = pick(daContactSnapshot.val(), SettingsFields.MEMBER);
            manager.uid = daAgency.primaryContact;

            this.setState({
                org : org,
                manager: manager,
            });

            if (account.isAdmin) {
                // fetch all daMembers
                const daMemberPromises = daAgency.members.map((damId) =>
                    new Promise(async (resolve, reject) => {
                            let snapshot = await accountsRef.child(damId).once('value');
                            resolve(snapshot.val());                            
                        }
                    )                   
                );
                const daMembers = await Promise.all(daMemberPromises);
                const members = daMembers.map((member, index) => {
                    let result = pick(member, SettingsFields.MEMBER)
                    result.uid = daAgency.members[index];
                    return result;
                });
                
                this.setState({ memberAccounts: members });
            } else {
                this.setState({ personal: pick(account, SettingsFields.MEMBER) });
            }

        } else {
            this.setState({
                org : pick(account, SettingsFields.ORGANIZATION),
                manager: pick(account, SettingsFields.MANAGER),
            });
        }
    }

    render() {
        return (
            <div>
                {this.props.account ?
                    <div className="settings-container"> 
                        <div className="container">
                            {this.state.org ? 
                                <OrganizationDetails
                                    org={this.state.org}
                                    accountType={this.props.account.accountType}
                                    isAdmin={this.props.account.isAdmin}
                                />
                                :
                                <div>Loading...</div>  
                            }
                        </div>

                        <div className="scs-spacing" />

                        <div className="container">
                            {this.state.manager ?
                                <AccountManager
                                    account={this.state.manager}
                                    accountType={this.props.account.accountType}
                                    isAdmin={this.props.account.isAdmin}
                                />
                                :
                                <div>Loading...</div>
                            }
                        </div>

                        <div className="scs-spacing" />

                        {this.props.account.accountType === AccountType.DONATING_AGENCY_MEMBER ?
                            <div className="container">
                                {this.props.account.isAdmin &&
                                    <MemberAccount
                                        members={this.state.memberAccounts}
                                    />
                                }
                                {(!this.props.account.isAdmin && this.state.personal) &&    
                                    <PersonalAccount
                                        account={this.state.personal}
                                    />
                                }
                            </div>
                            :
                            <span />
                        }

                    </div>

                    :

                    <div> Loading... </div>
                }
            </div>
        );
    }

}

export default Settings;