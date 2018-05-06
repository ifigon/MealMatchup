import React, { Component } from 'react';
import moment from 'moment';
import './FoodLogItem.css';
class FoodLogItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPage: 1,
            foodPerPage: 4
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event){
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    render(){
        const { currentPage, foodPerPage } = this.state;
        const foodItems = this.props.delivery.description.foodItems;

        // Logic for displaying current foods
        const indexOfLastFood = currentPage * foodPerPage;
        const indexOfFirstFood = indexOfLastFood - foodPerPage;
        const currentFoods = foodItems.slice(indexOfFirstFood, indexOfLastFood);

        const renderFood = currentFoods.map((food, i) => {
            return(
                <div className="food" key={i}>
                    <p className="info-detail donationItem">{food.food} &nbsp;</p>
                    <p className="info-detail donationWeight">{food.quantity} {food.unit}</p>
                </div>
            );
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(foodItems.length / foodPerPage); i++) {
            pageNumbers.push(i);
        }
        let renderPageNumbers = null;
        if(pageNumbers.length > 1) {
            renderPageNumbers = pageNumbers.map(number => {
                return (
                    <p className={number === this.state.currentPage ? 'circle': 'circle open' } key={number} id={number} onClick={this.handleClick}>
                    </p>
                );
            });
        }
        return(
            <div className="item">
                <div className="heading">
                    <p className="delivery">Delivery Complete &nbsp;</p> 
                    <p className="date"> &nbsp; on &nbsp; {moment(this.props.delivery.deliveredInfo.timestamp).format('LLL')}</p>
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
                            { renderFood }
                            <div className="page-numbers">{ renderPageNumbers }</div>
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
                            <div className="foodlog-deliverers flex">
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