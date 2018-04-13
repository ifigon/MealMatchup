import React, { Component } from 'react';
import './StudentCoordinatorSettings.css';
import SCSettings0 from './SCSettings0';
import SCSettings1 from './SCSettings1';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: null,
            email: 'phisigmaro@uw.edu',
            step: 0
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
                {this.showStep()}
            </div>
        );
    }

    handleEditButton() {
        this.setState({
            step: 1
        });
    }

    showStep() {

        switch (this.state.step) {

        case 1:
            return (
                this.state.account ?
                    <SCSettings0 
                        account={this.state.account}
                        handleEditButton={this.handleEditButton.bind(this)}
                    />
                    :
                    <div> Loading... </div>
            );
        case 0:
            return (
                this.state.account ?
                    <SCSettings1
                        account={this.state.account}
                        handleOrgSave={this.handleOrgSave}
                        handleAccSave={this.handleAccSave}
                    />
                    :
                    <div> Loading... </div>
            );
        default:
            return (
                this.state.account ?
                    <SCSettings0 
                        account={this.state.account}
                        handleEditButton={this.handleEditButton.bind(this)}
                    />
                    :
                    <div> Loading </div>
            );
        }

    }

}

export default Settings;