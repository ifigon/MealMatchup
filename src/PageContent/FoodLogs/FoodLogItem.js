import React, { Component } from 'react';
import moment from 'moment';
import './FoodLogItem.css';

class FoodLogItem extends Component{
    render(){
        return(
            <div className="item">
                <div className="heading">
                    <p className="delivery">Delivery Complete &nbsp;</p> 
                    <p className="date"> &nbsp; &nbsp; on &nbsp; &nbsp; {moment(this.props.delivery.deliveredInfo.timestamp).format('LLL')}</p>
                </div>
                <div className="flex">
                    <div className="info ">
                        <div className="subitem">
                            <p className="info-title">Donating Agency</p>
                            <p className="info-subtitle">{this.props.delivery.donatingAgency.name} ({this.props.delivery.daContact.phone})</p>
                            <p className="info-detail">{this.props.delivery.daContact.name}</p>
                            <p className="info-detail">Signed at {moment(this.props.delivery.pickedUpInfo.timestamp).format('LT')}</p>
                            <p className="info-detail">{this.props.delivery.daContact.email}</p>
                        </div>
                        <div className="subitem">
                            <p className="info-title">Receiving Agency</p>
                            <p className="info-subtitle">{this.props.delivery.receivingAgency.name} ({this.props.delivery.raContact.phone})</p>
                            <p className="info-detail">Signed by: {this.props.delivery.deliveredInfo.signature}</p>
                            <p className="info-detail">Timestamp: {moment(this.props.delivery.deliveredInfo.timestamp).format('LT')}</p>
                            <p className="info-detail">Email: {this.props.delivery.raContact.email}</p>
                        </div>
                    </div>
                    <div className="info">
                        <div className="subitem">
                            <p className="info-title">Donation Description</p>
                            {   
                                //TODO: pagination
                                this.props.delivery.description.foodItems.map((item, i) => {
                                    return(
                                        <div className="food">
                                            <p className="info-detail donationItem">{item.food} &nbsp;</p>
                                            <p className="info-detail donationWeight">{item.quantity} {item.unit}</p>
                                        </div>
                                    );
                                })
                            }
                            
                        </div>
                        <div className="subitem">
                            <p className="info-title">Initial Freezer Temperature</p>
                            <p className="info-detail">Freezer: {this.props.delivery.pickedUpInfo.temperature}&#8457;</p>
                            <p className="info-detail">Timestamp: {moment(this.props.delivery.pickedUpInfo.timestamp).format('LT')}</p>
                        </div>
                    </div>
                    <div className="info">
                        <div className="subitem">
                            <p className="info-title">Notes</p>
                            <p className="info-detail notes">{this.props.delivery.notes}</p>
                        </div>
                        <div className="subitem">
                            <p className="info-title">Picked Up Donation</p>
                            <p className="info-subtitle">{this.props.delivery.delivererGroup.name}</p>
                            <div className="flex">
                                {
                                    this.props.delivery.deliverers.map((deliverer, i) => {
                                        return(
                                            <div className={'stu'+i}>
                                                <p className="info-detail">{deliverer.name}</p>
                                                <p className="info-detail">{deliverer.email}</p>
                                                <p className="info-detail">{deliverer.phone}</p>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FoodLogItem;