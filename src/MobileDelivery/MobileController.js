import React from 'react';
import './Mobile.css';
import MobileStart from './MobileStart';
import MobilePickup from './MobilePickup';
import MobileDelivery from './MobileDelivery';
import MobileComplete from './MobileComplete';

class MobileController extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            pickup: {
                date: '3/5', // only need month and day
                startTime: '12:00',
                endTime: '2:00',
                deliverers: [
                    {
                        name: 'Joyce Huang',
                        org: 'Green Greeks',
                        phone: '206-324-1211'
                    },
                    {
                        name: 'Billy Bob',
                        org: 'Green Greeks',
                        phone: '243-255-4444'
                    }
                ],
                daName: 'Local Point',
                daContact: 'Phil Fill',
                daPosition: 'Head Cook',
                daPhone: '999-999-9999',
                raName: 'Seattle Union Gospel Mission',
                raContact: 'Andy Dickinson',
                raPosition: 'Manager',
                raPhone: '344-123-9457',
                daAddress: {
                    street1: '1201 NE Campus Pkwy',
                    street2: '',
                    city: 'Seattle',
                    state: 'WA',
                    zipcode: 98105,
                    officeNo: '220'
                },
                raAddress:{
                    street1: '318 2nd Ave Extension South',
                    street2: '',
                    city: 'Seattle',
                    state: 'WA',
                    zipcode: 98104,
                    officeNo: ''
                },
                daNotes: 'Entrance is 3.25 steps to your left and around the corner.',
                raNotes: 'If a wizard is at the front door, you are at the wrong place.',
                status: false
            },
            // TODO: add these fields to deliveryObject
            completedDelivery: {
                temp: '',
                daSignature: '',
                raSignature: '',
                raPrintName: '',
            },
            step: 0
        };
        this.showStep = this.showStep.bind(this);
        this.showStart = this.showStart.bind(this);
        this.nextStep = this.nextStep.bind(this);
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

    showStep() {
        switch (this.state.step) {
        default:
            return <MobileStart 
                pickup={this.state.pickup}
                showStart={this.showStart}/>;
        case 1:
            return <MobilePickup pickup={this.state.pickup} nextStep={this.nextStep}/>;
        case 2:
            return <MobileDelivery pickup={this.state.pickup} nextStep={this.nextStep}/>;
        case 3: 
            return <MobileComplete pickup={this.state.pickup} nextStep={this.nextStep}/>;
        }
    }

    // TODO: Save completed delivery
    saveDelivery(){

    }

    render() {
        return (
            <div className="mobile-wrapper">
                {this.showStep()}
            </div>
        );
    }
}

export default MobileController;