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
            manager: {},
            org: {},
            memberAccounts: [],
            personal: {},
        };
    }

    async componentDidMount() {
        const { account } = this.props;
        if (account.accountType === AccountType.DONATING_AGENCY_MEMBER) {
            const snapshot = await donatingAgenciesRef.child(this.props.account.agency).once('value')
            const daAgency = snapshot.val();
            this.setState({
                org : pick(daAgency, SettingsFields.ORGANIZATION),
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
                    .map(member => pick(member, SettingsFields.MEMBER));
                
                this.setState({ memberAccounts: daMembers });
            } else {
                this.setState({ personal: pick(account, SettingsFields.MEMBER) });
            }

        } else {
            this.setState({
                org : pick(this.props.account, SettingsFields.ORGANIZATION),
                manager: pick(this.props.account, SettingsFields.MANAGER),
            });
        }
    }

    render() {
        return (
            <div>
                {this.props.account ?

                    <div className="settings-container"> 
                        <div className="container">
                            <OrganizationDetails
                                org={this.state.org}
                            />
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
                                        account={org}
                                    />
                                    :
                                    <PersonalAccount
                                        account={this.props.account}
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