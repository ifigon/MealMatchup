import React, { Component } from 'react';
import firebase, { auth, deliveriesRef } from '../../FirebaseConfig.js';
import './AssignVolunteers.css';
import Edit from './Edit';
import Confirmation from './Confirmation';
import AssignVolunteersIndex from './AssignVolunteersIndex';
import {DeliveryStatus} from '../../Enums.js';

class AssignVolunteersController extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deliveries: {},
            step: 0,
            selectedDeliveryId: -1,
            onConfirm: false
        };
    }

    // TODO: Add the month navigation header bar

    componentDidMount() {
        //TODO (jkbach): can I get uid from props.account?
        let genAccountPromise = (deliveryId, accountId) => new Promise(async (resolve, reject) => {
            let snap = await firebase.database().ref(`accounts/${accountId}`).once('value');
            resolve({deliveryId: deliveryId,
                     account: snap.val()})
        });
        let genDAPromise = (deliveryId, accountId) => new Promise(async (resolve, reject) => {
            let snap = await firebase.database().ref(`donating_agencies/${accountId}`).once('value');
            resolve({deliveryId: deliveryId,
                     agency: snap.val()});
        });

        deliveriesRef.child(this.props.account.umbrella).orderByChild('delivererGroup')
            .equalTo(auth.currentUser.uid).on("value", async (snap) => {
                let donatingAgenciesContactPromises = [];
                let donatingAgenciesPromises = [];
                let receivingAgenciesPromises = [];
                let deliveries = {};
                for (let deliveryId in snap.val()) {
                    if (deliveryId === "L5RkIS0CSPuXpkewaqA") {
                        continue;  // TODO (jkbach): this is a hack because this entry is messed up and is breaking things. probably old data
                    }
                    let curr = snap.val()[deliveryId];
                    if (curr.status !== DeliveryStatus.COMPLETED) {
                        deliveries[deliveryId] = curr;
                        donatingAgenciesContactPromises.push(genAccountPromise(deliveryId, curr.daContact));
                        donatingAgenciesPromises.push(genDAPromise(deliveryId, curr.donatingAgency));
                        receivingAgenciesPromises.push(genAccountPromise(deliveryId, curr.receivingAgency));
                    }
                }

                // TODO (jkbach): this is so gross. None of these depend on each other, why do they have to be in sequence?
                let donatingAgencyContacts = await Promise.all(donatingAgenciesContactPromises);
                let receivingAgencies = await Promise.all(receivingAgenciesPromises);
                let donatingAgencies = await Promise.all(donatingAgenciesPromises);

                for (const contact of donatingAgencyContacts) {
                    deliveries[contact.deliveryId].daContact = contact.account;
                }
                for (const receivingAgency of receivingAgencies) {
                    deliveries[receivingAgency.deliveryId].receivingAgency = receivingAgency.account.name;
                }
                for (const donatingAgency of donatingAgencies) {
                    console.log(donatingAgency);
                    deliveries[donatingAgency.deliveryId].donatingAgency = donatingAgency.agency;
                }
                this.setState({deliveries: deliveries});
            });
    }

    render() {
        return (
            <div className="container assign-volunteers-container">

                {this.showStep()}
                {this.state.onConfirm ?
                    <Confirmation
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
        let deliverers = [d1, d2];
        let path = `/${this.props.account.umbrella}/${this.state.selectedDeliveryId}/deliverers`;
        let update = {}
        update[path] = deliverers;
        deliveriesRef.update(update).then(() => {
            this.setState({
                onConfirm: true
            });
        });
    }

    handleCloseClick() {
        this.setState({
            onConfirm: false
        });
    }

    handleEditClick(e) {
        this.setState({
            onConfirm: false,
            step: 1,
            selectedDeliveryId: e.target.id
        });
    }

    handleCancelClick() {
        this.setState({
            onConfirm: false,
            step: 0
        });
    }

    showStep() {
        switch(this.state.step) {

        case 0:
            return (
                <AssignVolunteersIndex 
                    handleEditClick={this.handleEditClick.bind(this)}
                    deliveries={this.state.deliveries}
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