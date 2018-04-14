import React, { Component } from 'react';
import './DialogContent.css';
import DescriptionContent from './DescriptionContent';

class DialogContent extends Component {
    render() {
        return (
            <div>
                <DescriptionContent
                    futureEvent={this.props.futureEvent}
                    delivery={this.props.delivery}
                    accountOwnerName={this.props.accountOwnerName}
                    accountType={this.props.accountType}
                />
            </div>
        );
    }
}
export default DialogContent;
