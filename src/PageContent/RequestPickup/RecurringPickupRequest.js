import React, {Component} from 'react';

import firebase, { accountsRef } from '../../FirebaseConfig.js';
import { RequestRepeatType, RequestDurationType } from '../../Enums.js';
import { getWeekdayFromDateString } from '../../Utils.js';

import './RequestPickup.css';
import PickupSummary from './PickupSummary.js';

class RecurringPickupRequest extends Component {

    constructor(props) {
        // Props: account, donatingAgency
        super(props);

        this.state = {
            memberList: [],
            delivererGroups: [],
            receivingAgencies: [],
            fields: {},
            errors: {},
            isOpen: false,
            request: {},
            dayOfWeek: ''
        };

        this.submitRequest = this.submitRequest.bind(this);
        this.createRequest = this.createRequest.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.addListToState = this.addListToState.bind(this);
    }

    // Query DB to populate lists in this.state
    componentDidMount(){
        // add members in this donating agency to state.memberList
        var members = this.props.donatingAgency.members;
        this.addListToState(members, 'memberList');

        var umbrella = this.props.donatingAgency.umbrella;
        accountsRef.child(umbrella).once('value').then(function (umbrellaSnap) {
            // add receiving agencies in the same umbrella to state.receivingAgencies
            var ras = umbrellaSnap.val().receivingAgencies;
            this.addListToState(ras, 'receivingAgencies');

            // add deliverer groups in the same umbrella to state.delivererGroups
            var dgs = umbrellaSnap.val().delivererGroups;
            this.addListToState(dgs, 'delivererGroups');

        }.bind(this));
    }

    // Helper function: append {id, name} for each entry in the list to
    // the given field in this.state
    addListToState(list, field) {
        for (let key in list) {
            accountsRef.child(list[key]).once('value').then(function (snap) {
                var entry = {
                    id: snap.key, 
                    name: snap.val().name
                };
                // append entry into state
                this.setState((prevState) => {
                    return {[field]: prevState[field].concat(entry)};
                });
            }.bind(this));
        }
    }

    // Validate the request form inputs
    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Date
        if(!fields['startDate']){
            formIsValid = false;
            errors['startDate'] = 'Start date cannot be empty';
        }

        if (!fields['durationType']) {
            // the they need to have one or the other error msg
            errors['durationType'] = 'Must select radio button';
            formIsValid = false;
        } else {
            if (fields['durationType'] === RequestDurationType.DATE) {
                // perform all endDate related checks
                if(fields['endDate'] < fields['startDate']){
                    formIsValid = false;
                    errors['endBeforeStart'] = 'End date cannot be before start date';
                }else if(fields['endDate'] === '' || !fields['endDate']){
                    formIsValid = false;
                    errors['endBeforeStart'] = 'Enter an end date';
                }
            } else {
                // perform all recurTimes related checks
                if(fields['recurTimes'] === '' || !fields['recurTimes'] || fields['recurTimes'] < 1){
                    formIsValid = false;
                    errors['invalidRecurTimes'] = 'Pickup must recur at least once';
                }
            }
        }

        //Time
        if(fields['endTime'] < fields['startTime']){
            formIsValid = false;
            errors['time'] = 'Invalid time range';
        }    

