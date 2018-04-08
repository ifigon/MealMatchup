import React, { Component } from 'react';
import './DialogContent.css';
import DonatingAgencyContent from './DonatingAgencyContent';

class DialogContent extends Component {
    render() {
        return (
            <div>
                <DonatingAgencyContent
                    donatingAgency={this.props.donatingAgency}
                    donatingAgencyContactName={
                        this.props.donatingAgencyContactName
                    }
                    donatingAgencyContactPhone={
                        this.props.donatingAgencyContactPhone
                    }
                    accountType={this.props.accountType}
                />
            </div>
        );
    }
}
export default DialogContent;
