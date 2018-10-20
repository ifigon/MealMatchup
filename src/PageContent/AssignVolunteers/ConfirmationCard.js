import React, { Component } from 'react';
import './ConfirmationCard.scss';
import moment from 'moment';
import { StringFormat } from '../../Enums';
import volunteer from '../../icons/volunteer.svg';
import vitamins from '../../icons/vitamins.svg';
import shelter from '../../icons/shelter.svg';

class ConfirmationCard extends Component {
    render() {
        const {
            daContact,
            deliverers,
            donatingAgency,
            endTimestamp,
            raContact,
            receivingAgency,
            startTimestamp,
        } = this.props.delivery;

        let startMoment = moment(startTimestamp);
        let startDate = startMoment.format(StringFormat.DATE_FULL);
        let startTime = startMoment.format(StringFormat.TIME);
        let endTime = moment(endTimestamp).format(StringFormat.TIME);

        return (
            <div className="confirmation-container">
                <div className="confirmation-card-container">
                    <div className="card-content">
                        <div className="top-container">
                            <h5>Recurring Pickup</h5>
                            <h6>{startDate} {startTime} - {endTime}</h6>
                        </div>
                    </div>

                    <div className="details-content wrapper">
                        <img className="content-icon" src={volunteer} alt="volunteer" />
                        <div className="delivery-details">
                            <h5>Student Deliverers</h5>
                            {deliverers.map((deliverer, index) => <h6 key={index} className="det">{deliverer.name} ({deliverer.phone})</h6>)}
                        </div>
                    </div>
                    <div className="details-content wrapper">
                        <img className="content-icon" src={vitamins} alt="logo" />
                        <div className="delivery-details">
                            <h5>Dining Hall</h5>
                            <h4>{donatingAgency.name}</h4>
                            <h6 className="det">{`${daContact.name} (${daContact.phone})`}</h6>
                            <h6 className="det">{donatingAgency.address.street1}</h6>
                            <h6 className="det">{`${donatingAgency.address.city}, ${donatingAgency.address.state} ${donatingAgency.address.zipcode}`}</h6>
                        </div>
                    </div>
                    <div className="details-content wrapper">
                        <img className="content-icon" src={shelter} alt="shelter" />
                        <div className="delivery-details">
                            <h5>Recipient</h5>
                            <h4>{receivingAgency.name}</h4>
                            <h6 className="det">{raContact.name} ({raContact.phone})</h6>
                            <h6 className="det">{receivingAgency.address.street1}</h6>
                            <h6 className="det">{`${receivingAgency.address.city}, ${receivingAgency.address.state} ${receivingAgency.address.zipcode}`}</h6>
                        </div>
                    </div>
                    <div className="details-content">
                        <div className="button-container">
                            <button type="button" className="form-button confirm-button confirm-button-confirmation" onClick={this.props.handleCloseClick.bind(this)}>Edit</button>
                            <button type="button" className="form-button confirm-button confirm-button-confirmation" onClick={this.props.handleCancelClick.bind(this)}>OK</button>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}

export default ConfirmationCard;