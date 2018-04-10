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
            deliveryObj: {
                date: '2018-02-28',
                startTime: '14:00',
                endTime: '17:00',
                isEmergency: false,
                donatingAgency: {
                    agency: '-K9HdKlCLjjk_ka82K0s',  // autogen-key of a donating-agency
                    primaryContact: 'dhA03LwTp3cibXVUcb3nQqO34wj1',  // uid-key of a donating-agency-member
                },
                receivingAgency: {
                    agency: 'uGOFJ8NqHjbZhKAYzSZFRs1dSKD3',  // uid-key of receiving-agency
                    primaryContact: {
                        name: 'Bob',
                        email: 'bob@uniongospel.org',
                        phone: '098-765-4321'
                    }
                },
                // delivererGroup is null if isEmergency=true
                delivererGroup: {
                    // TODO: Get group name with UID. Replaced UID here with name for frontend
                    group: 'Green Greeks',  // uid-key of deliverer-group
                    deliverers: [
                        {
                            name: 'Alice',
                            email: 'alice@uw.edu',
                            phone: '123-789-4560'
                        },
                        {
                            name: 'Chris',
                            email: 'chris@uw.edu',
                            phone: '456-123-0789'
                        }
                    ]
                },
                description: {
                    foodItems: [
                        {
                            food: 'Baked beans',
                            quantity: 15,
                            unit: 'lb'  // Enums.FoodUnit
                        },
                        {
                            food: 'Bread',
                            quantity: 4,
                            unit: 'loaves'  // Enums.FoodUnit
                        }
                    ],
                    updatedBy: 'dhA03LwTp3cibXVUcb3nQqO34wj1'  // uid-key of a donating-agency-member
                },
                notes: 'Enter through the back door.'
            },
            receivingAgency :{
                agency: 'Seattle Union Gospel Shelter',
                primaryContact: {
                    name: 'Billy Jones',
                    position: 'Manager',
                    email: 'billy@jones.com',
                    phone: '324-321-7665'
                },
                notes: 'Only enter if there is a wizard at the front door.',
                address: {
                    street1: '318 2nd Ave Extension South',
                    street2: '',
                    city: 'Seattle',
                    state: 'WA',
                    zipcode: 98104,
                    officeNo: ''
                }
            },
            donatingAgency :{
                agency: 'Local Point',
                primaryContact: {
                    name: 'Amanda Hernandez',
                    position: 'Head Cook',
                    email: 'amanda@lp.com',
                    phone: '205-385-3312'
                },
                address: {
                    street1: '1245 NE Campus Pkwy',
                    street2: '',
                    city: 'Seattle',
                    state: 'WA',
                    zipcode: 98105,
                    officeNo: ''
                }
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
        this.setState({ 
            umbrellaId: umbrellaId, 
            deliveryId: deliveryId,
            deliveryDbRef: `deliveries/${umbrellaId}/${deliveryId}`, 
        });

        db.ref(this.state.deliveryDbRef).on('value', (snapshot) => {
            let deliveryData = snapshot.val();
            // console.log(deliveryData);
        });
    }

    componentWillUnmount() {
        //detach listener
        db.ref(this.state.deliveryDbRef).off();
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