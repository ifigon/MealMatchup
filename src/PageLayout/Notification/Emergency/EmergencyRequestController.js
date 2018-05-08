import React, { Component } from 'react';
import '../Popup.css';
import { AccountType } from '../../../Enums';
import EmergencyRequestDetails from './EmergencyRequestDetails';
import EmergencyRequestDisclaimer from './EmergencyRequestDisclaimer';
import EnterDriverContact from './EnterDriverContact';
import SucksToSuck from '../Recurring/SucksToSuck';
import firebase from '../../../FirebaseConfig.js';
import EmergencyRequestScheduled from './EmergencyRequestScheduled';
const db = firebase.database();

const accountTypeToDeliveryRequestField = {
    [AccountType.RECEIVING_AGENCY]: 'receivingAgency',
    [AccountType.DELIVERER_GROUP]: 'delivererGroup'
};

function unableToClaim(deliveryRequest, childField, myAccountId) {
    return (
        deliveryRequest[childField] &&
        ((deliveryRequest[childField].claimed &&
            deliveryRequest[childField].claimed !== myAccountId) || // someone's already claimed this event
            (deliveryRequest[childField].requested &&
                deliveryRequest[childField].requested !== myAccountId))
    ); // someone else was requested
}

class EmergencyRequestController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            raPrimaryContact: null
        };
    }

    enterPrimaryContact() {
        this.setState({
            step: 3
        });
    }

    saveDriverInfo(fields) {
        this.setState({
            step: 2,
            raDriver: fields
        });
    }

    nextStep() {
        this.setState(prevState => {
            return { step: prevState.step + 1 };
        });
    }

    claimRequest() {
        let deliveryRequestRef = db.ref(this.props.details.path);
        let claimTransaction = childField => {
            deliveryRequestRef.transaction(deliveryRequest => {
                if (deliveryRequest) {
                    if (
                        !unableToClaim(
                            deliveryRequest,
                            childField,
                            this.props.account.uid
                        )
                    ) {
                        // If none of the above are true, I can take this
                        if (this.state.raPrimaryContact) {
                            deliveryRequest[
                                'raContact'
                            ] = this.state.raPrimaryContact;
                        }
                        deliveryRequest[childField] = {
                            claimed: this.props.account.uid
                        };
                    }
                }
                return deliveryRequest;
            });
        };
        claimTransaction(
            accountTypeToDeliveryRequestField[this.props.account.accountType]
        );
    }

    rejectRequest() {
        // we have to transactionify this, so if someone on the same account claims it while this person is rejecting, we take whichever
        // came first.
        let deliveryRequestRef = db.ref(
            `${this.props.details.path}/${
                accountTypeToDeliveryRequestField[
                    this.props.account.accountType
                ]
            }`
        );
        deliveryRequestRef.transaction(pendingOrRequested => {
            if (pendingOrRequested) {
                if (
                    pendingOrRequested.requested &&
                    pendingOrRequested.requested === this.props.account.uid
                ) {
                    pendingOrRequested = {};
                } else if (
                    pendingOrRequested.pending &&
                    pendingOrRequested.pending[this.props.account.uid]
                ) {
                    delete pendingOrRequested.pending[this.props.account.uid];
                }
            }
            return pendingOrRequested;
        }, this.props.addressNotificationAndClose());
    }

    showStep() {
        let deliveryChildField =
            accountTypeToDeliveryRequestField[this.props.account.accountType];
        let deliveryRequest = this.props.details;

        if (
            deliveryRequest[deliveryChildField] &&
            deliveryRequest[deliveryChildField].claimed ===
                this.props.account.uid
        ) {
            // I've successfully claimed this request
            return (
                <EmergencyRequestScheduled
                    close={this.props.addressNotificationAndClose}
                    details={this.props.details}
                />
            );
        } else if (
            unableToClaim(
                deliveryRequest,
                deliveryChildField,
                this.props.account.uid
            )
        ) {
            // someone has already claimed this event
            return (
                <SucksToSuck close={this.props.addressNotificationAndClose} />
            );
        } else {
            switch (this.state.step) {
            default:
                return (
                    <EmergencyRequestDetails
                        accountType={this.props.account.accountType}
                        details={this.props.details}
                        enterPrimaryContact={this.enterPrimaryContact.bind(
                            this
                        )}
                        nextStep={this.nextStep.bind(this)}
                        close={this.props.closePopUp}
                        onReject={this.rejectRequest.bind(this)}
                    />
                );
            case 2:
                return (
                    <EmergencyRequestDisclaimer
                        account={this.props.account}
                        claimRequest={this.claimRequest.bind(this)}
                        details={this.props.details}
                        close={this.props.closePopUp}
                        raPrimaryContact={this.state.raPrimaryContact}
                    />
                );
            case 3:
                return (
                    <EnterDriverContact
                        accountType={this.props.account.accountType}
                        details={this.props.details}
                        savePrimaryContact={this.savePrimaryContact.bind(
                            this
                        )}
                        close={this.props.closePopUp}
                    />
                );
            }
        }
    }

    render() {
        return <div>{this.showStep()}</div>;
    }
}

export default EmergencyRequestController;
