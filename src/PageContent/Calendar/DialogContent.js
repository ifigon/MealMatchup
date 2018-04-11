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
                    deliverer1={this.props.deliverer1}
                    phone1={this.props.phone1}
                    deliverer2={this.props.deliverer2}
                    phone2={this.props.phone2}
                    email1={this.props.email1}
                    email2={this.props.email2}
                />
            </div>
        );
    }
}
export default DialogContent;
