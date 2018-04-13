import React, { Component } from 'react';
import './StudentCoordinatorSettings.css';
import OrganizationDetails from './OrganizationDetails';
import SCSettings from './SCSettings';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: null,
            isEditingOrg: false,
            email: 'phisigmaro@uw.edu'
        };
    }

    // Backend TODO: Get data from DB
    componentDidMount() {
        let account  = {
            name: 'Phi Sigma Ro',
            email: this.state.email,
            password: 'password',
            organizationPhone: '209-992-9292',
            address: {
                street1: '124 Sesame St.',
                street2: '',
                city: 'Seattle',
                state: 'WA',
                zipcode: 98115
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
        this.setState({account});
    }

    render() {
        return (
            <div>
                {this.state.account ?

                    <div> 
                        <div className="container">
                            <OrganizationDetails
                                account={this.state.account}
                                isEditingOrg={this.state.isEditingOrg}
                                handleEditOrg={this.handleEditOrg.bind(this)}
                                handleOrgSave={this.handleOrgSave.bind(this)}
                            />
                        </div>

                        <SCSettings
                            account={this.state.account}
                            handleOrgSave={this.handleOrgSave}
                            handleAccSave={this.handleAccSave}
                        />
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
    handleOrgSave(org) {
        this.setState({
            account: {
                email: org.email,
                password: org.password,
                name: org.name,
                address: org.address,
                organizationPhone: org.phone
            },
            isEditingOrg: false
        });
    }

}

export default Settings;