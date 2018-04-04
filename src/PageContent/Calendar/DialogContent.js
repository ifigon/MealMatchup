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
                    delivererGroup="Green Greeks"
                    deliverer1="Blake Johnson"
                    phone1="(206-389-2318)"
                    deliverer2="Erika Zhang"
                    phone2="(206-876-5432)"
                />
            </div>
        );
    }
}
export default DialogContent;
