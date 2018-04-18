import React, { Component } from 'react';
import './StudentCoordinatorSettings.css';
import OrganizationDetails from './OrganizationDetails';
import AccountManager from './AccountManager';
import { AccountType } from '../../Enums';
import MemberAccount from './MemberAccount';
import PersonalAccount from './PersonalAccount';
import './SCSettings0.css';
import './SCSettings1.css';

class Settings extends Component {

    render() {
        let org = this.props.account;
        if(org.accountType === AccountType.DONATING_AGENCY_MEMBER)
            org = this.props.donatingAgency;
        return (
            <div>
                {this.props.account ?

                    <div> 
                        <div className="container">
                            <OrganizationDetails
                                account={org}
                            />
                        </div>

                        <div className="scs-spacing" />

                        <div className="container">
                            <AccountManager
                                account={org}
                            />
                        </div>

                        <div className="scs-spacing" />

                        <div className="container">

                            {this.state.account.agency === 'donating_agency' ?
                                <div>
                                    {this.state.account.user_type === 'admin' ?
                                        <MemberAccount
                                            account={this.state.coordinator}
                                            memberAccounts={this.state.memberAccounts}
                                            isAdmin={this.state.account.user_type}
                                            isEditingMem={this.state.isEditingMem}
                                            handleEditMem={this.handleEditMem.bind(this)}
                                            handleMemSave={this.handleMemSave.bind(this)}
                                        />
                                        :
                                        <PersonalAccount
                                            account={this.state.personalAccount}
                                            isEditingPmem={this.state.isEditingPmem}
                                            handleEditPmem={this.handleEditPmem.bind(this)}
                                            handlePmemSave={this.handlePmemSave.bind(this)}
                                        />
                                    }
                                </div>
                                :
                                <span />
                            }

                        </div>

                    </div>

                    :

                    <div> Loading... </div>
                }
            </div>
        );
    }

}

export default Settings;