import React, { Component } from 'react';
import truck from '../../../icons/green_truck.svg';
import Map from '../../../Map/Map.js';

class RecurringDeliveryRequest1 extends Component {
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

    render() {
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

        return (
            <div className="wrapper">
                <img className="icon" src={truck} alt="icon" />
                <h1>Reccuring Pickup Requested</h1>
                <div className="pickup-details">
                    <h2>Pickup Details</h2>
                    <div className="start">
                        <label>Start Date:</label>{' '}
                        <p className="start-date">{startDate}</p>
                    </div>
                    <p>{duration}</p>
                    <p>
                        Pickup between {startTime}-{endTime}
                    </p>
                </div>

                {delivererGroup ? (
                    <div>
                        <h2>Student Deliverers</h2>
                        <h3 className="orgName">{delivererGroup}</h3>
                        <p className="donating-recieving">
                            {delivererGroupCoordinatorContactName}
                        </p>
                        <p className="donating-recieving">
                            {delivererGroupCoordinatorContactPhone}
                        </p>
                        <p className="donating-recieving">
                            {delivererGroupCoordinatorContactEmail}
                        </p>
                    </div>
                ) : null}

                {receivingAgency ? (
                    <div>
                        <div className="receiving-agency">
                            <h2>Recipient</h2>
                            <h3 className="orgName">{receivingAgency}</h3>
                            <p
                                className="donating-recieving"
                                id="receivingContactName"
                            >
                                {receivingPrimaryContactName}
                            </p>
                            <p
                                className="donating-recieving"
                                id="receivingContactPhone"
                            >
                                {receivingPrimaryContactPhone}
                            </p>
                            <p
                                className="donating-recieving"
                                id="receivingContactEmail"
                            >
                                {receivingPrimaryContactEmail}
                            </p>
                        </div>

                        {/*To do: pass in coordinates*/}
                        <div className="map">
                            <Map className="map" />
                        </div>
                    </div>
                ) : null}

                <div className="donating-agency">
                    <h2 id="organizationName">Dining Hall</h2>
                    <h3 className="orgName">{donatingAgency}</h3>
                    <p className="donating-recieving" id="donatingContactName">
                        {donatingPrimaryContactName}
                    </p>
                    <p className="donating-recieving" id="donatingContactPhone">
                        {donatingPrimaryContactPhone}
                    </p>
                    <p className="donating-recieving" id="donatingContactEmail">
                        {donatingPrimaryContactEmail}
                    </p>

                    {/*To do: pass in coordinates*/}
                    <div className="map">
                        <Map className="map" />
                    </div>
                </div>

                {notes ? (
                    <div>
                        <h2>Notes for Pickup</h2>
                        <p className="notes">{notes}</p>
                    </div>
                ) : null}

                <div className="buttons">
                    <button
                        onClick={this.props.nextStep}
                        className="claim"
                        type="button"
                    >
                        Claim
                    </button>{' '}
                    <button
                        onClick={this.props.close}
                        className="reject"
                        type="button"
                    >
                        Reject
                    </button>
                </div>
            </div>
        );
    }
}
export default RecurringDeliveryRequest1;
