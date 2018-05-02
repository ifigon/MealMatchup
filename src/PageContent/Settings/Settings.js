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
        this.getAccountInfo(this.props.account);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.account !== nextProps.account) {
            this.getAccountInfo(nextProps.account);
        }
    }

    async getAccountInfo(account) {
        if (account.accountType === AccountType.DONATING_AGENCY_MEMBER) {
            const snapshot = await donatingAgenciesRef.child(account.agency).once('value')
            const daAgency = snapshot.val();
            let org = pick(daAgency, SettingsFields.ORGANIZATION);
            org.uid = account.agency;
            this.setState({
                org : org,
                manager: pick(daAgency, SettingsFields.MANAGER),
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
                const daMembers = await Promise.all(daMemberPromises)
                    .map((member, index) => {
                        let result = pick(member, SettingsFields.MEMBER)
                        result.uid = daAgency.members[index];
                        return result;
                    });
                
                this.setState({ memberAccounts: daMembers });
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
                                />
                                :
                                <div>Loading...</div>
                            }
                        </div>

                        <div className="scs-spacing" />

                        {this.props.account.accountType === AccountType.DONATING_AGENCY_MEMBER ?
                            <div className="container">
                                {this.props.account.isAdmin ?
                                    <MemberAccount
                                        account={this.state.memberAccounts}
                                    />
                                    :
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