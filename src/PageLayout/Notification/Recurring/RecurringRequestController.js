import React, { Component } from 'react';
import '../Popup.css';
import { AccountType } from '../../../Enums';
import RecurringRequestDetails from './RecurringRequestDetails';
import RecurringRequestDisclaimer from './RecurringRequestDisclaimer';
import RecurringRequestClaimed from './RecurringRequestClaimed';
import SucksToSuck from './SucksToSuck';
import EnterPrimaryContact from './EnterPrimaryContact';
import firebase from '../../../FirebaseConfig.js';
const db = firebase.database();

const accountTypeToDeliveryRequestField = {
    [AccountType.RECEIVING_AGENCY]: 'receivingAgency',
    [AccountType.DELIVERER_GROUP]: 'delivererGroup', 
};

class RecurringRequestController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            raPrimaryContact: null
        };
    }

    enterPrimaryContact(){
        this.setState({
            step: 5
        });
    }

    savePrimaryContact(fields){
        this.setState({
            step: 2,
            raPrimaryContact: fields
        });
    }

    nextStep() {
        this.setState((prevState) => {
            return { step: prevState.step + 1 };
        });
    }

    claimRequest() {
        let deliveryRequestRef = db.ref(this.props.details.path);
        let claimTransaction = ((childField) => {
            deliveryRequestRef.transaction((deliveryRequest) => {
                if (deliveryRequest) {
                    if (!(deliveryRequest[childField]
                        && (deliveryRequest[childField].claimed
                        || deliveryRequest[childField].requested !== this.props.account.uid
                        || (deliveryRequest[childField].pending 
                            && !deliveryRequest[childField].pending[this.props.account.uid])))) {
                        // I'm allowed to take this
                        if (this.state.raPrimaryContact) {
                            deliveryRequest['raContact'] = this.state.raPrimaryContact;
                        }
                        deliveryRequest[childField] = {claimed: this.props.account.uid};
                    }
                }
                return deliveryRequest;
            },
            (err, committed, finalSnap) => {
                if (committed && finalSnap.val()[childField].claimed === this.props.account.uid) {
                    this.setState({step: 3});
                } else {
                    this.setState({step: 4});
                }
                this.props.notificationAddressed(); // remove from my list of notifications when transaction completes
            });
        });
        claimTransaction(accountTypeToDeliveryRequestField[this.props.account.accountType]);
    }

    addressAndClose() {
        this.props.notificationAddressed();
        this.props.closePopUp();
    }

    rejectRequest() {
        // we have to transactionify this, so if someone on the same account claims it while this person is rejecting, we take whichever
        // came first.
        let deliveryRequestRef = db.ref(`${this.props.details.path}/${accountTypeToDeliveryRequestField[this.props.account.accountType]}`);
        deliveryRequestRef.transaction((pendingOrRequested) => {
            if (pendingOrRequested) {
                if (pendingOrRequested.requested && pendingOrRequested.requested === this.props.account.uid) {
                    pendingOrRequested = {};
                } else if (pendingOrRequested.pending &&  pendingOrRequested.pending[this.props.account.uid]) {
                    delete pendingOrRequested.pending[this.props.account.uid];
                }
            }
            return pendingOrRequested;
        },
        this.addressAndClose.bind(this));
    }

    showStep() {
        switch (this.state.step) {
        default:
            return <RecurringRequestDetails
                accountType={this.props.account.accountType} 
                details={this.props.details}
                enterPrimaryContact={this.enterPrimaryContact.bind(this)}
                nextStep={this.nextStep.bind(this)}
                close={this.props.closePopUp}
                onReject={this.rejectRequest.bind(this)}
            />;
        case 2:
            return <RecurringRequestDisclaimer
                accountType={this.props.account.accountType}
                claimRequest={this.claimRequest.bind(this)}
                details={this.props.details}
                nextStep={this.nextStep.bind(this)}
                close={this.props.closePopUp}
                raPrimaryContact={this.state.raPrimaryContact}
            />;

        case 3:
            return <RecurringRequestClaimed
                accountType={this.props.account.accountType}
                details={this.props.details}
                raPrimaryContact={this.state.raPrimaryContact}
                nextStep={this.nextStep.bind(this)}
            />;
        case 4:
            return <SucksToSuck 
                close={this.props.closePopUp}
            />;
        case 5:
            return <EnterPrimaryContact
                accountType={this.props.account.accountType}
                details={this.props.details}
                savePrimaryContact={this.savePrimaryContact.bind(this)}
                close={this.props.closePopUp}
            />;
        }
    }

    render() {
        return (
            <div>
                {this.showStep()}
            </div>
        );
    }
}

export default RecurringRequestController;