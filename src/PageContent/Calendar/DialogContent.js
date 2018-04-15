import React, { Component } from 'react';
import './DialogContent.css';
import DonatingAgencyContent from './DonatingAgencyContent';

class DialogContent extends Component {
    render() {
        return (
            <div>
                <DonatingAgencyContent delivery={this.props.delivery} />
            </div>
        );
    }
}
export default DialogContent;
