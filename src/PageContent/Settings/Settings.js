import React, { Component } from 'react';
import OrganizationDetails from './OrganizationDetails';
import AccountManager from './AccountManager';
import { AccountType, SettingsFields } from '../../Enums';
import MemberAccount from './MemberAccount';
import PersonalAccount from './PersonalAccount';
import './SCSettings0.css';
import './SCSettings1.css';

import { accountsRef, donatingAgenciesRef } from '../../FirebaseConfig.js';
import { pick } from 'lodash';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            org : null,
            manager: null,
            personal: null, // da member personal account
            memberAccounts: [], // da memebrs
        };
    }

    componentDidMount() {
        const { account } = this.props;
        this.getAccountInfo(account);
        if (account.accountType === AccountType.DONATING_AGENCY_MEMBER) { 
            // add listener to listen on /donatingAgencies/ db updates
            donatingAgenciesRef.child(account.agency).on('value', () => {
                this.getAccountInfo(account);
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.account !== nextProps.account) {
            // remove listener
            this.getAccountInfo(nextProps.account);
        }
    }

    componentWillUnmount() {
        const { account } = this.props;
        if (account.accountType === AccountType.DONATING_AGENCY_MEMBER) {
            donatingAgenciesRef.child(account.agency).off();
        }
    }

    getAccountInfo(account) {
        if (account.accountType === AccountType.DONATING_AGENCY_MEMBER) { // da member
            this.getDaInfo(account);
        } else { // all other account types
            this.setState({
                org : pick(account, SettingsFields.ORGANIZATION),
                manager: pick(account, SettingsFields.MANAGER),
            });
        }
    }

    async getDaInfo(account) {
        // get da org info
        const daSnapshot = await donatingAgenciesRef.child(account.agency).once('value');
        const daAgency = daSnapshot.val();
        let org = pick(daAgency, SettingsFields.ORGANIZATION);
        org.uid = account.agency;

        // get da primaryContact info
        const daContactSnapshot = await accountsRef.child(daAgency.primaryContact).once('value');
        let manager = {};
        manager.primaryContact = pick(daContactSnapshot.val(), SettingsFields.MEMBER);
        manager.uid = daAgency.primaryContact;

        //set org and manager states
        this.setState({org : org, manager: manager});

        // get da member info
        if (account.isAdmin) { // da admin 
            // get all da member info
            const daMemberPromises = daAgency.members.map((damId) =>
                new Promise(async (resolve, reject) => {
                    let snapshot = await accountsRef.child(damId).once('value');
                    resolve(snapshot.val());                            
                })                   
            );
            const daMembers = await Promise.all(daMemberPromises);
            const members = daMembers.map((member, index) => {
                let result = pick(member, SettingsFields.MEMBER);
                result.uid = daAgency.members[index]; // add member uid
                return result;
            });
            this.setState({ memberAccounts: members });
        } else { // regular da member
            this.setState({ personal: pick(account, SettingsFields.MEMBER) });
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
                        <div> {this.props.availabilities}</div>
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