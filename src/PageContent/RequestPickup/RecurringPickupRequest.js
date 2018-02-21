import React, {Component} from 'react';
// TODO: after app_setup is merged
// import firebase from '../../FirebaseConfig.js';
import { RequestRepeatType, RequestDurationType } from '../../Enums.js';
import './RequestPickup.css';

class RecurringPickupRequest extends Component {

    constructor(props) {
        super(props);
        this.state = {}; 
        this.submitRequest = this.submitRequest.bind(this);
    }

    submitRequest(event) {
        event.preventDefault();
        var raUid = event.target.receiveingAgency.value;
        if (!raUid) raUid = null;
        
        var dgUid = event.target.delivererGroup.value;
        if (!dgUid) dgUid = null;

        var durationValue = null;
        if (event.target.durationType.value === RequestDurationType.DATE) {
            durationValue = event.target.endDate.value;
        } else {
            durationValue = event.target.numRecurrences.value;
        }

        // create DeliveryRequest object
        var deliveryRequest = {
            startDate: event.target.startDate.value,
            duration: {
                type: event.target.durationType.value,
                value: durationValue
            },
            repeats: event.target.repeats.value,
            startTime: event.target.startTime.value,
            endTime: event.target.endTime.value,
            primaryContact: event.target.primaryContact.value,
            notes: event.target.notes.value,
            receiveingAgency: {
                uid: raUid,
                confirmed: false
            },
            delivererGroup: {
                uid: dgUid,
                confirmed: false
            },
            requestTimestamp: Date.now()
        };

        console.log("request submitted!");
        console.log(deliveryRequest);

        // write to firebase
        // var newRequest = firebase.database().ref().child("delivery_requests").push();
        // newRequest.set(deliveryRequest);
        // console.log("Added to DB!");
    }

    render() {
        return (
            <div className="form">
                <form onSubmit={this.submitRequest}>
                    {/* TODO: everything should be required except for notes, and agencies involved */}
                    <div className="info">
                        <p id="form-heading">Schedule Recurring Pickup</p>
                        <span className="flex">
                            <span className="grid">
                                <label>Start Date  <span className="red">*</span></label><br/>
                                <input type="date" name="startDate" /><br/>
                            </span>
                            <span className="grid">
                                <label className="smaller">
                                    <input type="radio" name="durationType" value={RequestDurationType.RECUR} />
                                    {/* <span className="radio" name="durationType" value={RequestDurationType.RECUR}/> */}
                                    Recur
                                    <input type="number" name="numRecurrences" />times<br/>
                                </label >
                                <label className="smaller">
                                    <input type="radio" name="durationType" value={RequestDurationType.DATE} />
                                    End by
                                    <input type="date" name="endDate" />
                                    {/* TODO check if end date is after start date? */}
                                </label>
                                <br/>
                            </span>
                        </span>
                        <span className="flex">
                            <span className="grid">
                                <label>Repeats <span className="red">*</span></label><br/>
                                <select name="repeats">
                                    <option value={RequestRepeatType.WEEKLY}>Weekly</option>
                                    <option value={RequestRepeatType.BIWEEKLY}>Every other week</option>
                                    {/* TODO warning if not every month in the range has this date */}
                                    <option value={RequestRepeatType.MONTHLY}>Monthly</option>
                                    {/* (TODO SPR18) Nth Weekday of Month */}
                                    {/* <option value={RequestRepeatType.??}>Monthly, on the ith of X</option> */}
                                </select><br/>
                            </span>
                            <span className="grid">
                                <label>Primary Contact <span className="red">*</span></label><br/>
                                <select name="primaryContact">
                                    {/*TODO populate based on DA members */}
                                    <option value="<member1_uid>">Member 1 Name</option>
                                </select><br/>
                            </span>
                        </span> 
                        <span className="flex">
                            <span className="grid">
                                <label>Start Time  <span className="red">*</span></label><br/>
                                <input type="time" name="startTime"/>
                            </span>
                            <span className="grid">
                                <label>End Time  <span className="red">*</span></label><br/>
                                <input type="time" name="endTime" />
                                {/* TODO check end time is later than start time? */}
                            </span>
                        </span>
                        <span className="grid">
                            <p id="form-heading">Notes for Pickup</p>
                            <textarea name="notes" />
                        </span>
                        <p id="form-heading">Agencies involved</p>
                        <span className="flex">
                            <span className="grid">
                                <label>Student Group</label><br/>
                                <select name="delivererGroup" defaultValue="">
                                    <option value="">Select</option>
                                    {/* TODO: populate based on directory */}
                                    <option value="<dg1_uid>">Group 1 Name</option>
                                </select>
                            </span>
                            <span className="grid">
                                <label>Shelter</label><br/>
                                <select name="receiveingAgency" defaultValue="">
                                    <option value="">Select</option>
                                    {/* TODO: populate based on directory */}
                                    <option value="<ra1_uid>">Shelter 1 Name</option>
                                </select>
                            </span>
                        </span>
                        <div className="buttons">
                            <input type="submit" value="Done" /> 
                            <input type="submit" value="Cancel" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default RecurringPickupRequest;