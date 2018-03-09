import React, { Component } from 'react';
import './SCSettings0.css';
import './SCSettings1.css';
import EditOrganization from './EditOrganization';
import EditingOrganization from './EditingOrganization';
import EditAccountManager from './EditAccountManager';
import EditingAccountManager from './EditingAccountManager';

class SCSettings1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditingOrg: false,
            isEditingAccManager: false
        }
    }

    render() {

        return (
            <div>

                <div className="container">
                    {this.state.isEditingOrg ? 
                        <EditingOrganization 
                            email={this.props.email}
                            password={this.props.password}
                            address={this.props.address}
                            handleOrgSave={this.handleOrgSave.bind(this)}
                        />
                    : 
                        <EditOrganization
                            email={this.props.email}
                            password={this.props.password}
                            address={this.props.address}
                            handleEditOrg={this.handleEditOrg.bind(this)}
                        />
                    }
                </div>
                <div className="scs-spacing" />
                <div className="container">
                    {this.state.isEditingAccManager ?
                        <EditingAccountManager 
                            coordinator={this.props.coordinator}
                            smsNotif={this.props.smsNotif}
                            emailNotif={this.props.emailNotif}
                            handleAccSave={this.handleAccSave.bind(this)}
                        />
                    :
                        <EditAccountManager
                            coordinator={this.props.coordinator}
                            smsNotif={this.props.smsNotif}
                            emailNotif={this.props.emailNotif}
                            handleEditAccManager={this.handleEditAccManager.bind(this)}
                        />
                    }
                    
                </div>

            </div>
        )

    }

    handleEditOrg() {
        this.setState({
            isEditingOrg: true
        });
    }

    handleOrgSave() {
        this.setState({
            isEditingOrg: false
        });
    }

    handleEditAccManager() {
        this.setState({
            isEditingAccManager: true
        });
    }

    handleAccSave() {
        this.setState({
            isEditingAccManager: false
        });
    }

}

export default SCSettings1;