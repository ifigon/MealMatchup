import React, { Component } from 'react';
import './ConfirmationCard.css';
import moment from 'moment';
import { StringFormat } from '../../Enums';

class ConfirmationCard extends Component {
    render() {
        const {
            daContact,
            delivererGroup,
            deliverers,
            description,
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
            <div className="confirmation-card-container">
                <div className="card-content">
                    <div className="top-container">
                        <h5>Recurring Pickup</h5>
                        <h6>{startDate} {startTime} - {endTime}</h6>
                    </div>
                </div>

                <div className="details-content">
                    <div className="icon-content">
                    </div>
                    <div className="delivery-details">
                        <h5>Student Deliverers</h5>
                        <h4>{delivererGroup.group}</h4>
                        <h6 className="det">{deliverers[0].name} ({deliverers[0].phone})</h6>
                        <h6 className="det">{deliverers[1].name} ({deliverers[1].phone})</h6>
                    </div>
                </div>
                <div className="details-content">
                    <div className="icon-content">
                    </div>
                    <div className="delivery-details">
                        <h5>Dining Hall</h5>
                        <h4>{`Name: ${donatingAgency.name}`}</h4>
                        <h6 className="det">{`Contact: ${daContact.name} (${daContact.phone})`}</h6>
                        <h6 className="det">{donatingAgency.address.street1}</h6>
                        <h6 className="det">{`${donatingAgency.address.city}, ${donatingAgency.address.state} ${donatingAgency.address.zipcode}`}</h6>
                    </div>
                </div>
                <div className="details-content">
                    <div className="icon-content">
                    </div>
                    <div className="delivery-details">
                        <h5>Recipient</h5>
                        <h4>{receivingAgency.agency}</h4>
                        <h6 className="det">{raContact.name} ({raContact.phone})</h6>
                    </div>
                </div>
                <div className="details-content">
                    <div className="icon-content">
                    </div>
                    {description && 
                        <div className="delivery-details">

                            <h5>Donation Description</h5>
                            {
                                description.foodItems.map((foodItem, index) => {
                                    return <h4 key={index}>{foodItem.food} {foodItem.quantity} {foodItem.unit}</h4>;
                                })
                            }
                        </div>
                    }
                </div>
                <div className="details-content">
                    <div className="edit-button">
                        <button type="button" className="form-button confirm-button confirm-button-confirmation" onClick={this.props.handleCloseClick.bind(this)}>Edit</button>
                        <button type="button" className="form-button confirm-button confirm-button-confirmation" onClick={this.props.handleCancelClick.bind(this)}>OK</button>
                    </div>
                </div>

            </div>
        );

    }

}

export default ConfirmationCard;