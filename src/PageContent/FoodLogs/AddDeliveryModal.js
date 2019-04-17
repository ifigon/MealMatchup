import React, { Component } from 'react';
import './FoodLogsContainer.css';
import './FoodLogStats.css';
import { StringFormat, InputFormat, DeliveryStatus } from '../../Enums'
import { formatPhone } from '../../utils/Utils'
import minus from '../../icons/minus-button.svg'
import close from '../../icons/close.svg'
import moment from 'moment-timezone';

class AddDeliveryModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            continue: false,
            currentItems: [],
            fields: {},
        };
        this.submitDelivery.bind(this);
    }

    // handleChange(field, e) {
    //     var val = e.target.value;
    //     this.setState(prevState => {
    //         let fields = prevState.fields;
    //         fields[field] = val;
    //         return { fields: fields };
    //     });
    // }

    changeFoodItem = (index, isName) => event => {
        const newFoodItems = this.state.currentItems.map((item, foodIndex) => {
            if (index !== foodIndex) return item;
            return isName ? { ...item, food: event.target.value } : { ...item, quantity: event.target.value } 
        });
        this.setState({ currentItems: newFoodItems });
    }

    addFoodItem =() => {
        this.setState({
            currentItems: this.state.currentItems.concat([{ food: "" , quantity: "0", unit: "lb"}])
        });
    }

    deleteFoodItem = (index) => {
        this.setState({
            currentItems: this.state.currentItems.filter((item, itemIndex) => index !== itemIndex)
        });
    }

    submitDelivery = (event) => {
        event.preventDefault();

        // HANDLE VALIDATION
        let reqTimezone = this.props.account.timezone;
        let dateTimeStringToTimestamp = (dateString, timeString) =>
            moment
                .tz(
                    dateString + timeString,
                    InputFormat.DATE + InputFormat.TIME,
                    reqTimezone
                )
                .valueOf();
        let timestamp = dateTimeStringToTimestamp(
            event.target.deliveryDate.value,
            event.target.deliveryTime.value
        );

        let manuallyAdded = {
            donatingAgency: event.target.donatingName.value,
            daContact: event.target.donatingContactName.value,
            receivingAgency: event.target.receivingAgency.value,
            delivererGroup: event.target.delivererGroup.value
        }

        let raContact = {
            email: event.target.receivingEmail.value,
            name: event.target.receivingContactName.value,
            phone: event.target.receivingContactPhone.value
        }

        let deliveredInfo = {
            signature: event.target.signedByReceiving.value,
            timestamp: timestamp
        }

        let deliverer1 = {
            email: event.target.volunteerEmail.value,
            name: event.target.volunteerName.value,
            phone: event.target.volunteerPhone.value
        }

        let deliverer2 = {
            email: event.target.volunteer2Email.value,
            name: event.target.volunteer2Name.value,
            phone: event.target.volunteer2Phone.value
        }

        let pickedUpInfo = {
            signature: event.target.signedByDonating.value,
            timestamp: timestamp,
            temperature: event.target.temperature.value
        }

        let deliverers = [];
        deliverers.push(deliverer1);
        deliverers.push(deliverer2);

        let description = {
            foodItems: this.state.currentItems
        }

        let delivery = {
            type: 'recurring',
            status: DeliveryStatus.COMPLETED,
            timezone: this.props.account.timezone,
            raContact: raContact,
            deliverers: deliverers,
            description: description,
            endTimestamp: timestamp,
            startTimestamp: timestamp,
            notes: event.target.notes.value,
            deliveredInfo: deliveredInfo,
            pickedUpInfo: pickedUpInfo,
            manuallyAdded: manuallyAdded
        }

        console.log(delivery);

        // push to firebase


        // next - check FoodLogsContainer to add a "manually added" note and make sure it won't break stuff
    }

    render() {
        return(
            <div className="dialog-wrapper">
                {/* close dialog if anywhere outside of dialog is clicked */}
                <div className="dialog-overlay" onClick={this.props.closeModal}></div> 
                <dialog id="manual-dialog" className={"event-dialog dialog-radius" + (!this.state.continue ? " small-dialog" : " big-dialog")} open>
                    { !this.state.continue ? 
                    <div>
                        <div className="add-delivery-warning"><span className="red-text">Warning:</span> If your past delivery was already recorded by volunteers through Meal Matchup when they were delivering it you don't have to add it in again. Only add your delivery if you don't already see it in your history. </div>
                        <div className="warning-button-group">
                            <button className="warning-button" onClick={() => this.setState({continue: true})}>Continue</button>
                            <button className="warning-button" onClick={this.props.closeModal}>Exit</button>
                        </div>
                    </div> :
                    <div>
                        <div className="d-flex modal-header">
                            <h1>Add Delivery Details</h1>
                            <button onClick={this.props.closeModal} className="close-button"><img src={close} alt="close modal" className="close-button-img"></img></button>
                        </div>
                        <p className="past-delivery-margin-p">Leave input blank if unsure.</p>
                        <form className="past-delivery-inputs" onSubmit={this.submitDelivery}>
                            <div className="d-flex"><div className="form-title">Date</div> <input name="deliveryDate" type="date" className="past-delivery-margin form-component-past-delivery"/></div>
                            <div className="d-flex"><div className="form-title">Time</div> <input name="deliveryTime" type="time" className="past-delivery-margin form-component-past-delivery"/></div>
                            <div className="d-flex"><div className="form-title">Notes</div> <input name="notes" type="text" className="form-component-past-delivery" /></div>

                            <h3>Donating Agency</h3>
                            <div className="d-flex"><div className="form-title">Agency Name</div> <input name="donatingName" type="text" className="form-component-past-delivery"/></div>
                            <div className="d-flex"><div className="form-title">Contact Name</div> <input name="donatingContactName" type="text" className="form-component-past-delivery"/></div>
                            <div className="d-flex"><div className="form-title">Contact Phone</div> <input name="donatingContactPhone" onChange={formatPhone} type="tel" pattern={StringFormat.PHONE} className="form-component-past-delivery" placeholder="555-555-5555" id="primaryPhone" /></div>

                            <h3>Receiving Agency</h3>
                            <div className="d-flex"><div className="form-title">Agency Name</div> <input name="receivingAgency" type="text" className="form-component-past-delivery" /></div>
                            <div className="d-flex"><div className="form-title">Contact Name</div> <input name="receivingContactName" type="text" className="form-component-past-delivery" /></div>
                            <div className="d-flex"><div className="form-title">Contact Phone</div> <input name="receivingContactPhone" onChange={formatPhone} type="tel" pattern={StringFormat.PHONE} className="form-component-past-delivery" placeholder="555-555-5555" id="primaryPhone" /></div>
                            <div className="d-flex"><div className="form-title">Contact Email</div> <input name="receivingEmail" type="email" className="form-component-past-delivery" /></div>

                            <h3>Deliverer Group</h3>
                            <div className="d-flex"><div className="form-title">Group Name</div> <input name="delivererGroup" type="text" className="form-component-past-delivery" /></div>
                            <div className="d-flex"><div className="form-title">Volunteer 1 Email</div> <input name="volunteerEmail" type="email" className="form-component-past-delivery" /></div>
                            <div className="d-flex"><div className="form-title">Volunteer 1 Name</div> <input name="volunteerName" type="text" className="form-component-past-delivery" /></div>
                            <div className="d-flex"><div className="form-title">Volunteer 1 Phone</div> <input name="volunteerPhone" onChange={formatPhone} type="tel" pattern={StringFormat.PHONE} className="form-component-past-delivery" placeholder="555-555-5555" id="primaryPhone" /></div>
                            <div className="d-flex"><div className="form-title">Volunteer 2 Email</div> <input name="volunteer2Email" type="email" className="form-component-past-delivery"/></div>
                            <div className="d-flex"><div className="form-title">Volunteer 2 Name</div> <input name="volunteer2Name" type="text" className="form-component-past-delivery"/></div>
                            <div className="d-flex"><div className="form-title">Volunteer 2 Phone</div> <input name="volunteer2Phone" onChange={formatPhone} type="tel" pattern={StringFormat.PHONE} className="form-component-past-delivery" placeholder="555-555-5555" id="primaryPhone" /></div>

                            <h3>Signed For By / Delivery Info</h3>
                            <div className="d-flex"><div className="form-title">At Donation Agency</div> <input name="signedByDonating" type="text" className="form-component-past-delivery"/></div>
                            <div className="d-flex"><div className="form-title">At Receiving Agency</div> <input name="signedByReceiving" type="text" className="form-component-past-delivery"/></div>
                            <div className="d-flex"><div className="form-title">Freezer Temperature (F)</div> <input name="temperature" type="number" className="form-component-past-delivery"/></div>
                            
                            <h3>Food Items</h3>
                            { this.state.currentItems.length > 0 ? 
                                <ul className="mobile-food-list past-delivery-margin">
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
                            <button type="button" className="mobile-add-item past-delivery-margin" onClick={this.addFoodItem} ><img src="/static/media/plus-button.21dea89e.svg" alt="plus" /><span className="mobile-add-item-text">Add New Item</span></button><br/>

                            <div className="past-delivery-button-container">
                                <button type="submit" className="past-delivery-modal-button past-delivery-margin">Add Delivery</button>
                                <button type="button" onClick={this.props.closeModal} className="past-delivery-modal-button past-delivery-margin">Exit</button>
                            </div>
                        </form>
                    </div>
                    }
                </dialog>
            </div>
        )
    }

}

export default AddDeliveryModal;