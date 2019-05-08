import React, { Component } from 'react';
import moment from 'moment';
import './FoodLogItem.css';
import { StringFormat } from '../../Enums';
class FoodLogItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPage: 1,
            foodPerPage: 4,
            pageNumbers: null,
            moreThan1Page: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClickPrev = this.handleClickPrev.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
    }

    handleClick(event){
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    handleClickPrev(){
        if(this.state.currentPage > 1){
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    }

    handleClickNext(){
        if(this.state.currentPage < this.state.pageNumbers){
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    }

    componentDidMount(){
        const { delivery } = this.props;
        let pageNumbers = delivery.description && delivery.description.foodItems ? 
            Math.ceil(delivery.description.foodItems.length / this.state.foodPerPage) : 1;
        this.setState({
            pageNumbers: pageNumbers
        });

        if(pageNumbers > 1){
            this.setState({
                moreThan1Page: true
            });
        }
    }

    render(){
        // TODO: Pagination for deliveries (foodlog cards)
        const { currentPage, foodPerPage } = this.state;
        const { delivery } = this.props;
        const foodItems = delivery.description && delivery.description.foodItems ? 
            delivery.description.foodItems : [];

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
                    <p className="date"> &nbsp; on &nbsp; {moment(delivery.deliveredInfo.timestamp).format('LLL')}</p>
                    {delivery.manuallyAdded &&
                        <p className="header-manual">Manually Added</p>
                    }
                </div>
                <div className="flex">
                    <div className="info ">
                        <div className="subitem">
                            <p className="info-title">Donating Agency</p>
                            <p className="info-subtitle">{delivery.donatingAgency} - {delivery.daContact.phone}</p>
                            <p className="info-detail">Signed by: {delivery.pickedUpInfo.signature}</p>
                            <p className="info-detail">Timestamp: {moment(delivery.pickedUpInfo.timestamp).format(StringFormat.TIME)}</p>
                        </div>
                        <div className="subitem">
                            <p className="info-title">Receiving Agency</p>
                            <p className="info-subtitle">{delivery.receivingAgency} - {delivery.raContact.phone}</p>
                            <p className="info-detail">Signed by: {delivery.deliveredInfo.signature}</p>
                            <p className="info-detail">Timestamp: {moment(delivery.deliveredInfo.timestamp).format(StringFormat.TIME)}</p>
                        </div>
                    </div>
                    <div className="info">
                        <div className="subitem">
                            <p className="info-title">Donation Description</p>
                            <div className="food-log-pages">
                                <i className={'fa fa-angle-left ' + (this.state.moreThan1Page ? '' : 'hidden')}onClick={this.handleClickPrev}/>
                                <div className="food-log-items">
                                    { renderFood } 
                                </div>
                                <i className={'fa fa-angle-right ' + (this.state.moreThan1Page ? '' : 'hidden')} onClick={this.handleClickNext}/>
                            </div>
                            <div className="page-numbers">{ renderPageNumbers }</div>
                        </div>
                        <div className="subitem">
                            <p className="info-title">Initial Freezer Temperature</p>
                            <p className="info-detail">Freezer: {delivery.pickedUpInfo.temperature}&#8457;</p>
                            <p className="info-detail">Timestamp: {moment(delivery.pickedUpInfo.timestamp).format(StringFormat.TIME)}</p>
                        </div>
                    </div>
                    <div className="info">
                        <div className="subitem">
                            <p className="info-title">Notes</p>
                            <p className="info-detail notes">{delivery.notes}</p>
                        </div>
                        <div className="subitem">
                            <p className="info-title">Picked Up Donation</p>
                            <p className="info-subtitle">{delivery.delivererGroup.name}</p>
                            <div className="foodlog-deliverers flex">
                                {
                                    delivery.deliverers.map((deliverer, i) => {
                                        return(
                                            <div className={'stu'+i} key={i}>
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