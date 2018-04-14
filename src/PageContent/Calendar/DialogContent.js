import React, { Component } from 'react';
import './DialogContent.css';
import ReceivingAgencyContent from './ReceivingAgencyContent';

class DialogContent extends Component {
    render() {
        return (
            <div>
                <ReceivingAgencyContent delivery={this.props.delivery} />
            </div>
        );
    }
}
export default DialogContent;
