import React, { Component } from 'react';
import './Popup.css';
import RecurringRequestController from './Recurring/RecurringRequestController';
import close from '../../icons/cross-out.svg';
import { AccountType, NotificationType, NotificationCategory } from '../../Enums';
import RecurringRequestCancelled from './Recurring/RecurringRequestCanceled';
import { NotificationMap } from './NotificationMap';
import RecurringRequestConfirmed from './Recurring/RecurringRequestConfirmed';
import firebase from '../../FirebaseConfig.js';
const db = firebase.database();

class NotificationDetailsController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // TODO: change -> details:{}
            details: {
                status: '',  // Enums.RequestStatus
                startTimestamp: '',  // start date + start hour
                endTimestamp: '',    // end date + end hour
                endCriteria: {
                },
                repeats: '',	// values in Enums.RequestRepeatType
                primaryContact: '',  // uid-key of a donating-agency-member
                notes: '',
                umbrella: '',  // uid-key of a umbrella
                donatingAgency: '',  // autogen-key of a donating-agency
                requester: '',  // name of a donating-agency-member
                receivingAgency: {
                },
                // ADDED FOR DUMMY DATA
                daInfo: {
                    name: '',
                    primaryContact: { 
                    },
                    address: {
                        street1: '',
                        street2: '',
                        city: '',
                        state: '',
                        zipcode: '',
                        officeNo: ''
                    }
                },
                raInfo: {
                    // ADDED FOR DUMMY DATA
                    name: '',
                    address: {
                    },
                    primaryContact: {
                    }
                },
                delivererGroup: {
                    claimed: '',  // uid-key of a DG (once a DG claims)
                },
                dgInfo:{
                },
                requestTimeStamp: '',
                spawnedDeliveries: [
                    // individual deliveries that were created to fulfill this delivery request
                    '-L5RkIS0CSPuXpkewaqA'
                ]
            
            },
            notification: this.props.notification, // HACK to prevent rerendering after we remove the notification
        };
    }

    componentDidMount(){
        let category = NotificationMap[this.state.notification.type].category;
        if (category === NotificationCategory.RECURRING_PICKUP) {
            let genSupplementaryPromise = (pathPrefix, accountId) => (new Promise(async (resolve, reject) =>
                resolve((await db.ref(`${pathPrefix}/${accountId}`).once('value')).val())));

            db.ref(`delivery_requests/${this.props.account.umbrella}/${this.state.notification.content}`)
                .once('value', async (snap) => {
                    let deliveryRequest = snap.val();
                    // kick all promises off
                    let donatingAgencyPromise = genSupplementaryPromise('donating_agencies', deliveryRequest.donatingAgency);
                    let donatingAgencyContactPromise = genSupplementaryPromise('accounts', deliveryRequest.primaryContact);
                    let delivererGroupPromise = (deliveryRequest.delivererGroup && deliveryRequest.delivererGroup.claimed) ?
                        genSupplementaryPromise('accounts', deliveryRequest.delivererGroup.claimed) : null; 
                    let receivingAgencyPromise = (deliveryRequest.receivingAgency && deliveryRequest.receivingAgency.claimed) ? 
                        genSupplementaryPromise('accounts', deliveryRequest.receivingAgency.claimed) : null;

                    // collect them
                    let donatingAgency = await donatingAgencyPromise;
                    let donatingAgencyContact = await donatingAgencyContactPromise;                    
                    let delivererGroup = delivererGroupPromise ? await delivererGroupPromise : null;
                    let receivingAgency = receivingAgencyPromise ? await receivingAgencyPromise : null;

                    // update deliveryRequest with required info
                    deliveryRequest.daInfo = {...donatingAgency, primaryContact: donatingAgencyContact};
                    if (receivingAgency) {
                        deliveryRequest.raInfo = receivingAgency;
                    }
                    if (delivererGroup) {
                        deliveryRequest.dgInfo = delivererGroup;
                    }
                    deliveryRequest.path = `delivery_requests/${this.props.account.umbrella}/${this.state.notification.content}`;
                    this.setState({details: deliveryRequest}); // heavy send
                });
        }
    }

    showDetail() {
        const {
            account,
            closePopUp,
            notificationId,
        } = this.props;
        const {
            notification,
        } = this.state;

        let removeNotification = () => {
            if (this.props.account.accountType === AccountType.DONATING_AGENCY_MEMBER) {
                db.ref(`donating_agencies/${account.agency}/notifications/${notificationId}`).remove();
            } else {
                db.ref(`accounts/${account.uid}/notifications/${notificationId}`).remove();
            }
        };

        let addressAndClose = () => {
            removeNotification();
            closePopUp();
        };

        switch(NotificationMap[this.state.notification.type].color){
        // default color is green
        default:
            return <div className="popup-wrapper recurring" id={`notification-popup-${notificationId}`}>
                <img className="close" src={close} alt="close" onClick={closePopUp} />
                {
                    notification.type === NotificationType.RECURRING_PICKUP_REQUEST && 
                    <RecurringRequestController
                        account={account}
                        closePopUp={closePopUp.bind(this)}
                        details={this.state.details}
                        notificationAddressed={removeNotification}
                    />
                }
                {
                    notification.type === NotificationType.RECURRING_PICKUP_CONFIRMED &&
                    <RecurringRequestConfirmed
                        details={this.state.details}
                        accountType={account.accountType}
                        notificationAddressed={addressAndClose}
                    />
                }
            </div>;
        
        case 'grey':
            return <div className="popup-wrapper recurring-canceled">
                <img className="close" src={close} alt="close" onClick={this.props.closePopUp} />
                <RecurringRequestCancelled
                    notification={notification}
                    details={this.state.details}
                    closePopUp={closePopUp.bind(this)}
                    notificationAddressed={addressAndClose}
                />
            </div>;
        }
    }

    render() {
        return (
            <div>
                {this.showDetail()}
            </div>
        );
    }
}

export default NotificationDetailsController;