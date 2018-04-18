import React, { Component } from 'react';
import './StudentCoordinatorSettings.css';
import OrganizationDetails from './OrganizationDetails';
import AccountManager from './AccountManager';
import { AccountType } from '../../Enums';
import './SCSettings0.css';
import './SCSettings1.css';

class Settings extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            account: null,
            org: null,
            coordinator: null,
            secondaryContact: null,
            isEditingOrg: false,
            isEditingAcc: false,
            email: 'phisigmaro@uw.edu'
        };
    }

    render() {
        let org = this.props.account;
        if(org.accountType === AccountType.DONATING_AGENCY_MEMBER)
            org = this.props.donatingAgency
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
                            {/* <AccountManager
                                account={this.state.coordinator}
                                secondaryContact={this.state.secondaryContact}
                                isAdmin={this.state.account.user_type}
                                isEditingAcc={this.state.isEditingAcc}
                                handleEditAccManager={this.handleEditAccManager.bind(this)}
                                handleAccSave={this.handleAccSave.bind(this)}
                            /> */}
                        </div>
                    </div>

                    :

                    <div> Loading... </div>
                }
            </div>
        );
    }

    

    // handleEditAccManager() {
    //     this.setState({
    //         isEditingAcc: true
    //     });
    // }

    // // Backend TODO: Write data to DB
    // handleAccSave(newDetails, secondaryContact) {
    //     this.setState({
    //         coordinator: newDetails,
    //         secondaryContact: secondaryContact,
    //         isEditingAcc: false
    //     });
    // }

}

export default Settings;