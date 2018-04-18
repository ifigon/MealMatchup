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
                                accountType={this.props.account}
                                account={org}
                            />
                        </div>

                        <div className="scs-spacing" />

                        <div className="container">
                            <AccountManager
                                accountType={this.props.account}
                                account={org}
                            />
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
                                        account={org}
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