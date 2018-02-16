import React, {Component} from 'react';
import * as firebase from 'firebase';
import RepeatType from '../../Enums.js';

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

        // create DeliveryRequest object
        var deliveryRequest = {
            startDate: new Date(event.target.startDate.value),
            // TODO end 
            repeats: event.target.repeats.value,
            startTime: event.target.startTime.value, // TODO?
            endTime: event.target.endTime.value, // TODO?
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
            <form onSubmit={this.submitRequest}>
                <label>
                    Start Date
                    {/* TODO: update/save weekday chosen*/}
                    <input type="date" name="startDate" /><br/>
                    <input type="radio" name="endType" value="recur" />Recur
                        <input type="number" name="numReccurences" />times<br/>
                    <input type="radio" name="endType" value="date" />End by
                        <input type="date" name="endDate" />
                </label><br/>
                <label>
                    Repeats
                    <select name="repeats">
                        <option value={RepeatType.WEEKLY}>Weekly</option>
                        <option value={RepeatType.BIWEEKLY}>Every other week</option>
                        <option value={RepeatType.MONTHLY}>Monthly</option>
                        {/* TODO populate based on start date*/}
                        {/* <option value={RepeatType.??}>Monthly, on the ith of X</option> */}
                    </select>
                </label><br/>
                <label>
                    Primary Contact
                    <select name="primaryContact">
                        {/*TODO populate based on DA members */}
                        <option value="<member1_uid>">Member 1 Name</option>
                    </select>
                </label><br/>
                <label>
                    Start Time
                    <input type="time" name="startTime" />
                </label><br/>
                <label>
                    End Time
                    <input type="time" name="endTime" />
                </label><br/>
                <label>
                    Pickup Notes
                    <textarea name="notes" />
                </label><br/>
                <label>
                    Student Group
                    <select name="delivererGroup" defaultValue="">
                        <option value="">Select</option>
                        {/* TODO: populate based on directory */}
                        <option value="<dg1_uid>">Group 1 Name</option>
                    </select>
                </label><br/>
                <label>
                    Shelter
                    <select name="receiveingAgency" defaultValue="">
                        <option value="">Select</option>
                        {/* TODO: populate based on directory */}
                        <option value="<ra1_uid>">Shelter 1 Name</option>
                    </select>
                </label><br/>
                <input type="submit" value="Done" />
            </form>
        );
    }
}

export default RecurringPickupRequest;