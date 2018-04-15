import React, { Component } from 'react';
import './StudentCoordinatorSettings.css';
import OrganizationDetails from './OrganizationDetails';
import AccountManager from './AccountManager';
import './SCSettings0.css';
import './SCSettings1.css';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: null,
            org: null,
            coordinator: null,
            isEditingOrg: false,
            isEditingAcc: false,
            email: 'phisigmaro@uw.edu'
        };
    }

    // Backend TODO: Get data from DB
    componentDidMount() {
        let account  = {
            user_type: 'admin',
            name: 'Phi Sigma Ro',
            email: this.state.email,
            password: 'password',
            organizationPhone: '209-992-9292',
            address: {
                street1: '4138 Brooklyn Ave NE',
                street2: '',
                city: 'Seattle',
                state: 'WA',
                zipcode: 98105
            },
            isVerified: true,
            isActivated: true,
            numVolunteers: 50,
            coordinator: {
                name: 'Andy Duncan',
                email: 'andyd@uw.edu',
                phone: '206-487-2859',
                position: 'President'
            },
            notifications: [
                {
                    type: 'recurring_pickup_request',  // Enums.NotificationType
                    content: '-L5QoXeC_UrL5tRRED3e'  // key of DeliveryRequest
                }
            ],
            smsNotif: true,
            emailNotif: true
        };
        this.setState({
            account: account,
            org: {
                user_type: account.user_type,
                name: account.name,
                address: account.address,
                organizationPhone: account.organizationPhone,
                numVolunteers: account.numVolunteers || null,
                notes: account.notes || null,
                emergencypickup: account.emergencypickup || null
            },
            coordinator: {
                details: account.coordinator,
                smsNotif: account.smsNotif,
                emailNotif: account.emailNotif
            }
        });
    }

    render() {
        return (
            <div>
                {this.state.account ?

                    <div> 
                        <div className="container">
                            <OrganizationDetails
                                account={this.state.org}
                                isEditingOrg={this.state.isEditingOrg}
                                handleEditOrg={this.handleEditOrg.bind(this)}
                                handleOrgSave={this.handleOrgSave.bind(this)}
                            />
                        </div>

                        <div className="scs-spacing" />

                        <div className="container">
                            <AccountManager
                                account={this.state.coordinator}
                                isEditingAcc={this.state.isEditingAcc}
                                handleEditAccManager={this.handleEditAccManager.bind(this)}
                                handleAccSave={this.handleAccSave.bind(this)}
                            />
                        </div>
                    </div>

                    :

                    <div> Loading... </div>
                }
            </div>
        );
    }

    handleEditOrg() {
        this.setState({
            isEditingOrg: true
        });
    }

    // Backend TODO: Write data to DB
    handleOrgSave(newDetails) {
        this.setState({
            org: newDetails,
            isEditingOrg: false
        });
    }

    handleEditAccManager() {
        this.setState({
            isEditingAcc: true
        });
    }

    // Backend TODO: Write data to DB
    handleAccSave(newDetails) {
        this.setState({
            coordinator: newDetails,
            isEditingAcc: false
        });
    }

}

export default Settings;