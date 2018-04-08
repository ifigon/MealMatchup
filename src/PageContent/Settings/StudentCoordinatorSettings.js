import React, { Component } from 'react';
import './StudentCoordinatorSettings.css';
import SCSettings0 from './SCSettings0';
import SCSettings1 from './SCSettings1';

class StudentCoordinatorSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email,
            password: this.props.password,
            name: this.props.name,
            address: this.props.address,
            organizationPhone: this.props.organizationPhone,
            coordinator: this.props.coordinator,
            position: this.props.position,
            coordinatorPhone: this.props.coordinatorPhone,
            coordinatorEmail: this.props.coordinatorEmail,
            smsNotif: this.props.smsNotif,
            emailNotif: this.props.emailNotif,
            step: 0
        }
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
                        email={this.state.email}
                        password={this.state.password}
                        address={this.state.address}
                        coordinator={this.state.coordinator}
                        smsNotif={this.state.smsNotif}
                        emailNotif={this.state.emailNotif}
                        handleEditButton={this.handleEditButton.bind(this)}
                    />
                );
            case 1:
                return (
                    <SCSettings1
                        email={this.state.email}
                        password={this.state.password}
                        address={this.state.address}
                        coordinator={this.state.coordinator}
                        smsNotif={this.state.smsNotif}
                        emailNotif={this.state.emailNotif}
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