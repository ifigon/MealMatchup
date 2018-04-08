import React, { Component } from 'react';
import './DialogContent.css';
import DonatingAgencyContent from './DonatingAgencyContent';

class DialogContent extends Component {
    render() {
        return (
            <div>
                <DonatingAgencyContent
                    donatingAgency={'Local Point'}
                    donatingAgencyContactName={'Andrea Benson'}
                    donatingAgencyContactPhone={2065436975}
                />
            </div>
        );
    }
}
export default DialogContent;
