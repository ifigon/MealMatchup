import React, { Component } from 'react';
import './FoodLogItem.css';

class FoodLogItem extends Component{
    render(){
        return(
            <div className="item">
                <div className="heading">
                    <p className="delivery">Delivery Complete &nbsp;</p> 
                    <p className="date"> &nbsp; &nbsp; on &nbsp; &nbsp; {this.props.date} &nbsp; &nbsp; {this.props.time}</p>
                    
                </div>
                <div className="flex">
                    <div className="info ">
                        <div className="subitem">
                            <p className="info-title">Donating Agency</p>
                            <p className="info-subtitle">{this.props.daName} ({this.props.daPhone})</p>
                            <p className="info-detail">{this.props.daManager}</p>
                            <p className="info-detail">Signed at {this.props.daSigned}</p>
                            <p className="info-detail">{this.props.daEmail}</p>
                        </div>
                        <div className="subitem">
                            <p className="info-title">Receiving Agency</p>
                            <p className="info-subtitle">{this.props.raName} ({this.props.raPhone})</p>
                            <p className="info-detail">{this.props.raSigned}</p>
                            <p className="info-detail">Signed: {this.props.raTime}</p>
                            <p className="info-detail">{this.props.raEmail}</p>
                        </div>
                    </div>
                    <div className="info">
                        <div className="subitem">
                            <p className="info-title">Donation Description</p>
                            <div className="food">
                                    <p className="info-detail donationItem">{this.props.donationItem} &nbsp;</p>
                                    <p className="info-detail donationWeight">{this.props.donationWeight}</p>
                            </div>
                        </div>
                        <div className="subitem">
                            <p className="info-title">Initial Freezer Temperature</p>
                            <p className="info-detail">Freezer: {this.props.freezerTemp}</p>
                            <p className="info-detail">Timestamp: {this.props.freezerTime}</p>
                        </div>
                    </div>
                    <div className="info">
                        <div className="subitem">
                            <p className="info-title">Notes</p>
                            <p className="info-detail notes">{this.props.notes}</p>
                        </div>
                        <div className="subitem">
                            <p className="info-title">Picked Up Donation</p>
                            <p className="info-subtitle">{this.props.pickedUpName}</p>
                            <div className="flex">
                                <div className="stu1">
                                    <p className="info-detail">{this.props.stuName1}</p>
                                    <p className="info-detail">{this.props.stuPhone1}</p>
                                    <p className="info-detail">{this.props.stuEmail1}</p>
                                </div>
                                <div className="stu2">
                                    <p className="info-detail">{this.props.stuName2}</p>
                                    <p className="info-detail">{this.props.stuPhone2}</p>
                                    <p className="info-detail">{this.props.stuEmail2}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FoodLogItem;