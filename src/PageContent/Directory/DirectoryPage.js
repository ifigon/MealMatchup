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
        // detach listeners
        db.ref('accounts').orderByChild('umbrella').equalTo(this.state.umbrellaId).off();
        db.ref('donating_agencies').orderByChild('umbrella').equalTo(this.state.umbrellaId).off();
    }

    async getUmbrellaId() {
        let account = this.state.account;
        switch (account.accountType) {
        case AccountType.DONATING_AGENCY_MEMBER: {
            let daSnapshot = await db.ref(`donating_agencies/${account.agency}`).once('value');
            let { umbrella } = daSnapshot.val();
            return umbrella;
        }
        case AccountType.RECEIVING_AGENCY || AccountType.DELIVERER_GROUP:
            return account.umbrella;
        case AccountType.UMBRELLA: // if the currently logged in account is umbrella, return userId of this account
            return this.state.userId;
        default:
            break;
        }
    }

    fetchOrgs() {
        switch (this.state.account.accountType) {
        case AccountType.DONATING_AGENCY_MEMBER:
            this.fetchRaAndDg([AccountType.RECEIVING_AGENCY, AccountType.DELIVERER_GROUP]); 
            this.fetchDAM();
            break;
        case AccountType.RECEIVING_AGENCY:
            this.fetchRaAndDg([AccountType.DELIVERER_GROUP]); 
            this.fetchDAM();
            break;
        case AccountType.DELIVERER_GROUP:
            this.fetchRaAndDg([AccountType.RECEIVING_AGENCY]);
            this.fetchDAM();
            break;
        case AccountType.UMBRELLA:
            this.fetchRaAndDg([AccountType.RECEIVING_AGENCY, AccountType.DELIVERER_GROUP]);   
            this.fetchDAM();
            break;
        default:
            break;
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
                (accountItem.accountType === AccountType.RECEIVING_AGENCY) ? 
                    raList.push(org) : dgList.push(org);  
            }
            this.setState({raList: raList, dgList: dgList});
            // console.log("RA List: ", this.state.raList);
            // console.log("DG List: ", this.state.dgList);
        });
    }

    aggrRAorDGOrgObj(accountItem) {
        let personnel = (accountItem.accountType === AccountType.DELIVERER_GROUP) ?
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

        this.aggrAddress(org, accountItem.address);
        
        if (accountItem.accountType === AccountType.RECEIVING_AGENCY) {
            org.availability = this.aggrAvailability(accountItem.availabilities);
        }
        return org;
    }

    aggrAddress(org, addrObj) {
        org.address1 = addrObj.street1;
        // append street2 and officeNumber if exists
        org.address1 += addrObj.street2 ? ` ${addrObj.street2}` : '';
        org.address1 += addrObj.officeNumber ? ` ${addrObj.officeNumber}` : '';
        org.address2 = `${addrObj.city}, ${addrObj.state} ${addrObj.zipcode}`;
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

    fetchDAM() { // fetch donating agencies, with members
        db.ref('donating_agencies').orderByChild('umbrella').equalTo(this.state.umbrellaId).on('value', async (snapshot) => {
            let daObjects = snapshot.val();            
            let daList = [];
            let daMemberKey = [];
            let daPromiseList = [];

            for (let key in daObjects) {
                if (!daObjects.hasOwnProperty(key)) { // filter out prototype props
                    return;
                }

                let daItem = daObjects[key];
                daList.push(daItem);

                let members = daItem.members;
                daMemberKey.push(members);
                let daMemberPromiseList = members.map((damId) => 
                    new Promise( 
                        async (resolve, reject) => {
                            let snapshot = await db.ref(`accounts/${damId}`).once('value');
                            resolve(snapshot.val());
                        }
                    )
                );

                let daPromise = new Promise( 
                    async (resolve, reject) => {
                        let daMembers = await Promise.all(daMemberPromiseList);
                        resolve(daMembers);
                    }
                );
                daPromiseList.push(daPromise);
            }

            let daMemberList = await Promise.all(daPromiseList);
            let aggredDaList = this.aggrDaList(daList, daMemberList, daMemberKey);
            this.setState({daList: aggredDaList});
            // console.log("DA List: ", this.state.daList);
        });
    }

    aggrDaList(daList, daMembers, daMemberKey) {
        let result = [];
        for (let i = 0; i < daList.length; i++) {
            let daItem = daList[i];

            let org = {
                organization: daItem.name,
                logo: logoURL,
                accountType: AccountType.DONATING_AGENCY,
                members: []
            };
            this.aggrAddress(org, daItem.address);
            
            for (let j = 0; j < daMembers[i].length; j++) {
                let member = daMembers[i][j];
                let memberKey = daMemberKey[i][j];
                let {name, position, phone, email} = member;

                if (daItem.primaryContact === memberKey) {
                    org.contactName = name;
                    org.contactTitle = position;
                    org.contactNumber = phone;
                    org.contactEmail = email;
                } else {
                    let memberObj = {
                        contactName: name,
                        contactTitle: position,
                        contactNumber: phone,
                        contactEmail: email
                    };
                    org.members.push(memberObj);
                }
            }
            result.push(org);
        }
        return result;
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