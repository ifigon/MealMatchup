import React, { Component } from 'react';
import './FoodLogsContainer.css';
import { StringFormat } from '../../Enums'
import { formatPhone } from '../../utils/Utils'
import minus from '../../icons/minus-button.svg'

class AddDeliveryModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            continue: false,
            currentItems: [],
            fields: {},
        };
    }

    handleChange(field, e) {
        var val = e.target.value;
        this.setState(prevState => {
            let fields = prevState.fields;
            fields[field] = val;
            return { fields: fields };
        });
    }

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

    render() {
        

        return(
            <div className="dialog-wrapper">
                {/* close dialog if anywhere outside of dialog is clicked */}
                <div className="dialog-overlay" onClick={this.props.closeModal}></div> 
                <dialog id="manual-dialog" className="event-dialog" open>
                    { !this.state.continue ? 
                    <div>
                        <div className="add-delivery-warning"><span className="red-text">Warning:</span> You should only add a delivery through here if it hasn't already been facilitated through Meal Matchup. Deliveries done through Meal Matchup are added automatically. Do you want to continue and add another delivery for record keeping purposes?</div>
                        <div className="warning-button-group">
                            <button className="warning-button" onClick={() => this.setState({continue: true})}>Continue</button>
                            <button className="warning-button" onClick={this.props.closeModal}>Exit</button>
                        </div>
                    </div> :
                    <div>
                        Leave input blank if unsure.
                        <form>
                            <input name="endDate" type="date" /><br/>

                            Donating Agency<br/>
                            <input name="donatingName" type="text" /><br/>
                            <input name="donatingContactName" type="text" /><br/>
                            <input name="donatingContactPhone" onChange={formatPhone} type="tel" pattern={StringFormat.PHONE} className="form-component" placeholder="555-555-5555" id="primaryPhone" /><br/>

                            Receiving Agency<br/>
                            <input name="receivingName" type="text" /><br/>
                            <input name="receivingContactName" type="text" /><br/>
                            <input name="receivingContactPhone" onChange={formatPhone} type="tel" pattern={StringFormat.PHONE} className="form-component" placeholder="555-555-5555" id="primaryPhone" /><br/>


                            Deliverer Group<br/>
                            <input name="dgName" type="text" /><br/>
                            <input name="volunteerEmail" type="text" /><br/>
                            <input name="volunteerName" type="text" /><br/>
                            <input name="volunteerPhone" onChange={formatPhone} type="tel" pattern={StringFormat.PHONE} className="form-component" placeholder="555-555-5555" id="primaryPhone" /><br/>
                            <input name="volunteer2Email" type="text" /><br/>
                            <input name="volunteer2Name" type="text" /><br/>
                            <input name="volunteer2Phone" onChange={formatPhone} type="tel" pattern={StringFormat.PHONE} className="form-component" placeholder="555-555-5555" id="primaryPhone" /><br/>

                            Delivery Info
                            <input name="signedBy" type="text" /><br/>
                            <input name="temperature" type="number" /><br/>
                            
                            Food Items
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
                            <button type="button" className="mobile-add-item" onClick={this.addFoodItem} ><img src="/static/media/plus-button.21dea89e.svg" alt="plus" /><span className="mobile-add-item-text">Add New Item</span></button><br/>

                            Notes
                            <input name="notes" type="text" />
                        </form>
                    </div>
                    }
                </dialog>
            </div>
        )
    }

}

export default AddDeliveryModal;