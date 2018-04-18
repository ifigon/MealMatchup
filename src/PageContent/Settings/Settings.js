import React, { Component } from 'react';
import './StudentCoordinatorSettings.css';
import OrganizationDetails from './OrganizationDetails';
import AccountManager from './AccountManager';
import { AccountType } from '../../Enums';
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
                    </div>

                    :

                    <div> Loading... </div>
                }
            </div>
        );
    }

}

export default Settings;