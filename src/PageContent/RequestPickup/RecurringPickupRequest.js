import React, {Component} from 'react';
import firebase from '../../FirebaseConfig.js';
import { RequestRepeatType, RequestDurationType } from '../../Enums.js';
import './RequestPickup.css';

class RecurringPickupRequest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            memberList: [
                {id: 'dhA03LwTp3cibXVUcb3nQqO34wj1', name: 'Test DA1 Member1'}, 
                {id: 'fbCm3Yrbi4e12WgpVz3gq25VKea2', name: 'Test DA1 Member2'}
            ],
            delivererGroups: [
                {id: 'R8BAHrxdkfQoAmfWvGa1OJmjQP43', name: 'Test DG1'},
                {id: 'sS4dqgxgLIXtPf42DydgkWLWeHT2', name: 'Test DG2'}
            ],
            receivingAgencies: [
                {id: 'uCm0OG4WeoSyjk3c0rdY3mlaBXl2', name: 'Test RA2'},
                {id: 'uGOFJ8NqHjbZhKAYzSZFRs1dSKD3', name: 'Test RA1'}
            ],
            fields: {},
            errors: {}
        }; 
        this.submitRequest = this.submitRequest.bind(this);
    }

    componentDidMount(){
        const daRef = firebase.database().ref('donating_agencies').child(this.props.account.agency);
        daRef.on('value', (snapshot) => {
            let donatingAgency = snapshot.val();
            this.setState({
                // memberList: donatingAgency.members,
                schoolID: donatingAgency.school
            })
        });
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Date
        if(!fields["startDate"]){
           formIsValid = false;
           errors["startDate"] = "Start date cannot be empty";
        }

        if(fields["endDate"] < fields["startDate"]){
            formIsValid = false;
            errors["endBeforeStart"] = "End date cannot be before start date";
        }

        //Time
        if(!fields["startTime"]){
           formIsValid = false;
           errors["startTime"] = "Start time cannot be empty";
        }

        if(!fields["endTime"]){
            formIsValid = false;
            errors["endTime"] = "End time cannot be empty";
         }

         if(fields["startTime"] > fields["endTime"] || fields["endTime"] < fields["startTime"]){
            formIsValid = false;
            errors["time"] = "Invalid time range";
        }    
       this.setState({errors: errors});
       return formIsValid;
    }

    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }

    submitRequest(event) {
        if(!this.handleValidation()){ 
            alert('Form has errors');
        }else{
            document.getElementById('recurringForm').reset();
        }

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
            <div className="form" id="recurringForm">
                <form onSubmit={this.submitRequest}>
                    {/* TODO: everything should be required except for notes, and agencies involved */}
                    <div className="info">
                        <p id="form-heading">Schedule Recurring Pickup</p>
                        <p className="error">{this.state.errors["endBeforeStart"]}</p>
                        <p className="error">{this.state.errors["startTime"]}</p>
                        <p className="error">{this.state.errors["endTime"]}</p>
                        <p className="error">{this.state.errors["startDate"]}</p>
                        <p className="error">{this.state.errors["time"]}</p>
                        <span className="flex">
                            <span className="grid">
                                <label>Start Date  <span className="red">*</span></label><br/>
                                <input type="date" name="startDate" onChange={this.handleChange.bind(this, "startDate")} required/><br/>
                                <p className="error">{this.state.errors["startDate"]}</p>
                            </span>
                            <span className="grid smaller">
                                <input type="radio" name="durationType" value={RequestDurationType.RECUR} required/>
                                {/* <span className="radio" name="durationType" value={RequestDurationType.RECUR}/> */}
                                <label className="smaller">Recur</label >
                                <input type="number" name="numRecurrences" />times<br/>

                                <input type="radio" name="durationType" value={RequestDurationType.DATE} />
                                <label className="smaller">End by</label>
                                <input type="date" name="endDate" onChange={this.handleChange.bind(this, "endDate")} />
                                {/* TODO check if end date is after start date? */}
                                {}
                                <br/>
                            </span>
                        </span>
                        <span className="flex">
                            <span className="grid">
                                <label>Repeats <span className="red">*</span></label><br/>
                                <select name="repeats" defaultValue="select">
                                    <option value="select" disabled>Select</option>
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
                                <select name="primaryContact" defaultValue="select">
                                    <option value="select" disabled>Select</option>
                                    {this.state.memberList.map((member,i) => {
                                        return (
                                            <option key={i} value={member.id}>{member.name}</option>
                                        )
                                    })}
                                </select><br/>
                            </span>
                        </span> 
                        <span className="flex">
                            <span className="grid">
                                <label>Start Time  <span className="red">*</span></label><br/>
                                <input type="time" name="startTime" onChange={this.handleChange.bind(this, "startTime")} required/>
                            </span>
                            <span className="grid">
                                <label>End Time  <span className="red">*</span></label><br/>
                                <input type="time" name="endTime" onChange={this.handleChange.bind(this, "endTime")} required/>
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
                                <select name="delivererGroup" defaultValue="select">
                                    <option value="select" disabled>Select</option>
                                    {/* TODO: populate based on directory */}
                                    {this.state.delivererGroups.map((dg,i) => {
                                        return (
                                            <option key={i} value={dg.id}>{dg.name}</option>
                                        )
                                    })}
                                </select>
                            </span>
                            <span className="grid">
                                <label>Shelter</label><br/>
                                <select name="receiveingAgency" defaultValue="select">
                                    <option value="select" disabled>Select</option>
                                    {/* TODO: populate based on directory */}
                                    {this.state.receivingAgencies.map((ra, i) => {
                                        return (
                                            <option key={i} value={ra.id}>{ra.name}</option>
                                        )
                                    })}
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