import React, { Component } from 'react';
import './DialogContent.css';
import DescriptionContent from './DescriptionContent';

class DialogContent extends Component {
    render() {
        return (
            <div>
                <DescriptionContent
                    futureEvent={this.props.futureEvent}
                    accountType={this.props.accountType}
                    donationDescription={this.props.donationDescription}
                    saveValues={this.props.saveValues}
                    accountOwnerName={this.props.accountOwnerName}
                />
            </div>
        );
    }
}
export default DialogContent;
