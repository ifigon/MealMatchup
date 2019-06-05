import React from 'react';
import Map from '../Map/Map';
import moment from 'moment';
import './Mobile.css';
import { DeliveryStatus, StringFormat } from '../Enums';
import minus from '../icons/minus-button.svg'
import { objectsAreEqual } from '../utils/Utils';


import firebase from '../FirebaseConfig';
const db = firebase.database();

class MobilePickup extends React.Component {
    constructor(props){
        super(props); 
        this.onSubmit = this.onSubmit.bind(this);
        this.addFoodItem = this.addFoodItem.bind(this);
        this.initialFoodItems = [];
        this.state = {
            currentItems : [],
        }
    }

    async componentDidMount() {
        let dbRef = db.ref(this.props.dbRef);
        dbRef.child('description/foodItems').once('value', (deliveryItemsSnap) => {
            let deliveryItemsVal = deliveryItemsSnap.val();
            if(deliveryItemsVal !== null) {    // check for initial case where food items never added
                this.setState({ currentItems : deliveryItemsVal });
                this.initialFoodItems = deliveryItemsVal;
            }
        });    
    }

    onSubmit(e){
        e.preventDefault();
        if (!this.isValidForm()) {
            alert('Invalid food items. Ensure you have food items added and correct quantities for all.');
        } else {
            var pickedUpInfo = {
                temperature: e.target.temp.value,
                signature: e.target.signature.value,
                timestamp: moment().valueOf(),
            };
    
            let updates = {};
            updates['status'] = DeliveryStatus.PICKED_UP;
            updates['pickedUpInfo'] = pickedUpInfo;
            if(this.foodItemsChanged()) {
                updates['description/foodItems'] = this.state.currentItems;
                updates[`description/updatedBy/${moment().valueOf()}`] = this.props.deliveryObj.delivererGroup;
            } 
            db.ref(this.props.dbRef).update(updates);
        }
    }

    foodItemsChanged() {
        if(this.state.currentItems.length !== this.initialFoodItems.length) return true;
        for (let i = 0; i < this.state.currentItems.length; i++) {
            if (!objectsAreEqual(this.state.currentItems[i], this.initialFoodItems[i])) {
                return true;
            }
        }
    }

    changeFoodItem = (index, isName) => event => {
        const newFoodItems = this.state.currentItems.map((item, foodIndex) => {
            if (index !== foodIndex) return item;
            return isName ? { ...item, food: event.target.value } : { ...item, quantity: event.target.value } 
        });
        this.setState({ currentItems: newFoodItems });
    }

    addFoodItem() {
        this.setState({
            currentItems: this.state.currentItems.concat([{ food: "" , quantity: "0", unit: "lb"}])
        });
    }

    deleteFoodItem(index) {
        this.setState({
            currentItems: this.state.currentItems.filter((item, itemIndex) => index !== itemIndex)
        });
    }

    isValidForm() {
        let fields = this.state.currentItems;
        let validQuantities = true;
        fields.forEach((item) => {
            if(!item.quantity || parseInt(item.quantity) <= 0) {
                validQuantities = false;
            }
        })
        return fields.length > 0 && validQuantities;
    }


    render() {
        return (
            <div className="mobile-delivery">
                <div className="mobile-header">
                    <p><span id="ms-highlight">Pickup</span> | <span id="mobile-header-pickup">Deliver</span> | <span id="mobile-header-pickup">Complete</span></p>
                </div>
                <div className="mobile-card">
                    <div className="mobile-card-line"></div>
                    <p className="ms-header">{this.props.da.agency}</p>
                    <p className="ms-pickup-time">Pickup between {moment(this.props.deliveryObj.startTime).format(StringFormat.TIME)} &ndash; {moment(this.props.deliveryObj.endTime).format(StringFormat.TIME)}</p>
                    <Map 
                        marginLeft="20px" 
                        height="90px" 
                        width="90%" 
                        marginTop="10px" 
                        marginRight="0px"
                        marginBottom="8px"
                        address={this.props.da.address}/>
                    <div className="ms-content">
                        <div id="ms-notes">
                            <p className="ms-content-header">Notes</p>
                            <p className="ms-notes">{this.props.deliveryObj.notes}</p>
                        </div>
                        <div id="ms-contact">
                            <p className="ms-content-header">Contact</p>
                            <p id="ms-name">{this.props.da.primaryContact.name}</p>
                            <p id="ms-position">{this.props.da.primaryContact.position}</p>
                            <a href={'tel:' + this.props.da.primaryContact.phone}>{this.props.da.primaryContact.phone}</a>
                        </div>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <p className="ms-notes">Only one volunteer should fill out this form.</p>
                        <div className="ms-temp">
                            <p className="ms-content-header">Temperature Directions</p>
                            <p className="ms-notes">Take the initial temperature of the freezer where the food being delivered is stored before delivering.</p>
                            {/* TODO: validate input in less than 32 degrees */}
                            <input name="temp" className="ms-input" type="number" placeholder="Freezer Temperature" required/>
                        </div>
                        <div id="ms-delivery-items">
                            <p className="ms-content-header">Confirm / Input Delivery Items</p>
                            <p className="ms-notes">Make sure that all of the items you're delivering today are inputted with their weights so they can be tracked.</p>
                            { this.state.currentItems.length > 0 ? 
                                <ul className="mobile-food-list">
                                    {this.state.currentItems.map((item, idx) => (
                                        <li className="mobile-food-item" key={idx}>
                                            <input type="text" placeholder="Add an item" value={item.food} onChange={this.changeFoodItem(idx, true)} required />
                                            <input type="number" placeholder={idx + 1} value={item.quantity} onChange={this.changeFoodItem(idx, false)} /><span>lbs.</span>
                                            <button type="button" onClick={() => this.deleteFoodItem(idx)}><img src={minus} alt="minus" /></button>
                                        </li>
                                    ))}
                                </ul> :
                                <p className="mobile-empty-items">It looks like no items have been inputted. Add them below.</p>
                            }
                            <button type="button" className="mobile-add-item" onClick={this.addFoodItem} ><img src="/static/media/plus-button.21dea89e.svg" alt="plus" /><span className="mobile-add-item-text">Add New Item</span></button>
                        </div>
                        <div id="ms-confirm">
                            <p className="ms-content-header">Confirmation Signature</p>
                            <p className="ms-notes">Get a confirmation signature from {this.props.da.primaryContact.name} at {this.props.da.agency} after you pick-up food items at the destination.</p>
                            {/* TODO: Signature */}
                            <input name="signature" className="ms-signature" type="text" placeholder="Signature" required/>
                        </div>
                        <input type="submit" value="Next" id="ms-next-btn"/> 
                    </form>
                </div>
                
                
            </div>
        );
    }
}

export default MobilePickup;