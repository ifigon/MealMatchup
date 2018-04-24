import React, { Component } from 'react';
import firebase, { deliveriesRef } from '../../FirebaseConfig.js';
import './AssignVolunteers.css';
import Edit from './Edit';
import ConfirmationCard from './ConfirmationCard';
import AssignVolunteersIndex from './AssignVolunteersIndex';
import moment from 'moment';
const db = firebase.database();

class AssignVolunteersController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deliveries: {},
            hitUpdateTime: -1,
            deliveriesExist: true,
            onConfirm: false,
            step: 0,
            selectedDeliveryId: -1,
        };
    }

    // TODO: Add the month navigation header bar

    componentDidMount() {
        let genSupplementaryPromise = (pathPrefix, accountId) => (new Promise(async (resolve, reject) =>
            resolve((await db.ref(`${pathPrefix}/${accountId}`).once('value')).val())));
        
        let genDeliveryListener = (deliveryId) => {
            db.ref(`deliveries/${deliveryId}`).on('value', async (snap) => {
                let delivery = snap.val();

                // kick all promises off
                let donatingAgencyPromise = genSupplementaryPromise('donating_agencies', delivery.donatingAgency);
                let donatingAgencyContactPromise = genSupplementaryPromise('accounts', delivery.daContact);
                let receivingAgencyPromise = genSupplementaryPromise('accounts', delivery.receivingAgency);
                // collect them
                let donatingAgency = await donatingAgencyPromise;
                let donatingAgencyContact = await donatingAgencyContactPromise;
                let receivingAgency = await receivingAgencyPromise;

                delivery.donatingAgency = donatingAgency;
                delivery.daContact = donatingAgencyContact;
                delivery.receivingAgency =  receivingAgency;
                delivery.updatedTime = moment().valueOf();

                this.setState(prevState => {
                    let deliveries = prevState.deliveries;
                    deliveries[deliveryId] = delivery;
                    return {deliveries: deliveries};
                });
            });
        };

        // add listeners for the indices
        let myDeliveriesRef = db.ref(`delivery_indices/${this.props.account.umbrella}/${this.props.account.uid}`)
            .orderByKey().startAt(`${moment().valueOf()}`);

        let processTimestampIndex = (timestampIndex) => {
            for (let deliveryId of Object.keys(timestampIndex)) {
                if (!this.state.deliveries[deliveryId]) {
                    if (!this.state.deliveriesExist) {
                        this.setState({deliveriesExist: true});
                    }
                    genDeliveryListener(deliveryId);
                }
            }
        };
        myDeliveriesRef.on('child_added', async (snap) => processTimestampIndex(snap.val()));
        myDeliveriesRef.on('child_changed', async (snap) => processTimestampIndex(snap.val()));
    }

    componentWillUnmount() {
        // detach all listeners
        for (let deliveryId in Object.keys(this.state.deliveries)) {
            db.ref(`deliveries/${deliveryId}`).off();
        }
        db.ref(`delivery_indices/${this.props.account.umbrella}/${this.props.account.uid}`).off();
    }

    render() {
        return (
            <div className="container assign-volunteers-container">
                {this.showStep()}
                {/* Only show the confirmation card once the database has been updated. The time check 
                    prevents the confirmation card from being displayed until the database triggers a 
                    'value' event and updates our local view of the delivery. */}
                {this.state.onConfirm && this.state.deliveries[this.state.selectedDeliveryId].deliverers 
                    && this.state.hitUpdateTime < this.state.deliveries[this.state.selectedDeliveryId].updatedTime ?
                    <ConfirmationCard
                        handleCloseClick={this.handleCloseClick.bind(this)}
                        handleCancelClick={this.handleCancelClick.bind(this)}
                        delivery={this.state.deliveries[this.state.selectedDeliveryId]}
                    /> :
                    <div />
                }

            </div>
        );

    }

    handleConfirmClick(d1, d2) {
        let updatedTime = moment().valueOf();
        let deliverers = [d1, d2];
        if (this.deliverersAreEqual(deliverers, this.state.deliveries[this.state.selectedDeliveryId].deliverers)) {
            // There was no change. I shouldn't send an update request,
            // I should simply say that this delivery is up to date.
            this.setState(prevState => {
                let deliveries = prevState.deliveries;
                deliveries[this.state.selectedDeliveryId].updatedTime = updatedTime + 1;
                return {
                    deliveries: deliveries,  // indicate that it is up to date, despite not triggering a db event
                    onConfirm: true,
                    hitUpdateTime: updatedTime,
                };
            });
        } else {
            let path = `/${this.state.selectedDeliveryId}/deliverers`;
            let update = {};
            update[path] = deliverers;
            deliveriesRef.update(update).then(() => {
                this.setState({
                    onConfirm: true,
                    hitUpdateTime: updatedTime,
                });
            });
        }   
    }

    deliverersAreEqual(deliverers1, deliverers2) {
        // this is to prevent us trying to make update requests if we don't
        // change the deliverers
        if (!deliverers1 && !deliverers2) {
            return true; // nothing equals nothing
        } else if ((deliverers1 && !deliverers2) || (deliverers2 && !deliverers1) 
                || deliverers1.length !== deliverers2.length) {
            return false;
        }

        for (let i = 0; i < deliverers1.length; i++) {
            let curr1 = deliverers1[i];
            let curr2 = deliverers2[i];
            for (let key in curr1) {
                if (curr1[key] !== curr2[key]) {
                    return false;
                }
            }
        }
        return true;
    }

    handleCloseClick() {
        this.setState({
            onConfirm: false,
        });
    }

    handleEditClick(e) {
        this.setState({
            onConfirm: false,
            step: 1,
            selectedDeliveryId: e.target.id,
        });
    }

    handleCancelClick() {
        this.setState({
            onConfirm: false,
            step: 0,
            selectedDeliveryId: -1,
        });
    }

    showStep() {
        switch(this.state.step) {
        case 0:
            return (
                <AssignVolunteersIndex 
                    handleEditClick={this.handleEditClick.bind(this)}
                    deliveries={this.state.deliveries}
                    deliveriesExist={this.state.deliveriesExist}
                />
            );

        case 1:
            return (
                <Edit
                    delivery={this.state.deliveries[this.state.selectedDeliveryId]}
                    handleConfirmClick={this.handleConfirmClick.bind(this)}
                    handleCancelClick={this.handleCancelClick.bind(this)}
                />
            );
        default:
            return (
                <div />
            );
        }
    }
}

export default AssignVolunteersController;