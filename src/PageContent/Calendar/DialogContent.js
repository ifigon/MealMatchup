import React, { Component } from 'react';
import './DialogContent.css';
import DelivererGroupContent from './DelivererGroupContent';

class DialogContent extends Component {
    render() {
        return (
            <div>
                <DelivererGroupContent
                    accountType={this.props.accountType}
                    futureEvent={this.props.futureEvent}
                    delivererGroup={this.props.delivererGroup}
                    delivery={this.props.delivery}
                />
            </div>
        );
    }
}
export default DialogContent;
