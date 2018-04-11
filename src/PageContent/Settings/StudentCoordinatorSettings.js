import React, { Component } from 'react';
import './StudentCoordinatorSettings.css';
import SCSettings0 from './SCSettings0';
import SCSettings1 from './SCSettings1';

class StudentCoordinatorSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: {},
            step: 0
        };
    }

    componentWillMount() {
        let account  = {
            name: 'Phi Sigma Ro',
            email: 'phisigmaro@uw.edu',
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

        case 0:
            return (
                <SCSettings0 
                    account={this.state.account}
                    handleEditButton={this.handleEditButton.bind(this)}
                />
            );
        case 1:
            return (
                <SCSettings1
                    account={this.state.account}
                />
            );
        default:
            return (
                <SCSettings0 
                    email={this.state.email}
                    password={this.state.password}
                    address={this.state.address}
                    coordinator={this.state.coordinator}
                    smsNotif={this.state.smsNotif}
                    emailNotif={this.state.emailNotif}
                    handleEditButton={this.handleEditButton.bind(this)}
                />
            );
        }

    }

}

export default StudentCoordinatorSettings;