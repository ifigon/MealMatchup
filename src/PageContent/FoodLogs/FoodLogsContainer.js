import React, { Component } from 'react';
import './FoodLogsContainer.css';
import FoodLogItem from './FoodLogItem';
import FoodLogStats from './FoodLogStats';
import { AccountType, DeliveryStatus } from '../../Enums';
import { accountsRef, deliveriesRef, deliveryIndicesRef, donatingAgenciesRef } from '../../FirebaseConfig';
import moment from 'moment';
import { pick } from 'lodash';

class FoodLogsContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            deliveries: null,
        };
    }

    async componentDidMount(){
        const rawDeliveries = await this.fetchDeliveries();
        this.aggrFoodLogsInfo(rawDeliveries);
    }

    async fetchDeliveries() {
        const { account } = this.props; 
        const agencyUid = 
            account.accountType === AccountType.DONATING_AGENCY_MEMBER ? account.agency : account.uid; 
        // get all deliveries' id under this agency 
        const deliveriesIdList = [];
        if (account.accountType === AccountType.UMBRELLA) {
            const dailyDeliveriesIdSet = new Set();
            const agenciesDeliveriesIdSnap = await deliveryIndicesRef.child(agencyUid).once('value');
            agenciesDeliveriesIdSnap.forEach(AgencyDeliveriesIdSnap =>
                AgencyDeliveriesIdSnap.forEach(dailyDeliveriesIdSnapshot => {
                    if (!dailyDeliveriesIdSet.has(dailyDeliveriesIdSnapshot.key)) { // filter out duplicates
                        dailyDeliveriesIdSnapshot.forEach(deliveryId => {
                            deliveriesIdList.push(deliveryId.key);
                        });
                        dailyDeliveriesIdSet.add(dailyDeliveriesIdSnapshot.key);
                    }
                })
            );    
        } else {
            const now = moment().valueOf().toString();
            const deliveriesIdSnapshot = 
                await deliveryIndicesRef.child(`${account.umbrella}/${agencyUid}`).orderByKey().endAt(now).once('value'); 
            deliveriesIdSnapshot.forEach(dailyDeliveriesIdSnapshot =>
                dailyDeliveriesIdSnapshot.forEach(deliveryId => {
                    deliveriesIdList.push(deliveryId.key);
                })
            );
        }
        // construct and resolve promises to fetch all deliveries
        const deliveryPromisesList = deliveriesIdList.map(deliveryId => 
            new Promise( async (resolve, reject) => {
                const rawDelivery = await deliveriesRef.child(deliveryId).once('value');
                resolve(rawDelivery.val());
            })
        );
        return Promise.all(deliveryPromisesList);
    }

    async aggrFoodLogsInfo(rawDeliveries) {    
        const filteredRawDeliveries = rawDeliveries.filter(
            rawDelivery => rawDelivery.status === DeliveryStatus.COMPLETED
        );
        const deliveryPromisesList = filteredRawDeliveries.map(rawDelivery => {
            const agenciesInfoPromise = this.makeAgenciesInfoPromise( 
                rawDelivery.delivererGroup,
                rawDelivery.receivingAgency, 
                rawDelivery.donatingAgency, 
                rawDelivery.daContact,
            );
            return new Promise( async (resolve, reject) => {
                const agenciesInfo = await Promise.all(agenciesInfoPromise);
                const delivery = this.aggrDelivery(rawDelivery, agenciesInfo);
                resolve(delivery);
            });
        });
        const deliveries = await Promise.all(deliveryPromisesList);
        this.setState({deliveries: deliveries});
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
    
    aggrDelivery(delivery, agenciesInfo) {
        const dgInfo = agenciesInfo[0];
        const raInfo = agenciesInfo[1];
        const daInfo = agenciesInfo[2];
        const daContactInfo = agenciesInfo[3];
        delivery.delivererGroup = dgInfo.name;
        delivery.receivingAgency = raInfo.name;
        delivery.donatingAgency = daInfo.name;
        delivery.daContact = pick(daContactInfo, ['name', 'phone']);
        return delivery;
    }

    render(){
        return(
            <div className="food-container ">
                {/* TODO: Filter feature */}
                <div className="food-log-margin">
                    <ul className="food-log-nav-items">
                        <li className="one" onClick={() => this.setState({showHistory: false})}>Total Donations</li>
                        <li className="two" onClick={() => this.setState({showHistory: true})}>History</li>
                        <div className={this.state.showHistory ? "underline section-active" : "underline"} />
                    </ul>               
                </div>
                <hr className="food-log-margin" />
                {this.state.deliveries !== null ? 
                    this.state.deliveries.length > 0 ?
                        this.state.showHistory ? 
                            this.state.deliveries.map((completedDelivery, i) => {
                                return (
                                    <FoodLogItem delivery={completedDelivery} key={i}/>
                                );
                            })
                            : (<FoodLogStats />)
                        :
                        (<h3 className="nothing-found-propmt">No Food Logs Found</h3>)
                    : null} 
            </div>
        );
    }
}
export default FoodLogsContainer;