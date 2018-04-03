import React, { Component } from 'react';
import './ConfirmationCard.css';
import moment from 'moment';

class ConfirmationCard extends Component {

    constructor(props) {
        super(props);
        let date = new Date(this.props.delivery.date);
        this.state = {
            date: moment(date).format('l'),
            from: this.props.delivery.startTime,
            to: this.props.delivery.endTime,
            studentGroup: this.props.delivery.delivererGroup.group,
            donatingAgency: this.props.delivery.donatingAgency,
            receivingAgency: this.props.delivery.receivingAgency,
            foodItems: this.props.delivery.description.foodItems
        };
    }

    // TODO: Save the volunteers and send them email notifications.

    render() {
        return (
            <div className="confirmation-card-container">
                <div className="card-content">
                    <div className="top-container">
                        <h5>Recurring Pickup</h5>
                        <h6>{this.state.date} {this.state.from} - {this.state.to}</h6>
                    </div>
                    <div className="close-container">
                        <i className="fas fa-times close-card" onClick={this.props.handleCloseClick} />
                    </div>
                </div>

                <div className="details-content">
                    <div className="icon-content">
                    </div>
                    <div className="delivery-details">
                        <h5>Student Deliverers</h5>
                        <h4>{this.state.studentGroup}</h4>
                        <h6 className="det">{this.props.s1name} ({this.props.s1phone})</h6>
                        <h6 className="det">{this.props.s2name} ({this.props.s2phone})</h6>
                    </div>
                </div>
                <div className="details-content">
                    <div className="icon-content">
                    </div>
                    <div className="delivery-details">
                        <h5>Donor</h5>
                        <h4>{this.state.donatingAgency.agency}</h4>
                        <h6 className="det">{this.state.donatingAgency.address}</h6>
                        <h6 className="det">{this.state.donatingAgency.primaryContact.name} ({this.state.donatingAgency.primaryContact.phone})</h6>
                    </div>
                </div>
                <div className="details-content">
                    <div className="icon-content">
                    </div>
                    <div className="delivery-details">
                        <h5>Recipient</h5>
                        <h4>{this.state.receivingAgency.agency}</h4>
                        <h6 className="det">{this.state.receivingAgency.primaryContact.name} ({this.state.receivingAgency.primaryContact.phone})</h6>
                    </div>
                </div>
                <div className="details-content">
                    <div className="icon-content">
                    </div>
                    <div className="delivery-details">
                        <h5>Donation Description</h5>
                        {
                            this.state.foodItems.map((foodItem, index) => {
                                return <h4 key={index}>{foodItem.food} {foodItem.quantity}{foodItem.unit}</h4>;
                            })
                        }
                    </div>
                </div>
                <div className="details-content">
                    <div className="edit-button">
                        <button type="button" className="form-button" id="confirm-button" onClick={this.props.handleCloseClick}>Edit</button>
                    </div>
                </div>

            </div>
        );

    }

}

export default ConfirmationCard;