import React, { Component } from 'react';
import './SCSettings0.css';
import './SCSettings1.css';

import EditAccountManager from './EditAccountManager';
import EditingAccountManager from './EditingAccountManager';

class SCSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            org: {
                email: props.account.email,
                password: props.account.password,
                address: props.account.address,
                phone: props.account.organizationPhone
            },
            acc: {
                name: props.account.coordinator.name,
                position: props.account.coordinator.position,
                email: props.account.coordinator.email,
                phone: props.account.coordinator.phone,
                smsNotif: props.account.smsNotif,
                emailNotif: props.account.emailNotif
            },
            isEditingOrg: false,
            isEditingAccManager: false
        };
    }

    render() {

        return (
            <div>

                
                <div className="scs-spacing" />
                <div className="container">
                    {this.state.isEditingAccManager ?
                        <EditingAccountManager 
                            coordinator={this.state.acc}
                            handleAccSave={this.handleAccSave.bind(this)}
                        />
                        :
                        <EditAccountManager
                            coordinator={this.state.acc}
                            handleEditAccManager={this.handleEditAccManager.bind(this)}
                        />
                    }
                    
                </div>

            </div>
        );

    }

    handleEditAccManager() {
        this.setState({
            isEditingAccManager: true
        });
    }

    // Backend TODO: Write data to DB
    handleAccSave(acc) {
        this.setState({
            acc: acc,
            isEditingAccManager: false
        });
    }

}

export default SCSettings;