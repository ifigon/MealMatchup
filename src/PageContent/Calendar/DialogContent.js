import React, { Component } from 'react';
import './DialogContent.css';
import DonatingAgencyContent from './DonatingAgencyContent';

class DialogContent extends Component {
    render() {
        return (
            <div>
                <DonatingAgencyContent
                    delivery={this.props.delivery}
                    accountType={this.props.accountType}
                />
            </div>
        );
    }
}
export default DialogContent;
