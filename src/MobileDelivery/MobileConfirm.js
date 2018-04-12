import React from 'react';
import moment from 'moment';
import './Mobile.css';

class MobileConfirm extends React.Component {
    render() {
        return (
            <div className="mobile-confirmation-container">
                <div className="mobile-confirm-card">
                    <div className="mobile-card-line"></div>
                    <p className="ms-header">Completion Summary</p>
                    <p id="confirm-time">{moment.unix(this.props.deliveryObj.deliveredInfo.timestamp).calendar()}</p>
                    <div className="ms-confirm">
                        <div className="ms-confirm-content" id="ms-confirm-da">
                            <p className="ms-confirm-header">Donating Agency</p>
                            <p className="ms-confirm-agency">{this.props.da.agency}
                                <a href={'tel:' + this.props.da.primaryContact.phone}>{this.props.da.primaryContact.phone}</a>
                            </p>
                            <p className="ms-confirm-details">Signed by: {this.props.da.primaryContact.name}</p>
                            <p className="ms-confirm-details">Timestamp: {moment.unix(this.props.deliveryObj.pickedUpInfo.timestamp).format('LT')}</p>
                            <p className="ms-confirm-details">Freezer Temperature: {this.props.deliveryObj.pickedUpInfo.temperature}&deg;F</p>
                        </div>
                        <div className="ms-confirm-content" id="ms-confirm-ra">
                            <p className="ms-confirm-header">Receiving Agency</p>
                            <p className="ms-confirm-agency">{this.props.ra.agency}
                                <a href={'tel:' + this.props.ra.primaryContact.phone}>{this.props.ra.primaryContact.phone}</a>
                            </p>
                            <p className="ms-confirm-details">Signed by: {this.props.ra.primaryContact.name}</p>
                            <p className="ms-confirm-details">Timestamp: {moment.unix(this.props.deliveryObj.deliveredInfo.timestamp).format('LT')}</p>
                        </div>
                        <div className="ms-confirm-content" id="ms-confirm-dg">
                            <p className="ms-confirm-header">Deliverers</p>
                            <p className="ms-confirm-agency">{this.props.deliveryObj.delivererGroup.group}</p>
                            {
                                this.props.deliveryObj.deliverers.map((deliverer, i) => {
                                    return (
                                        <p className="ms-confirm-details" key={i}>{deliverer.name}
                                            <a href={'tel:' + deliverer.phone}>
                                                {deliverer.phone}
                                            </a>
                                        </p>
                                    );
                                })
                            }
                        </div>
                        <div className="ms-confirm-content" id="ms-confirm-food">
                            <p className="ms-confirm-header">Description of Pick Up</p>
                            {
                                this.props.deliveryObj.description.foodItems.map((desc, i) => {
                                    return (
                                        <p className="ms-food" key={i}>{desc.food} &nbsp;
                                            <span>{desc.quantity} {desc.unit}</span>
                                        </p>
                                    );
                                })
                            }
                        </div>
                        {/* notify controller to hide summary dialog */}
                        <input defaultValue="Ok" id="ms-confirm-btn" onClick={this.props.toggleShowSummary}/> 
                    </div>
                </div>
            </div>
        );
    }
}

export default MobileConfirm;