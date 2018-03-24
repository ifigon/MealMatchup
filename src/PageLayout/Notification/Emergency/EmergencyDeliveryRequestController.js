import React, { Component } from 'react';
import '../PopUp.css';

import EmergencyDeliveryRequest1 from './EmergencyDeliveryRequest1';
import EmergencyDeliveryRequest2 from './EmergencyDeliveryRequest2';
import EmergencyDeliveryRequest3 from './EmergencyDeliveryRequest3';
import close from '../../../icons/cross-out.svg';

class EmergencyDeliveryRequestController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1
        };
    }

    nextStep() {
        this.setState(prevState => {
            return { step: prevState.step + 1 };
        });
    }

    previousStep() {
        this.setState(prevState => {
            return { step: prevState.step + 1 };
        });
    }

    showStep() {
        // dummy data
        let date = '11/15/2017';
        let time = '2:00pm-4:00pm';
        let receivingAgency = 'Local Point';
        let contact = 'Andrea Benson';
        let phone = '206-487-2859';
        let email = 'bandrea247@gmail.com';
        let weight = '50 lbs';

        let notes =
            ' Use the underground parking garage upon entrance. Key card access required after 3:00pm.';

        let foods = [
            { food: 'Baked Beans', amount: '15 lbs' },
            { food: 'Coleslaw', amount: '20-25 lbs' },
            { food: 'Corn', amount: '6 lbs' },
            { food: 'Mashed Potatoes', amount: '8 lbs' },
            { food: 'Veggie Burger Patties', amount: '4 lbs' },
            { food: 'Bread', amount: '40 loaves' }
        ];
        // end dummy data

        switch (this.state.step) {
        default:
            return (
                <EmergencyDeliveryRequest1
                    nextStep={this.nextStep.bind(this)}
                    previousStep={this.previousStep.bind(this)}
                    close={this.props.closePopUp}
                    // pass in dummy data
                    foods={foods}
                    date={date}
                    time={time}
                    receivingAgency={receivingAgency}
                    contact={contact}
                    phone={phone}
                    email={email}
                    weight={weight}
                    notes={notes}
                />
            );
        case 2:
            return (
                <EmergencyDeliveryRequest2
                    nextStep={this.nextStep.bind(this)}
                    previousStep={this.previousStep.bind(this)}
                    close={this.props.closePopUp}
                    // pass in dummy data
                    date={date}
                    time={time}
                    receivingAgency={receivingAgency}
                    weight={weight}
                />
            );
        case 3:
            return (
                <EmergencyDeliveryRequest3
                    nextStep={this.nextStep.bind(this)}
                    previousStep={this.previousStep.bind(this)}
                    close={this.props.closePopUp}
                    // pass in dummy data
                    date={date}
                    time={time}
                    receivingAgency={receivingAgency}
                    weight={weight}
                />
            );
        }
    }

    render() {
        return (
            <div className="popup-wrapper emergency">
                <img
                    className="close"
                    src={close}
                    alt="close"
                    onClick={this.props.closePopUp}
                />
                {this.showStep()}
            </div>
        );
    }
}

export default EmergencyDeliveryRequestController;
