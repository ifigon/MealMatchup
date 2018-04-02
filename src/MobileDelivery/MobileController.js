import React from 'react';
import './MobileDelivery.css';
import MobileDelivery from './MobileDelivery';
import MobileStart from './Start/MobileStart';

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
                address: {
                    street1: '1201 NE Campus Pkwy',
                    street2: '',
                    city: 'Seattle',
                    state: 'WA',
                    zipcode: 98105,
                    officeNo: '220'
                },
                notes: 'Entrance is 3.25 steps to your left and around the corner.'
            },
            step: 0
        };
        this.showStep = this.showStep.bind(this);
        this.showStart = this.showStart.bind(this);
    }

    showStart(){
        this.setState({
            step: 1
        });
    }

    showStep() {
        switch (this.state.step) {
        default:
            return <MobileDelivery 
                pickup={this.state.pickup}
                showStart={this.showStart}/>;
        case 1:
            return <MobileStart pickup={this.state.pickup}/>;
        }
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