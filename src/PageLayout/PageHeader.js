import React, { Component } from 'react';
import './PageHeader.css';
import notification from '../icons/notification.svg';
import NotificationBadge from 'react-notification-badge';
import { AccountType } from '../Enums.js';
import { Effect } from 'react-notification-badge';
import Notification from './Notification/Notification';
import NotificationDetailsController from './Notification/NotificationDetailsController';
import firebase, { accountsRef } from '../FirebaseConfig.js';
const db = firebase.database();

class PageHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPopUp: false,
            notificationClicked: false,
            notifications: [],
            notificationIndex: 0,
            notificationsRef: null,
        };

        this.notificationClicked = this.notificationClicked.bind(this);
        this.openPopUp = this.openPopUp.bind(this);
        this.closePopUp = this.closePopUp.bind(this);
    }

    componentDidMount() {
        let ref;
        if (this.props.account.accountType === AccountType.DONATING_AGENCY_MEMBER) {
            ref = db.ref(`donating_agencies/${this.props.account.agency}/notifications`);
        } else {
            ref = accountsRef.child(`${this.props.account.uid}/notifications`);
        }
        ref.on('value', (snap) => this.setState({notifications: snap.val() ? snap.val() : []}));
        this.setState({notificationsRef: ref});
    }

    componentWillUnmount() {
        this.state.notificationsRef.off();
    }

    openPopUp(index) {
        this.setState({
            showPopUp: true,
            notificationClicked: false,
            notificationIndex: index
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
                        {/* TODO: replace with account logo */}
                        <img src={''} className="page-logo" alt="" />
                        <p className="page-title">{this.props.title}</p>
                    </div>
                    <div style={{ height: '0px', marginTop: '40px' }}>
                        <NotificationBadge
                            count={Object.keys(this.state.notifications).length}
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
                        Object.keys(this.state.notifications).map((notificationKey) => {
                            return (
                                <Notification
                                    key={notificationKey}
                                    index={notificationKey}
                                    notificationType={this.state.notifications[notificationKey].type}
                                    clickNotification={this.openPopUp}
                                />
                                
                            );
                        })}
                </div>
                <div className="modal-flex">
                    {this.state.showPopUp ?
                        <NotificationDetailsController
                            account={this.props.account}
                            notificationId={this.state.notificationIndex}
                            notification={this.state.notifications[this.state.notificationIndex]}
                            closePopUp={this.closePopUp.bind(this)}/>
                        : null    
                    }
                </div>
            </div>
        );
    }
}

export default PageHeader;
