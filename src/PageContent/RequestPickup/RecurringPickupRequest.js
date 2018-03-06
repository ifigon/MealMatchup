import React, {Component} from 'react';
import { RequestRepeatType, RequestDurationType } from '../../Enums.js';
import './RequestPickup.css';
import PickupSummary from './PickupSummary.js';

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
            errors: {},
            isOpen: false,
            formInfo: [],
            dayOfWeek: ''
        }; 
        this.submitRequest = this.submitRequest.bind(this);
        this.createRequest = this.createRequest.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount(){
        // Query DB and setState for memberList, delivererGroups, and receivingAgencies
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Date
        if(!fields['startDate']){
            formIsValid = false;
            errors['startDate'] = 'Start date cannot be empty';
        }

        if((fields['recurTimes'] === '' || !fields['recurTimes']) && fields['endDate'] !== '' && fields['endDate'] < fields['startDate']){
            formIsValid = false;
            errors['endBeforeStart'] = 'End date cannot be before start date';
        }

        //Time
        if(!fields['startTime']){
            formIsValid = false;
            errors['startTime'] = 'Start time cannot be empty';
        }

        if(!fields['endTime'] && (!fields['recurTimes'] || fields['recurTimes'] === '')){
            formIsValid = false;
            errors['endTime'] = 'End time cannot be empty';
        }

        if(fields['endTime'] < fields['startTime']){
            formIsValid = false;
            errors['time'] = 'Invalid time range';
        }    

        //Recur times
        if(fields['recurTimes'] <= 0 && fields['endDate'] !== '') {
            formIsValid = false;
            errors['recurTimes'] = 'Pickup must recur at least once';
        }

        if((fields['recurTimes'] === '' && fields['endDate'] === '') 
            || (!fields['recurTimes'] && !fields['endDate'])){
            formIsValid = false;
            errors['recurTimes'] = 'Must enter value for recurring times or an end date';
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }

    toggleModal(){
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    // write to firebase
    // var newRequest = firebase.database().ref().child("delivery_requests").push();
    // newRequest.set(deliveryRequest);
    
    submitRequest(){
        
    }

    createRequest(event) {
        
        if(!this.handleValidation()){ 
            event.preventDefault();
            alert('Form has errors');
        }else{
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
                duration:{
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
            let date = new Date(deliveryRequest.startDate);
            let day = date.getDay();
            let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

            this.setState({
                formInfo: deliveryRequest,
                dayOfWeek: days[day]
            });
            
            this.toggleModal();
        }
    }

    render() {
        return (
            <div className="form" id="recurringForm">
                <form onSubmit={this.createRequest}>
                    <div className="info">
                        <p id="form-heading">Schedule Recurring Pickup</p>
                        <p className="error">{this.state.errors['endBeforeStart']}</p>
                        <p className="error">{this.state.errors['startTime']}</p>
                        <p className="error">{this.state.errors['endTime']}</p>
                        <p className="error">{this.state.errors['recurTimes']}</p>
                        <p className="error">{this.state.errors['startDate']}</p>
                        <p className="error">{this.state.errors['time']}</p>
                        <span className="flex">
                            <span className="grid">
                                <label>Start Date  <span className="red">*</span></label><br/>
                                <input type="date" name="startDate" onChange={this.handleChange.bind(this, 'startDate')} required/><br/>
                            </span>
                            <span className="grid">
                                <label className="container smaller">
                                    <input type="radio" name="durationType" value={RequestDurationType.RECUR} required/>
                                    <span className="checkmark"></span>Recur
                                    <input type="number" name="numRecurrences" onChange={this.handleChange.bind(this, 'recurTimes')} />times<br/>
                                </label >
                                <label className="container smaller">
                                    <input type="radio" name="durationType" value={RequestDurationType.DATE} />
                                    <span className="checkmark"></span>End by
                                    <input type="date" name="endDate" onChange={this.handleChange.bind(this, 'endDate')} />
                                </label>
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
                                        );
                                    })}
                                </select><br/>
                            </span>
                        </span> 
                        <span className="flex">
                            <span className="grid">
                                <label>Start Time  <span className="red">*</span></label><br/>
                                <input type="time" name="startTime" onChange={this.handleChange.bind(this, 'startTime')} required/>
                            </span>
                            <span className="grid">
                                <label>End Time  <span className="red">*</span></label><br/>
                                <input type="time" name="endTime" onChange={this.handleChange.bind(this, 'endTime')} required/>
                            </span>
                        </span>
                        <span className="grid">
                            <p id="form-heading">Notes for Pickup</p>
                            <textarea name="notes" 
                                placeholder="Ex: Use the underground parking garage upon entrance. 
                                Key card access required after 3:00pm."/>
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
                                        );
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
                                        );
                                    })}
                                </select>
                            </span>
                        </span>
                        <div className="buttons-form">
                            <input type="submit" value="Done" /> 
                            <input type="submit" value="Cancel" />
                        </div>
                    </div>
                </form>
                <PickupSummary 
                    type={'Request Recurring Pickup'} 
                    startDate={this.state.formInfo.startDate} 
                    dayOfWeek={this.state.dayOfWeek}
                    duration={this.state.formInfo.duration}
                    repeats={this.state.formInfo.repeats}
                    startTime={this.state.formInfo.startTime}
                    endTime={this.state.formInfo.endTime}
                    notes={this.state.formInfo.notes}
                    account={this.props.account}
                    show={this.state.isOpen} 
                    onClose={this.toggleModal}
                    onConfirm={this.submitRequest}>
                </PickupSummary>
            </div>
        );
    }
}

export default RecurringPickupRequest;