import React, { Component } from 'react';
import './SCSettings0.css';
import './SCSettings1.css';
import EditOrganization from './EditOrganization';
import EditAccountManager from './EditAccountManager';

class SCSettings1 extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>

                <div className="container">
                    <EditOrganization
                        email={this.props.email}
                        password={this.props.password}
                        address={this.props.address}
                    />
                </div>
                <div className="scs-spacing" />
                <div className="container">
                    <EditAccountManager
                        coordinator={this.props.coordinator}
                        smsNotif={this.props.smsNotif}
                        emailNotif={this.props.emailNotif}
                    />
                </div>

            </div>
        )

    }

}

export default SCSettings1;