import React, { Component } from 'react';
import OrganizationDetails from './OrganizationDetails';
import AccountManager from './AccountManager';
import { AccountType } from '../../Enums';
import MemberAccount from './MemberAccount';
import PersonalAccount from './PersonalAccount';
import './SCSettings0.css';
import './SCSettings1.css';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            manager: null
        };
    }

    // Backend TODO: Fetch DA primary contact data for AccountManager
    componentDidMount() {
        let manager = this.props.account;
        if (manager.accountType === AccountType.DONATING_AGENCY_MEMBER && !manager.isAdmin) {
            manager = {
                accountType: AccountType.DONATING_AGENCY_MEMBER,
                name: 'something',
                email: 'something',
                phone: 'something',
                position: 'something',
            };
        };
        this.setState({manager: manager});
    }

    render() {
        let org = this.props.account;
        if(org.accountType === AccountType.DONATING_AGENCY_MEMBER)
            org = this.props.donatingAgency;
        return (
            <div>
                {this.props.account ?

                    <div className="settings-container"> 
                        <div className="container">
                            <OrganizationDetails
                                daAccount={this.props.account}
                                org={org}
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