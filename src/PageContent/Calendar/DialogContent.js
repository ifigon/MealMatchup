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
                />
            </div>
        );
    }
}
export default DialogContent;
