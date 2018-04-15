import React, { Component } from 'react';
import './DialogContent.css';
import ReceivingAgencyContent from './ReceivingAgencyContent';
import DonatingAgencyContent from './DonatingAgencyContent';

class DialogContent extends Component {
    render() {
        return (
            <div>
                <ReceivingAgencyContent delivery={this.props.delivery} />
                <DonatingAgencyContent delivery={this.props.delivery} />
            </div>
        );
    }
}
export default DialogContent;
