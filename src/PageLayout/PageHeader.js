import React, { Component } from 'react';
import './PageHeader.css';
import notification from '../icons/notification.svg';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';

class PageHeader extends Component {
    render() {
        return(
            <div className="page-container">
                <div className="flex">
                    <div className="header-title">
                        <img src={this.props.logo} className="page-logo" alt="icon"/>
                        <p className="page-title">{this.props.title}</p>
                    </div>
                    <div style={{height: '0px', marginTop: '40px'}}>
                        <NotificationBadge 
                            count={this.props.notificationCount} 
                            effect={Effect.SCALE}
                            frameLength={15.0}
                            style={{position: 'inherit', left: '20px', top: '-10px'}}/>
                        <img onClick={this.props.notificationClicked} src={notification} className="notification-icon" alt="icon"/>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default PageHeader;