        this.setState({
            errors: errors
        });
        return formIsValid;
    }

    handleChange(field, e){   
        let fields = this.state.fields;
        fields[field] = e.target.value; 
        this.setState({fields});
    }

    toggleModal(){
        this.setState((prevState) => {
            return {isOpen: !prevState.isOpen};
        });
    }

    createRequest(event) {
        event.preventDefault();
        if (!this.handleValidation()) {
            alert('Form has errors');
        } else {
            // process various fields
            var durationValue = null;
            if (event.target.durationType.value === RequestDurationType.DATE) {
                durationValue = event.target.endDate.value;
            } else {
                durationValue = event.target.numRecurrences.value;
            }

            var pendingRAs = [];
            var raUid = event.target.receiveingAgency.value;
            if (raUid) {
                pendingRAs.push(raUid);
            } else {
                // if no specific RA requested, add all RAs to pending list
                for (let ra in this.state.receivingAgencies) {
                    pendingRAs.push(this.state.receivingAgencies[ra].id);
                }
            }
            
            var pendingDGs = [];
            var dgUid = event.target.delivererGroup.value;
            if (dgUid) {
                pendingDGs.push(dgUid);
            } else {
                // if no specific DG requested, add all DGs to pending list
                for (let dg in this.state.delivererGroups) {
                    pendingDGs.push(this.state.delivererGroups[dg].id);
                }
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
                umbrella: this.props.donatingAgency.umbrella,
                donatingAgency: this.props.account.agency,
                requester: this.props.account.name,
                receiveingAgency: {
                    pending: pendingRAs
                },
                delivererGroup: {
                    pending: pendingDGs
                },
                requestTimestamp: Date.now()
            };

            var weekday = getWeekdayFromDateString(deliveryRequest.startDate);
            this.setState({
                request: deliveryRequest,
                dayOfWeek: weekday
            });
            
            this.toggleModal();
        }
    }

    // write to firebase
    submitRequest(){
        var newRequest = firebase.database().ref('delivery_requests').push();
        newRequest.set(this.state.request);
    }

    render() {
        return (
            <div className="form" id="recurringForm">
                <form onSubmit={this.createRequest}>
                    <div className="info">
                        <p id="form-heading">Schedule Recurring Pickup</p>
                        {
                            Object.keys(this.state.errors).map((error, i) => {
                                return (
                                    <p className="error" key={i}>{this.state.errors[error]}</p>
                                );
                            })
                        }
                        <span className="flex">
                            <span className="grid">
                                <label>Start Date  <span className="red">*</span></label><br/>
                                <input type="date" name="startDate" onChange={this.handleChange.bind(this, 'startDate')} required/><br/>
                            </span>
                            <span className="grid">
                                <label className="container smaller">
                                    <input type="radio" name="durationType" value={RequestDurationType.RECUR} onChange={this.handleChange.bind(this, 'durationType')} required/>
                                    <span className="checkmark"></span>Recur
                                    <input type="number" name="numRecurrences" onChange={this.handleChange.bind(this, 'recurTimes')} />times<br/>
                                </label >
                                <label className="container smaller">
                                    <input type="radio" name="durationType" value={RequestDurationType.DATE} onChange={this.handleChange.bind(this, 'durationType')}/>
                                    <span className="checkmark"></span>End by
                                    <input type="date" name="endDate" onChange={this.handleChange.bind(this, 'endDate')} />
                                </label>
                                <br/>
                            </span>
                        </span>
                        <span className="flex">
                            <span className="grid">
                                <label>Repeats <span className="red">*</span></label><br/>
                                <select name="repeats" defaultValue="" required>
                                    <option value="" disabled>Select</option>
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
                                <select name="primaryContact" defaultValue="" required>
                                    <option value="" disabled>Select</option>
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
                                placeholder="Ex: Use the underground parking garage upon entrance. Key card access required after 3:00pm."/>
                        </span>
                        <p id="form-heading">Agencies involved</p>
                        <span className="flex">
                            <span className="grid">
                                <label>Student Group</label><br/>
                                <select name="delivererGroup" defaultValue="">
                                    <option value="">Select</option>
                                    {this.state.delivererGroups.map((dg,i) => {
                                        return (
                                            <option key={i} value={dg.id}>{dg.name}</option>
                                        );
                                    })}
                                </select>
                            </span>
                            <span className="grid">
                                <label>Shelter</label><br/>
                                <select name="receiveingAgency" defaultValue="">
                                    <option value="">Select</option>
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
                            <input type="reset" value="Cancel" />
                        </div>
                    </div>
                </form>
                <PickupSummary 
                    type={'Request Recurring Pickup'} 
                    startDate={this.state.request.startDate} 
                    dayOfWeek={this.state.dayOfWeek}
                    duration={this.state.request.duration}
                    repeats={this.state.request.repeats}
                    startTime={this.state.request.startTime}
                    endTime={this.state.request.endTime}
                    notes={this.state.request.notes}
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