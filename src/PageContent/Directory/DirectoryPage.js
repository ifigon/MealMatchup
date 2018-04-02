import React, { Component } from 'react';
import DirectoryCard from './DirectoryCard.js';
import DirectoryFilter from './DirectoryFilter.js';

import firebase from '../../FirebaseConfig.js';
import {AccountType} from '../../Enums.js'
import './Directory.css';
const db = firebase.database();



class DirectoryPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            account: props.account,
            userId: props.userId,
            umbrella: null
        };
    }

    async componentDidMount() {
        let umbrellaId = await this.getUmbrellaId()
        this.setState({umbrellaId: umbrellaId})
        db.ref(`accounts/${umbrellaId}`).on('value', (snapshot) => {
            let umbrella = snapshot.val();
            console.log(umbrella)

            // this.setState({umbrella: umbrella})

        });

        // db.ref('accounts').orderByChild('umbrella').equalTo()

    }

    componentWillUnmount() {
        // remove listener
        db.ref(`accounts/${this.state.umbrellaId}`).off()
    }

    async getUmbrellaId() {
        let account = this.state.account
        switch (account.accountType) {
            case AccountType.DONATING_AGENCY_MEMBER:
                let donatingAgency = await db.ref(`donating_agencies/${account.agency}`).once('value');
                let { umbrella } = donatingAgency.val()
                return umbrella
            case AccountType.RECEIVING_AGENCY || AccountType.DELIVERER_GROUP:
                return account.umbrella
            case AccountType.UMBRELLA: // if the currently logged in account is umbrella, return userId of this account
                return this.state.userId
            default:
                console.error("AccountType is not valid");
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