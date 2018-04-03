import React, { Component } from 'react';
import DirectoryCard from './DirectoryCard.js';
import DirectoryFilter from './DirectoryFilter.js';

import firebase from '../../FirebaseConfig.js';
import {AccountType, DaysOfWeek} from '../../Enums.js';
import './Directory.css';
const db = firebase.database();

// 04/02/2018: No logo data found in database, temporarily use UW logo to populate logo prop
const logoURL = 'https://www.washington.edu/brand/files/2014/09/W-Logo_Purple_Hex.png';

class DirectoryPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            account: props.account,
            userId: props.userId,
            umbrella: null,
            raList: [],
            dgList: [],
            daList: []
        };
    }

    async componentDidMount() {
        let umbrellaId = await this.getUmbrellaId();
        this.setState({umbrellaId: umbrellaId});
        this.fetchOrgs();
    }

    componentWillUnmount() {
        // detach listener
        db.ref('accounts').orderByChild('umbrella').equalTo(this.state.umbrellaId).off();
    }

    fetchOrgs() {
        switch (this.state.account.accountType) {
        case AccountType.DONATING_AGENCY_MEMBER:
            this.fetchRaAndDg([AccountType.RECEIVING_AGENCY, AccountType.DELIVERER_GROUP]); 
            break;
        case AccountType.RECEIVING_AGENCY:
            this.fetchRaAndDg([AccountType.DELIVERER_GROUP]); 

            break;
        case AccountType.DELIVERER_GROUP:
            this.fetchRaAndDg([AccountType.RECEIVING_AGENCY]);

            break;
        case AccountType.UMBRELLA:
            this.fetchRaAndDg([AccountType.RECEIVING_AGENCY, AccountType.DELIVERER_GROUP]);   
            break;
        default:
            // console.error("AccountType is not valid");
        }
    }

    fetchRaAndDg(orgTypes) { // fetch receiving agencies or dilivery groups
        db.ref('accounts').orderByChild('umbrella').equalTo(this.state.umbrellaId).on('value', (snapshot) => {
            let AccountObjects = snapshot.val();       
            let raList = [];
            let dgList = [];

            for (let key in AccountObjects) {
                let accountItem = AccountObjects[key];

                // return immediately if the conditions are not met:
                if (!AccountObjects.hasOwnProperty(key)  // filter out prototype props
                    || !orgTypes.includes(accountItem.accountType)) { // if accountType is not in orgTypes 
                    return;
                }

                let org = this.aggrRAorDGOrgObj(accountItem);
                if (accountItem.accountType === AccountType.RECEIVING_AGENCY) 
                    raList.push(org);
                else  // AccountType.DELIVERER_GROUP
                    dgList.push(org);  
            }
            // console.log(orgsList);
            this.setState({raList: raList, dgList: dgList});
        });
    }

    aggrRAorDGOrgObj(accountItem) {
        let personnel = accountItem.accountType === AccountType.DELIVERER_GROUP ?
            accountItem.coordinator : accountItem.primaryContact;

        let org = {
            organization: accountItem.name,
            logo: logoURL,
            accountType: accountItem.accountType,
            contactName: personnel.name,
            contactTitle: personnel.position,
            contactNumber: personnel.phone,
            contactEmail: accountItem.email,
        };

        let itemAddr = accountItem.address;
        org.address1 = itemAddr.street1;
        // append street2 and officeNumber if exists
        org.address1 += itemAddr.street2 ? ` ${itemAddr.street2}` : '';
        org.address1 += itemAddr.officeNumber ? ` ${itemAddr.officeNumber}` : '';
        org.address2 = `${itemAddr.city}, ${itemAddr.state} ${itemAddr.zipcode}`;
        
        if (accountItem.accountType === AccountType.RECEIVING_AGENCY) {
            org.availability = this.aggrAvailability(accountItem.availabilities);
        }
        return org;
    }

    aggrAvailability(obj) {
        let availabilityList = [];
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) { // filter out prototype props
                let item = obj[key];
                availabilityList.push(`${DaysOfWeek[key]}: ${item.startTime} - ${item.endTime}`);
            }
        }
        return availabilityList;
    }

    fetchDRM() { // fetch donating agencies, with members
        // db.ref(`accounts/${umbrellaId}`).on('value', (snapshot) => {
        //     let umbrella = snapshot.val();
        //     console.log(umbrella)

        //     // this.setState({umbrella: umbrella})

        // });
    }

    async getUmbrellaId() {
        let account = this.state.account;
        switch (account.accountType) {
        case AccountType.DONATING_AGENCY_MEMBER: {
            let donatingAgency = await db.ref(`donating_agencies/${account.agency}`).once('value');
            let { umbrella } = donatingAgency.val();
            return umbrella;
        }
        case AccountType.RECEIVING_AGENCY || AccountType.DELIVERER_GROUP:
            return account.umbrella;
        case AccountType.UMBRELLA: // if the currently logged in account is umbrella, return userId of this account
            return this.state.userId;
        default:
            // console.error("AccountType is not valid");
        }
    }

    render() {
        return (
            <div className="directoryPage">
                {/* TODO: For now, I'll keep the filter component separate
                            but I think I will move it to the Directory Page so that it will be easier
                            to grab the filter query and use it to display the directory cards below */}
                <DirectoryFilter />
                <DirectoryCard 
                    organization='Local Point University of Washington'
                    logo='https://www.washington.edu/brand/files/2014/09/W-Logo_Purple_Hex.png' 
                    address1='123 Seasame St.'
                    address2='Seattle, WA 98115' 
                    contactName='Amy Powell'
                    contactTitle='Program Coordinator' 
                    contactNumber='206-487-2859'
                    contactEmail='amypowell@gmail.com' />
                    
            </div>
        );
    }
}

export default DirectoryPage;