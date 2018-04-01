import React, {Component} from 'react';
import firebase, { accountsRef } from '../../FirebaseConfig.js';
import { RequestRepeatType, RequestDurationType, RequestStatus } from '../../Enums.js';
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
            showPopup: false,
            request: {},
            dayOfWeek: '',
            primaryContact: {},
            raRequested: null,
            dgRequested: null
        };

        this.formId = 'recurringRequestForm';

        this.submitRequest = this.submitRequest.bind(this);
        this.createRequest = this.createRequest.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.addListToState = this.addListToState.bind(this);
    }

    // Query DB to populate lists in this.state
    componentDidMount(){
        // add members in this donating agency to state.memberList
        var members = this.props.donatingAgency.members;
        this.addListToState(members, 'memberList', true);

        var umbrella = this.props.donatingAgency.umbrella;
        accountsRef.child(umbrella).once('value').then(function (umbrellaSnap) {
            // add receiving agencies in the same umbrella to state.receivingAgencies
            var ras = umbrellaSnap.val().receivingAgencies;
            this.addListToState(ras, 'receivingAgencies', false);

            // add deliverer groups in the same umbrella to state.delivererGroups
            var dgs = umbrellaSnap.val().delivererGroups;
            this.addListToState(dgs, 'delivererGroups', false);
        }.bind(this));
    }

    // Helper function: append {id, name} for each entry in the list to
    // the given field in this.state
    addListToState(list, field, isMember) {
        for (let key in list) {
            accountsRef.child(list[key]).once('value').then(function (snap) {
                var snapVal = snap.val();

                // if adding agencies, only add verified and activated ones
                if (!isMember && (!snapVal.isVerified || !snapVal.isActivated)) {
                    return;
                }

                var entry = {
                    id: snap.key, 
                    name: snapVal.name
                };

                // also grab the phone and email for DA Members
                if (isMember) {
                    entry['phone'] = snapVal.phone;
                    entry['email'] = snapVal.email;
                } else {
                    entry['address'] = snapVal.address;
                }

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
            return {showPopup: !prevState.showPopup};
        });
    }

    // When "Done" is clicked on the request form
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

            var raInfo = {};
            var raRequested = null;
            var raIndex = event.target.receivingAgency.value;
            if (raIndex) {
                raRequested = this.state.receivingAgencies[raIndex];
                raInfo['requested'] = raRequested.id;
            } else {
                // if no specific RA requested, add all RAs to pending list
                let pending = [];
                for (let ra in this.state.receivingAgencies) {
                    pending.push(this.state.receivingAgencies[ra].id);
                }
                raInfo['pending'] = pending;
            }
            
            var dgInfo = {};
            var dgRequested = null;
            var dgIndex = event.target.delivererGroup.value;
            if (dgIndex) {
                dgRequested = this.state.delivererGroups[dgIndex];
                dgInfo['requested'] = dgRequested.id;
            } else {
                // if no specific DG requested, add all DGs to pending list
                let pending = [];
                for (let dg in this.state.delivererGroups) {
                    pending.push(this.state.delivererGroups[dg].id);
                }
                dgInfo['pending'] = pending;
            }

            var primaryContact = this.state.memberList[event.target.primaryContact.value];

            // create DeliveryRequest object
            var deliveryRequest = {
                status: RequestStatus.PENDING,
                startDate: event.target.startDate.value,
                duration:{
                    type: event.target.durationType.value,
                    value: durationValue
                },
                repeats: event.target.repeats.value,
                startTime: event.target.startTime.value,
                endTime: event.target.endTime.value,
                primaryContact: primaryContact.id,
                notes: event.target.notes.value,
                umbrella: this.props.donatingAgency.umbrella,
                donatingAgency: this.props.account.agency,
                requester: this.props.account.name,
                receivingAgency: raInfo,
                delivererGroup: dgInfo,
                requestTimestamp: Date.now()
            };

            var weekday = getWeekdayFromDateString(deliveryRequest.startDate);
            this.setState({
                request: deliveryRequest,
                dayOfWeek: weekday,
                primaryContact: primaryContact,
                raRequested: raRequested,
                dgRequested: dgRequested
            });
            
            this.toggleModal();
        }
    }

    // when "Confirm" is clicked on the summary popup
    submitRequest(){
        // write to firebase
        firebase.database().ref('delivery_requests').push(this.state.request);

        // hide popup and clear form
        this.toggleModal();
        document.getElementById(this.formId).reset();
    }

    render() {
        return (
            <div className="form">
                <form id={this.formId} onSubmit={this.createRequest}>
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
                                            <option key={i} value={i}>{member.name}</option>
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
                                            <option key={i} value={i}>{dg.name}</option>
                                        );
                                    })}
                                </select>
                            </span>
                            <span className="grid">
                                <label>Shelter</label><br/>
                                <select name="receivingAgency" defaultValue="">
                                    <option value="">Select</option>
                                    {this.state.receivingAgencies.map((ra, i) => {
                                        return (
                                            <option key={i} value={i}>{ra.name}</option>
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

                {this.state.showPopup &&
                    <PickupSummary
                        title={'Request Recurring Pickup'}
                        request={this.state.request}
                        dayOfWeek={this.state.dayOfWeek}
                        donatingAgency={this.props.donatingAgency}
                        primaryContact={this.state.primaryContact}
                        raRequested={this.state.raRequested}
                        dgRequested={this.state.dgRequested}
                        onClose={this.toggleModal}
                        onConfirm={this.submitRequest}>
                    </PickupSummary>
                }
            </div>
        );
    }
}

export default RecurringPickupRequest;