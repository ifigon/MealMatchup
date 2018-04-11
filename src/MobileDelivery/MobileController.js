import React from 'react';
import './Mobile.css';
import MobileStart from './MobileStart';
import MobilePickup from './MobilePickup';
import MobileDelivery from './MobileDelivery';
import MobileComplete from './MobileComplete';

import firebase from '../FirebaseConfig.js';
const db = firebase.database();

class MobileController extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            umbrellaId: '',
            deliveryId: '',
            deliveryDbRefPath: '',
            deliveryObj: {
                date: '',
                startTime: '',
                endTime: '',
                isEmergency: null,
                donatingAgency: {},
                receivingAgency: {},
                delivererGroup: { // delivererGroup is null if isEmergency=true
                    group: '', 
                    deliverers: [],
                },
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

            // TODO: add these fields to deliveryObject
            // TODO: save signatures as image
            currentDelivery: {
                temp: '',
                daSignature: '',
                raSignature: '',
                raPrintName: '',
                timePickedUp: '',
                timeCompleted: '',
                deliveryCompleted: false
            },
            step: 0
        };
        this.showStep = this.showStep.bind(this);
        this.showStart = this.showStart.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.saveValues = this.saveValues.bind(this);
    }

    componentDidMount() {
        let { uId: umbrellaId, dId: deliveryId } = this.props.match.params;
        let deliveryDbRefPath = `deliveries/${umbrellaId}/${deliveryId}`;
        this.setState({ 
            umbrellaId: umbrellaId, 
            deliveryId: deliveryId,
            deliveryDbRefPath: deliveryDbRefPath, 
        });

        db.ref(deliveryDbRefPath).on('value', (snapshot) => {
            let deliveryData = snapshot.val();
            console.log(deliveryData);
            this.aggrDelivery(deliveryData);
        });
    }

    componentWillUnmount() {
        //detach listener
        db.ref(this.state.deliveryDbRefPath).off();
    }

    async aggrDelivery(deliveryData) {
        this.fetchDa(deliveryData.donatingAgency);
        this.fetchRa(deliveryData.receivingAgency);
        
        // get delivererGroup name
        let dgObj = await db.ref(`accounts/${deliveryData.delivererGroup.group}`).once('value');
        deliveryData.delivererGroup.group = dgObj.name;
        
        this.setState({ deliveryObj: this.aggrDeliveryObj(deliveryData)});
    }
    
    aggrDeliveryObj(rawDelivery) {
        let deliveryObj = ( // pick entries from rawDelivery
            ({ description, delivererGroup, notes, isEmergency }) => ({ description, delivererGroup, notes, isEmergency })
        )(rawDelivery);
        let startTimeObj = new Date(rawDelivery.startTimestamp * 1000);
        let endTimeObj = new Date(rawDelivery.endTimestamp * 1000);

        // 2018-02-17
        deliveryObj.date = `${ startTimeObj.getFullYear() }-${ this.addZero(startTimeObj.getMonth()) }-${ this.addZero(startTimeObj.getDate()) }`;
        // 9:00
        deliveryObj.startTime = `${ this.addZero(startTimeObj.getHours()) }:${ this.addZero(startTimeObj.getMinutes()) }`;
        // 17:00
        deliveryObj.endTime = `${ this.addZero(endTimeObj.getHours()) }:${ this.addZero(endTimeObj.getMinutes()) }`;
        return deliveryObj;
    }

    addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    async fetchDa(rawDa) {
        let daPromise = new Promise( async (resolve, reject) => {
            let daSnapshot = await db.ref(`donating_agencies/${rawDa.agency}`).once('value');
            resolve(daSnapshot.val())
        });

        let daMemberPromise = new Promise( async (resolve, reject) => {
            let daMemberSnapshot = await db.ref(`accounts/${rawDa.primaryContact}`).once('value');
            resolve(daMemberSnapshot.val())
        });

        let daData = await Promise.all([daPromise, daMemberPromise])
        this.aggrDa(daData[0], daData[1]);
    }

    aggrDa(daData, daMemberData) {
        let pickedPrimaryContact = (
            ({ position, name, email, phone }) => ({ position, name, email, phone })
        )(daMemberData);
        
        let daObj = {
            primaryContact: pickedPrimaryContact,
            agency: daData.name,
            address: this.aggrAddress(daData.address),
        };
        this.setState({ donatingAgency: daObj});
    }

    async fetchRa(rawRa) {
        let raSnapshot = await db.ref(`accounts/${rawRa.agency}`).once('value');
        this.aggrRa(raSnapshot.val(), rawRa.primaryContact);
    }

    aggrRa(raMeta, raPrimaryContact) {
        let raObj = {
            primaryContact: raPrimaryContact,
            agency: raMeta.name,
            notes: raMeta.deliveryNotes,
            address: this.aggrAddress(raMeta.address),
        };
        this.setState({ receivingAgency: raObj});
    }

    aggrAddress(rawAddress) {
        let address = rawAddress;
        // street2 and officeNo fallback
        address.street2 = rawAddress.street2 ? rawAddress.street2 : '';
        address.officeNo = rawAddress.officeNumber ? rawAddress.officeNumber : '';
        return address;
    }

    showStart(){
        this.setState({
            step: 1
        });
    }

    nextStep () {
        this.setState((prevState) => {
            return { step: prevState.step + 1 };
        });
    }

    // TODO: Save completed delivery
    saveValues(fields) {
        this.setState({
            currentDelivery: Object.assign({}, this.state.currentDelivery, fields)
        });
    }

    showStep() {
        switch (this.state.step) {
        default:
            return <MobileStart 
                deliveryObj={this.state.deliveryObj}
                da={this.state.donatingAgency} 
                ra={this.state.receivingAgency}
                showStart={this.showStart}/>;
        case 1:
            return <MobilePickup 
                deliveryObj={this.state.deliveryObj} 
                da={this.state.donatingAgency} 
                ra={this.state.receivingAgency} 
                nextStep={this.nextStep}
                saveValues={this.saveValues}
            />;
        case 2:
            return <MobileDelivery 
                deliveryObj={this.state.deliveryObj} 
                da={this.state.donatingAgency} 
                ra={this.state.receivingAgency} 
                nextStep={this.nextStep}
                currentDelivery={this.state.currentDelivery}
                saveValues={this.saveValues}
            />;
        case 3: 
            return <MobileComplete 
                deliveryObj={this.state.deliveryObj} 
                da={this.state.donatingAgency} 
                ra={this.state.receivingAgency} 
                currentDelivery={this.state.currentDelivery}
            />;
        }
    }

    render() {
        return (
            <div className="mobile-wrapper">
                {this.state.deliveryObj.deliveryCompleted ?
                    <MobileComplete 
                        deliveryObj={this.state.deliveryObj} 
                        da={this.state.donatingAgency} 
                        ra={this.state.receivingAgency}/>
                    :
                    this.showStep()
                }
            </div>
        );
    }
}

export default MobileController;