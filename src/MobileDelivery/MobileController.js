import React from 'react';
import './Mobile.css';
import MobileStart from './MobileStart';
import MobilePickup from './MobilePickup';
import MobileDelivery from './MobileDelivery';
import MobileComplete from './MobileComplete';
import { DeliveryStatus } from '../Enums';
import moment from 'moment';

import firebase from '../FirebaseConfig';
const db = firebase.database();

class MobileController extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            deliveryDbRefPath: '',
            deliveryObj: {
                startTime: '',
                endTime: '',
                isEmergency: null,
                donatingAgency: '',
                daContact: '',
                receivingAgency: '',
                raContact: {},
                delivererGroup: '',  // delivererGroup is null if isEmergency=true
                deliverers: [],
                description: {},
                notes: ''
            },
            receivingAgency :{
                agency: '',
                primaryContact: {},
                notes: '',
                address: {},
            },
            donatingAgency :{
                agency: '',
                primaryContact: {},
                address: {},
            },
            showSummary: false,
        };
        this.renderView = this.renderView.bind(this);
        this.toggleShowSummary = this.toggleShowSummary.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        const deliveryDbRefPath = `deliveries/${id}`;
        this.setState({ deliveryDbRefPath: deliveryDbRefPath });

        db.ref(deliveryDbRefPath).on('value', (snapshot) => {  // listen data onchange
            const deliveryData = snapshot.val();
            this.aggrDelivery(deliveryData);
        });
    }

    componentWillUnmount() {
        db.ref(this.state.deliveryDbRefPath).off();  // detach listener
    }

    async aggrDelivery(deliveryData) {
        this.fetchDa(deliveryData.donatingAgency, deliveryData.daContact);
        this.fetchRa(deliveryData.receivingAgency, deliveryData.raContact);

        if (deliveryData.delivererGroup) { // Non-Emergency Pick Up: deliveryData.delivererGroup != null
            // get delivererGroup name
            let dgObj = await db.ref(`accounts/${deliveryData.delivererGroup}`).once('value');
            deliveryData.delivererGroup = dgObj.val().name;           
        } else { // Emergency Pick Up: deliveryData.delivererGroup == null
            deliveryData.delivererGroup = '';
            deliveryData.deliverers = [];
        }

        this.setState({ deliveryObj: this.getDeliveryObj(deliveryData)});
    }
    
    getDeliveryObj(rawDelivery) {
        let deliveryObj = ( // pick entries from rawDelivery
            ({ description, delivererGroup, deliverers, notes, isEmergency, status, pickedUpInfo, deliveredInfo }) => 
                ({ description, delivererGroup, deliverers, notes, isEmergency, status, pickedUpInfo, deliveredInfo })
        )(rawDelivery);

        let startTimeObj = moment(rawDelivery.startTimestamp);
        let endTimeObj = moment(rawDelivery.endTimestamp);

        deliveryObj.startTime = startTimeObj;
        deliveryObj.endTime = endTimeObj;
        return deliveryObj;
    }

    async fetchDa(daId, daContactId) {
        let daPromise = new Promise( async (resolve, reject) => {
            let daSnapshot = await db.ref(`donating_agencies/${daId}`).once('value');
            resolve(daSnapshot.val());
        });

        let daMemberPromise = new Promise( async (resolve, reject) => {
            let daMemberSnapshot = await db.ref(`accounts/${daContactId}`).once('value');
            resolve(daMemberSnapshot.val());
        });

        let daData = await Promise.all([daPromise, daMemberPromise]);
        this.aggrDa(daData[0], daData[1]);
    }

    aggrDa(daData, daMemberData) {
        let pickedPrimaryContact = (
            ({ position, name, email, phone }) => ({ position, name, email, phone })
        )(daMemberData);
        
        let daObj = {
            primaryContact: pickedPrimaryContact,
            agency: daData.name,
            address: daData.address,
        };
        this.setState({ donatingAgency: daObj});
    }

    async fetchRa(raId, raContact) {
        let raSnapshot = await db.ref(`accounts/${raId}`).once('value');
        this.aggrRa(raSnapshot.val(), raContact);
    }

    aggrRa(raMeta, raPrimaryContact) {
        let raObj = {
            primaryContact: raPrimaryContact,
            agency: raMeta.name,
            notes: raMeta.deliveryNotes,
            address: raMeta.address,
        };
        this.setState({ receivingAgency: raObj});
    }

    toggleShowSummary() {
        this.setState(prevState => ({ 
            showSummary: !prevState.showSummary
        }));
    }

    renderView() {
        switch (this.state.deliveryObj.status) {
        case DeliveryStatus.SCHEDULED:
            return <MobileStart 
                deliveryObj={this.state.deliveryObj}
                da={this.state.donatingAgency} 
                ra={this.state.receivingAgency}
                dbRef={this.state.deliveryDbRefPath}/>;
        case DeliveryStatus.STARTED:
            return <MobilePickup 
                deliveryObj={this.state.deliveryObj} 
                da={this.state.donatingAgency} 
                ra={this.state.receivingAgency} 
                dbRef={this.state.deliveryDbRefPath}
            />;
        case DeliveryStatus.PICKED_UP:
            return <MobileDelivery 
                deliveryObj={this.state.deliveryObj} 
                da={this.state.donatingAgency} 
                ra={this.state.receivingAgency} 
                dbRef={this.state.deliveryDbRefPath}
                toggleShowSummary={this.toggleShowSummary}
            />;
        case DeliveryStatus.COMPLETED: 
            return <MobileComplete 
                deliveryObj={this.state.deliveryObj} 
                da={this.state.donatingAgency} 
                ra={this.state.receivingAgency} 
                showSummary={this.state.showSummary}
                toggleShowSummary={this.toggleShowSummary}
            />;
        default:
            return null;
        }
    }

    render() {
        if (this.state.donatingAgency.agency && 
            this.state.receivingAgency.agency && 
            this.state.deliveryObj.delivererGroup !== null) { // return view if all data is back
            return (
                <div className="mobile-wrapper">
                    { this.renderView() } 
                </div>
            );
        }
        return null;
    }
}

export default MobileController;