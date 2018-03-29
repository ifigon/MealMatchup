import React, { Component } from 'react';
import './ConfirmationCard.css';

class ConfirmationCard extends Component {

    render() {
        console.log(this.props);
        return (
            <div className="confirmation-card-container">
                <div className="card-content">
                    <div className="top-container">
                        <h5>Recurring Pickup</h5>
                        <h6>11/21/2017 10am - 12pm</h6>
                    </div>
                    <div className="close-container">
                        <i class="fas fa-times close-card" onClick={this.props.handleCloseClick} />
                    </div>
                </div>

                <div className="details-content">
                    <div className="icon-content">
                    </div>
                    <div className="delivery-details">
                        <h5>Student Deliverers</h5>
                        <h4>{this.props.studentGroup}</h4>
                        <h6 className="det">{this.props.s1name} ({this.props.s1phone})</h6>
                        <h6 className="det">{this.props.s2name} ({this.props.s2phone})</h6>
                    </div>
                </div>
                <div className="details-content">
                    <div className="icon-content">
                    </div>
                    <div className="delivery-details">
                        <h5>Donor</h5>
                        <h4>Local Point</h4>
                        <h6 className="det">123 Seasame St Seattle, WA 98115</h6>
                        <h6 className="det">Andrea Benson (206-487-2859)</h6>
                    </div>
                </div>
                <div className="details-content">
                    <div className="icon-content">
                    </div>
                    <div className="delivery-details">
                        <h5>Recipient</h5>
                        <h4>Union Gospel Mission</h4>
                        <h6 className="det">Amy Powell (206-487-2859)</h6>
                    </div>
                </div>
                <div className="details-content">
                    <div className="icon-content">
                    </div>
                    <div className="delivery-details">
                        <h5>Donation Description</h5>
                        <h4>Baked beans 15lbs, Coreslaw 20lbs, Corn 6lbs,Mashed potatoes 8lbs, Veggie burger patties 4lbs, Bread 40 loaves</h4>
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