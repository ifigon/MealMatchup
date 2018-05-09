import React, { Component } from 'react';
import './FoodLogsContainer.css';
import FoodLogItem from './FoodLogItem';
import { AccountType, DeliveryStatus } from '../../Enums';
import { accountsRef, deliveriesRef, deliveryIndicesRef, donatingAgenciesRef } from '../../FirebaseConfig';
import pick from 'lodash.pick';

class FoodLogsContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            deliveries:[]
        };
    }

    async aggrFoodLogsInfo(rawDeliveries) {    
        const filteredRawDeliveries = rawDeliveries.filter(
            rawDelivery => rawDelivery.status === DeliveryStatus.COMPLETED
        );
        const agenciesInfoPromisesList = filteredRawDeliveries.map(rawDelivery => {
            const agenciesInfoPromise = this.makeAgenciesInfoPromise( 
                rawDelivery.delivererGroup,
                rawDelivery.receivingAgency, 
                rawDelivery.donatingAgency, 
                rawDelivery.daContact,
            );
            return new Promise( async (resolve, reject) => {
                const agenciesInfo = await Promise.all(agenciesInfoPromise);
                resolve(agenciesInfo);
            });
        });
        const agenciesInfoList = await Promise.all(agenciesInfoPromisesList);
        this.aggrDeliveries(filteredRawDeliveries, agenciesInfoList);
    }

    async fetchDeliveries() {
        const { account } = this.props; 
        const agencyUid = 
            account.accountType === AccountType.DONATING_AGENCY_MEMBER ? 
            account.agency : account.uid; 
        // get all deliveries' ids of this agency 
        const deliveiesIdList = [];
        const deliveriesIdSnapshot = await deliveryIndicesRef.child(`${account.umbrella}/${agencyUid}`).once('value');
        deliveriesIdSnapshot.forEach(dailyDeliveriesIdSnapshot =>
            dailyDeliveriesIdSnapshot.forEach(deliveryId => {
                deliveiesIdList.push(deliveryId.key);
            })
        );
        // construct and resolve promises to fetch all deliveries
        const deliveryPromisesList = deliveiesIdList.map(deliveryId => 
            new Promise( async (resolve, reject) => {
                const rawDelivery = await deliveriesRef.child(deliveryId).once('value');
                resolve(rawDelivery.val());
        }));
        return Promise.all(deliveryPromisesList);
    }


    async componentDidMount(){
        const rawDeliveries = await this.fetchDeliveries();
        this.aggrFoodLogsInfo(rawDeliveries);


        //TODO: [backend] query completed deliveries
        // this.setState({
        //     deliveries: [
        //         {   
        //             status: 'completed',  // Enums.DeliveryStatus
        //             startTimestamp: 1521295200000,  // (ms)
        //             endTimestamp: 1521302400000,  // (ms)
        //             timezone: 'America/Los_Angeles',  // same as spawningDeliveryRequest's
        //             isEmergency: false,
        //             spawningDeliveryRequest: '-L5QoXeC_UrL5tRRED3e',
        //             donatingAgency: { //uid replaced by info
        //                 name: 'Local Point'
        //             }, 
        //             daContact: { //uid replaced by info
        //                 email: 'andrea@uw.edu',
        //                 name: 'Andrea Benson',
        //                 phone: '206-666-6666',
        //             }, 
        //             delivererGroup: {
        //                 name: 'UW Green Greeks' //uid replace by info
        //             },
        //             deliverers: [
        //                 {
        //                     email: 'd1@test.com',
        //                     name: 'deliverer1',
        //                     phone: '111-111-111'
        //                 },
        //                 {
        //                     email: 'd2@test.com',
        //                     name: 'deliverer2',
        //                     phone: '111-111-111'
        //                 }
        //             ],
        //             description: {
        //                 foodItems:[
        //                     {
        //                         food: 'salad',
        //                         quantity: '5',
        //                         unit: 'lb'
        //                     },
        //                     {
        //                         food: 'banana',
        //                         quantity: '50',
        //                         unit: 'lb'
        //                     }
        //                 ]
        //             },
        //             notes: '4/9, mon x4, 1-3p, none requested',
        //             raContact: {
        //                 email: 'refigerator@uniongospel.org',
        //                 name: 'Bob Vance',
        //                 phone: '111-222-3333',
        //             },
        //             receivingAgency: { //uid replaced by info
        //                 name: 'Seattle Union Gospel'
        //             },
        //             pickedUpInfo: {
        //                 temperature: 29,  // in F
        //                 signature: 'John Smith',
        //                 timestamp: 1523174874685
        //             },
        //             deliveredInfo: {
        //                 signature: 'Ellen Blake',
        //                 timestamp: 1523174892769
        //             }
        //         },
        //         {   
        //             status: 'completed',  // Enums.DeliveryStatus
        //             startTimestamp: 1521295200000,  // (ms)
        //             endTimestamp: 1521302400000,  // (ms)
        //             timezone: 'America/Los_Angeles',  // same as spawningDeliveryRequest's
        //             isEmergency: false,
        //             spawningDeliveryRequest: '-L5QoXeC_UrL5tRRED3e',
        //             donatingAgency: { //uid replaced by info
        //                 name: 'Local Point'
        //             }, 
        //             daContact: { //uid replaced by info
        //                 email: 'andrea@uw.edu',
        //                 name: 'Andrea Benson',
        //                 phone: '206-666-6666',
        //             }, 
        //             delivererGroup: {
        //                 name: 'UW Green Greeks' //uid replace by info
        //             },
        //             deliverers: [
        //                 {
        //                     email: 'd1@test.com',
        //                     name: 'deliverer1',
        //                     phone: '111-111-111'
        //                 },
        //                 {
        //                     email: 'd2@test.com',
        //                     name: 'deliverer2',
        //                     phone: '111-111-111'
        //                 }
        //             ],
        //             description: {
        //                 foodItems:[
        //                     {
        //                         food: 'salad',
        //                         quantity: '5',
        //                         unit: 'lb'
        //                     },
        //                     {
        //                         food: 'banana',
        //                         quantity: '50',
        //                         unit: 'lb'
        //                     },
        //                     {
        //                         food: 'apple',
        //                         quantity: '50',
        //                         unit: 'lb'
        //                     },
        //                     {
        //                         food: 'orange',
        //                         quantity: '50',
        //                         unit: 'lb'
        //                     },
        //                     {
        //                         food: 'pineapple',
        //                         quantity: '50',
        //                         unit: 'lb'
        //                     },
        //                     {
        //                         food: 'carrot',
        //                         quantity: '2',
        //                         unit: 'lb'
        //                     },
        //                     {
        //                         food: 'watermelon',
        //                         quantity: '32',
        //                         unit: 'cases'
        //                     },
        //                     {
        //                         food: 'cupcakes',
        //                         quantity: '200',
        //                         unit: 'lb'
        //                     },
        //                     {
        //                         food: 'grapes',
        //                         quantity: '2',
        //                         unit: 'loaves'
        //                     }
        //                 ]
        //             },
        //             notes: '4/9, mon x4, 1-3p, none requested',
        //             raContact: {
        //                 email: 'refigerator@uniongospel.org',
        //                 name: 'Bob Vance',
        //                 phone: '111-222-3333',
        //             },
        //             receivingAgency: { //uid replaced by info
        //                 name: 'Seattle Union Gospel'
        //             },
        //             pickedUpInfo: {
        //                 temperature: 29,  // in F
        //                 signature: 'John Smith',
        //                 timestamp: 1523174874685
        //             },
        //             deliveredInfo: {
        //                 signature: 'Ellen Blake',
        //                 timestamp: 1523174892769
        //             }
        //         }
        //     ]
        // });
    }

    makeAgenciesInfoPromise(dgId, raId, daId, daContactId) {
        const dgPromise = new Promise( async (resolve, reject) => {
            const dgSnapshot = await accountsRef.child(dgId).once('value');
            resolve(dgSnapshot.val());
        });
        const raPromise = new Promise( async (resolve, reject) => {
            const raSnapshot = await accountsRef.child(raId).once('value');
            resolve(raSnapshot.val());
        });
        const daPromise = new Promise( async (resolve, reject) => {
            const daSnapshot = await donatingAgenciesRef.child(daId).once('value');
            resolve(daSnapshot.val());
        });
        const daContactPromise = new Promise( async (resolve, reject) => {
            const daSnapshot = await accountsRef.child(daContactId).once('value');
            resolve(daSnapshot.val());
        });
        return [dgPromise, raPromise, daPromise, daContactPromise]; 
    }
    
    aggrDeliveries(rawDeliveries, agenciesInfoList) {
        const deliveries = rawDeliveries.map((delivery, i) => {
            const agenciesInfo = agenciesInfoList[i];
            const dgInfo = agenciesInfo[0];
            const raInfo = agenciesInfo[1];
            const daInfo = agenciesInfo[2];
            const daContactInfo = agenciesInfo[3];
            delivery.delivererGroup = dgInfo.name;
            delivery.receivingAgency = raInfo.name;
            delivery.donatingAgency = daInfo.name;
            delivery.daContact = pick(daContactInfo, ['name', 'phone']);
            return delivery;
        })
        this.setState({deliveries: deliveries});
        console.log(this.props.account);
    }

    render(){
        console.log(this.state.deliveries);
        return(
            <div className="food-container ">
                {/* TODO: Filter feature */}
                {
                    this.state.deliveries.map((completedDelivery, i) => {
                        return (
                            <FoodLogItem delivery={completedDelivery} key={i}/>
                        );
                    })
                }
            </div>
        );
    }
}
export default FoodLogsContainer;