import React, { Component } from 'react';
import '../PopUp.css';

import RecurringDeliveryRequest1 from './RecurringDeliveryRequest1';
import RecurringDeliveryRequest2 from './RecurringDeliveryRequest2';
import RecurringDeliveryRequest3 from './RecurringDeliveryRequest3';
import close from '../../../icons/cross-out.svg';

class RecurringDeliveryRequestController extends Component {
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

    convertTime(time) {
        // convert back to 12 hour day
        let hours = time.split(':');
        if (hours[0] > 12) {
            time = hours[0] - 12 + ':' + hours[1] + ' pm';
        } else if (hours[0] === '12') {
            time += ' pm';
        } else {
            time += ' am';
        }
        return time;
    }

    convertPhone(phone) {
        if (phone !== undefined) {
            let phoneString = phone.toString();
            let formattedPhone =
                phoneString.substr(0, 3) +
                '-' +
                phoneString.substr(3, 3) +
                '-' +
                phoneString.substr(6);
            return formattedPhone;
        }
    }

    showStep() {
        // start dummy data
        let startDate = 'Thursday, 11/21/2018';
        let duration = '10 Pickups requested for every Thursday'; // more logic necessary to convert data
        let startTime = this.convertTime('10:00');
        let endTime = this.convertTime('12:00');

        let donatingAgency = 'Local Point';
        let donatingPrimaryContact = {
            name: 'Andrea Benson',
            email: 'bandrea247@gmail.com',
            phone: 2064872859
        };

        let donatingPrimaryContactName = donatingPrimaryContact['name'];
        let donatingPrimaryContactEmail = donatingPrimaryContact['email'];
        let donatingPrimaryContactPhone = this.convertPhone(
            donatingPrimaryContact['phone']
        );

        // let receivingAgency;

        let receivingAgency = 'Seattle Union Gospel Mission';
        let receivingPrimaryContact = {
            name: 'Amy Powell',
            email: 'amypowell@sugm.com',
            phone: 2064533998
        };

        let receivingPrimaryContactName = receivingPrimaryContact['name'];
        let receivingPrimaryContactEmail = receivingPrimaryContact['email'];
        let receivingPrimaryContactPhone = this.convertPhone(
            receivingPrimaryContact['phone']
        );

        // let delivererGroup;
        let delivererGroup = 'Greek Greeks';

        let delivererCoordinator = {
            name: 'Janice Matthews',
            email: 'Janice_M@gmail.com',
            phone: 2063893456
        };
        let delivererGroupCoordinatorContactName = delivererCoordinator['name'];
        let delivererGroupCoordinatorContactEmail =
            delivererCoordinator['email'];
        let delivererGroupCoordinatorContactPhone = this.convertPhone(
            delivererCoordinator['phone']
        );
        // let notes;
        let notes =
            'Use the underground parking garage upon entrance. Key card access required after 3:00pm.';
        // end dummy data

        switch (this.state.step) {
        default:
            return (
                <div className="signup">
                    <RecurringDeliveryRequest1
                        nextStep={this.nextStep.bind(this)}
                        previousStep={this.previousStep.bind(this)}
                        close={this.props.closePopUp}
                        // passing in dummy data
                        startDate={startDate}
                        duration={duration}
                        startTime={startTime}
                        endTime={endTime}
                        delivererGroup={delivererGroup}
                        delivererGroupCoordinatorContactName={
                            delivererGroupCoordinatorContactName
                        }
                        delivererGroupCoordinatorContactPhone={
                            delivererGroupCoordinatorContactPhone
                        }
                        delivererGroupCoordinatorContactEmail={
                            delivererGroupCoordinatorContactEmail
                        }
                        receivingAgency={receivingAgency}
                        receivingPrimaryContactEmail={
                            receivingPrimaryContactEmail
                        }
                        receivingPrimaryContactName={
                            receivingPrimaryContactName
                        }
                        receivingPrimaryContactPhone={
                            receivingPrimaryContactPhone
                        }
                        donatingAgency={donatingAgency}
                        donatingPrimaryContactEmail={
                            donatingPrimaryContactEmail
                        }
                        donatingPrimaryContactName={
                            donatingPrimaryContactName
                        }
                        donatingPrimaryContactPhone={
                            donatingPrimaryContactPhone
                        }
                        notes={notes}
                        // end dummy data
                    />
                </div>
            );
        case 2:
            return (
                <div className="signup">
                    <RecurringDeliveryRequest2
                        nextStep={this.nextStep.bind(this)}
                        previousStep={this.previousStep.bind(this)}
                        close={this.props.closePopUp}
                        // start dummy data
                        donatingAgency={donatingAgency}
                        receivingAgency={receivingAgency}
                        startDate={startDate}
                        duration={duration}
                        startTime={startTime}
                        endTime={endTime}
                        // end dummy data
                    />
                </div>
            );

        case 3:
            return (
                <div className="signup">
                    <RecurringDeliveryRequest3
                        nextStep={this.nextStep.bind(this)}
                        previousStep={this.previousStep.bind(this)}
                        close={this.props.closePopUp}
                        // start dummy data
                        donatingAgency={donatingAgency}
                        receivingAgency={receivingAgency}
                        startDate={startDate}
                        duration={duration}
                        startTime={startTime}
                        endTime={endTime}
                        // end dummy data
                    />
                </div>
            );
        }
    }

    render() {
        return (
            <div className="popup-wrapper">
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

export default RecurringDeliveryRequestController;
