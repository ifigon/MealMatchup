import React, { Component } from 'react';
import './PageHeader.css';
import notification from '../icons/notification.svg';
class PageHeader extends Component {
    render() {
        return(
            <div className="page-container">
                <div className="flex">
                    <img src={this.props.logo} className="page-logo" alt="icon"/>
                    <p className="page-title">{this.props.title}</p>
                    <img onClick={this.props.hover} src={notification} className="notification-icon" alt="icon"/>
                </div>
                
            </div>
        );
    }
}

export default PageHeader;
