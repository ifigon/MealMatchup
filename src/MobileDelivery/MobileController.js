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
                endTime: '4:00',
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
                daManager: 'Phil Fill',
                daPhone: '999-999-9999',
                raName: 'Seattle Union Gospel Mission',
                raManager: 'Andy Dickinson',
                raPhone: '344-123-9457'
            },
            step: 0
        };
        this.showStep = this.showStep.bind(this);
        this.showStart = this.showStart.bind(this);
    }

    componentDidMount(){
        
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
            return <MobileStart pickip={this.state.pickup}/>;
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