import React, { Component } from 'react';
import './PageHeader.css';
import notification from '../icons/notification.svg';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import Notification from './Notification/Notification';
import NotificationDetailsController from './Notification/NotificationDetailsController';

class PageHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPopUp: false,
            notificationClicked: false,
            notifications: [],
            notifcationIndex: 0
        };

        this.notificationClicked = this.notificationClicked.bind(this);
        this.openPopUp = this.openPopUp.bind(this);
        this.closePopUp = this.closePopUp.bind(this);
    }
    componentDidMount() {
        //TODO: query db for notifications
        this.setState({
            notifications: [
                {
                    type: 'recurring_pickup_request',
                    content: '-L5QoXeC_UrL5tRRED3e'
                },
                {
                    type: 'recurring_pickup_confirmed',
                    content: '-XKSIDLeC_Uksd321e'
                },
                {
                    type: 'recurring_pickup_confirmed',
                    content: '-XKSIDLeC_Uksd321e'
                },
                {
                    type: 'recurring_pickup_request',
                    content: '-XKSIDLeC_Uksd321e'
                }
            ] 
        });
    }

    openPopUp(index) {
        // TODO: backend populate notification popup info based on index
        this.setState({
            showPopUp: true,
            notificationClicked: false,
            notifcationIndex: index
        });
    }

    closePopUp() {
        this.setState({
            showPopUp: false
        });
    }

    notificationClicked() {
        this.setState(prevState => {
            return { notificationClicked: !prevState.notificationClicked };
        });
    }

    render() {
        return (
            <div className="page-container">
                <div className="flex">
                    <div className="header-title">
                        <img
                            src={this.props.logo}
                            className="page-logo"
                            alt="icon"
                        />
                        <p className="page-title">{this.props.title}</p>
                    </div>
                    <div style={{ height: '0px', marginTop: '40px' }}>
                        <NotificationBadge
                            count={this.state.notifications.length}
                            effect={Effect.SCALE}
                            frameLength={15.0}
                            style={{
                                position: 'inherit',
                                left: '20px',
                                top: '-10px'
                            }}
                        />
                        <img
                            onClick={this.notificationClicked}
                            src={notification}
                            className="notification-icon"
                            alt="icon"
                        />
                    </div>
                </div>
                <div className="popup-flex">
                    {/* this only shows notification */}
                    {this.state.notificationClicked &&
                        this.state.notifications.map((notification, i) => {
                            return (
                                !notification.claimed && (
                                    <Notification
                                        key={i}
                                        index={i}
                                        notificationType={notification.type}
                                        account={this.props.account.accountType}
                                        clickNotification={this.openPopUp}
                                    />
                                )
                            );
                        })}
                </div>
                <div className="modal-flex">
                    {this.state.showPopUp ?
                        <NotificationDetailsController
                            account={this.props.account}
                            notification={this.state.notifications[this.state.notifcationIndex]}
                            closePopUp={this.closePopUp.bind(this)}/>
                        : null    
                    }
                </div>
            </div>
        );
    }
}

export default PageHeader;
