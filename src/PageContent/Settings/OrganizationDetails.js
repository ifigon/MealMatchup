import React, { Component } from 'react';
import Map from '../../Map/Map.js';
import { AccountType } from '../../Enums';
import { accountsRef, donatingAgenciesRef } from '../../FirebaseConfig.js';
import moment from 'moment-timezone';

class OrganizationDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            times: [],
        };
        this.convertTimes = this.convertTimes.bind(this);
        this.dayRow = this.dayRow.bind(this);
        this.dayNames = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
    }

    dayRow(i, day) {

        let checkboxName = day + 'Check';
        let startName = day + 'Start';
        let endName = day + 'End';

        // populate default values if exists
        var checked = false;
        var startTime = '';
        var endTime = '';
        var availabilities = this.props.org.availabilities;
        if (availabilities && availabilities[i]) {
            checked = true;
            startTime = availabilities[i].startTimestamp;
            endTime = availabilities[i].endTimestamp;
        }

        return (
            <div className="row" key={day}> 
                <input type="checkbox" name={checkboxName} defaultChecked={checked} />
                <div className="day">{day}</div>
                <input type="time" name={startName} defaultValue={moment(startTime).format("HH:mm")} className="ra3-inputBox" />
                <span className="ra3-spacing">to</span>
                <input type="time" name={endName} defaultValue={moment(endTime).format("HH:mm")} className="ra3-inputBox" />
            </div>
        );
    }

    convertTimes() {
        var convert = []
        var dayNames = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
        for (var i = 0; i < this.props.org.availabilities.length; i++) {
             if (this.props.org.availabilities[i]) {
                convert.push(<li key={i}>{dayNames[i] + ' ' + moment(this.props.org.availabilities[i].startTimestamp).format("h:mm a") + '-' + moment(this.props.org.availabilities[i].endTimestamp).format("h:mm a")}</li>)
            }   
        }

        return convert;
    }

    

    render() {
        return (
            <div className="scs-0">
                <div className="scs-0-image">
                    <Map
                        marginLeft="20px" 
                        height="150px" 
                        width="70%" 
                        marginTop="10px" 
                        marginRight="0px"
                        marginBottom="0px"
                        address={this.props.org.address}
                    />
                </div>

                {!this.state.isEditing ?

                    <div className="scs-0-content">
                        <h5>Organization Details</h5>
                        <h6>{this.props.org.name}</h6>
                        <div className="scs-spacing" />
                        <h6>Address: {this.props.org.address.street1}, {this.props.org.address.street2 ? <span>{this.props.org.address.street2},</span> : <span />} {this.props.org.address.city}, {this.props.org.address.state} - {this.props.org.address.zipcode}</h6>
                        {this.props.org.address.officeNo ?
                            <h6>Office Number: {this.props.org.address.officeNo}</h6>
                            :
                            <span />
                        }
                        {this.props.org.numVolunteers ? <h6>Volunteers: {this.props.org.numVolunteers}</h6> : <span />}
                        {this.props.org.deliveryNotes ? <h6>Delivery Notes: {this.props.org.deliveryNotes}</h6> : <span />}
                        {this.props.accountType === AccountType.RECEIVING_AGENCY ? 
                            <h6>Emergency Pickup Activated: {this.props.org.acceptEmergencyPickups ? 'Yes' : 'No'}</h6> 
                            : 
                            <span />
                        }
                        {this.props.accountType === AccountType.RECEIVING_AGENCY ? 
                            <h6>Availabilities: {this.convertTimes()}</h6> 
                            
                            : 
                            <span />
                        }
                        <div className="scs-spacing-lg" />
                        {!this.props.isAdmin && this.props.accountType === AccountType.DONATING_AGENCY_MEMBER ?
                            <span />
                            :
                            <div className="amd-edit amd-edit-1">
                                <button type="button" className="form-button confirm-button" onClick={this.handleEdit.bind(this)}>Edit</button>
                            </div>
                        }
                    </div>

                    :

                    <div className="scs-0-content scs-1-editing">
                        <h5>Organization Details</h5>

                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="editing-box">
                                <div className="editing-child-1">
                                    <label className="label-component details">Name</label><br /><br />
                                    <label className="label-component details">Street 1</label><br /><br />
                                    <label className="label-component details">Street 2</label><br /><br />
                                    <label className="label-component details">City</label><br /><br />
                                    <label className="label-component details">State</label><br /><br />
                                    <label className="label-component details">Zip</label><br /><br />
                                    <label className="label-component details">Office Number</label><br /><br />
                                    {this.props.accountType === AccountType.DELIVERER_GROUP &&  
                                        <label className="label-component details">Volunteers</label>
                                    }
                                    {this.props.accountType === AccountType.RECEIVING_AGENCY &&
                                        <div>
                                            <label className="label-component details">Delivery Notes</label><br /><br />
                                        </div>
                                    }

                                    {this.props.accountType === AccountType.RECEIVING_AGENCY &&
                                        <label className="label-component details">Emergency Pickup</label>
                                    }
                                    {this.props.accountType === AccountType.RECEIVING_AGENCY &&
                                        <label className="label-component details">Availability</label>
                                    }
                                </div>
                                
                                <div className="editing-child-2">
                                    <input name="name" type="text" className="form-input" defaultValue={this.props.org.name} /><br /><br />
                                    <input name="street1" type="text" className="form-input" defaultValue={this.props.org.address.street1} /><br /><br />
                                    <input name="street2" type="text" className="form-input" defaultValue={this.props.org.address.street2} /><br /><br />
                                    <input name="city" type="text" className="form-input" defaultValue={this.props.org.address.city} /><br /><br />
                                    <input name="state" type="text" className="form-input" defaultValue={this.props.org.address.state} /><br /><br />
                                    <input name="zip" type="text" className="form-input" defaultValue={this.props.org.address.zipcode} /><br /><br />
                                    <input name="officeNo" type='text' className="form-input" defaultValue={this.props.org.address.officeNo} /><br /><br />
                                    {this.props.accountType === AccountType.DELIVERER_GROUP && 
                                        <input name="num_vol" type="number" className="form-input" defaultValue={this.props.org.numVolunteers} />
                                    }
                                    {this.props.accountType === AccountType.RECEIVING_AGENCY &&  
                                        <div>
                                            <input name="notes" type="text" className="form-input" defaultValue={this.props.org.deliveryNotes} /><br /><br />
                                        </div>
                                    }
                                    {this.props.accountType === AccountType.RECEIVING_AGENCY && 
                                        <div>
                                            <input type="checkbox" name="ep" defaultChecked={this.props.org.acceptEmergencyPickups}/><br /><br />
                                        </div>
                                    }
                                    {this.props.accountType === AccountType.RECEIVING_AGENCY &&  
                                        <div>        
                                        {this.dayNames.map((day, i) => {
                                            return this.dayRow(i, day);
                                        })}
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="scs-spacing-lg" />
                            <div className="">
                                <div className="amd-edit amd-edit-1">
                                    <button type="submit" className="form-button confirm-button settings-edit" onSubmit={this.handleSubmit.bind(this)}>Save</button>
                                </div>
                                <div className="amd-edit amd-edit-1">
                                    <button type="button" className="form-button confirm-button settings-edit" onClick={this.handleCancel.bind(this)}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>

                }

            </div>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        const { org, accountType } = this.props;

        let name = e.target.name.value;
        let address = {
            street1: e.target.street1.value,
            street2: e.target.street2.value,
            city: e.target.city.value,
            state: e.target.state.value,
            zipcode: e.target.zip.value,
            officeNo: e.target.officeNo.value
        };
        var availabilities = {};
        for (let i in this.dayNames) {
            var day = this.dayNames[i];
            var checkboxName = day + 'Check';

            // only add availability if checkbox was checked
            if (e.target[checkboxName].checked ) {
                var startStr = e.target[day + 'Start'].value; // eg "10:00"
                var endStr = e.target[day + 'End'].value; // eg "17:00"
                var dayTimeFormat = 'e HH:mm';  // eg "3 10:00" for Wed 10AM
                var startTimestamp = moment(i + ' ' + startStr, dayTimeFormat);
                var endTimestamp = moment(i + ' ' + endStr, dayTimeFormat);

                availabilities[i] = {
                    startTimestamp: startTimestamp.valueOf(),
                    endTimestamp: endTimestamp.valueOf()
                };
            }
        }

        let updates = {
            address: address,
            name: name,
            availabilities: availabilities 
        };

        if (e.target.num_vol)
            updates['numVolunteers'] = e.target.num_vol.value;
        if (e.target.notes)
            updates['deliveryNotes'] = e.target.notes.value;
        if (e.target.ep)
            updates['acceptEmergencyPickups'] = e.target.ep.checked;

        // write updates to db
        if (accountType === AccountType.DONATING_AGENCY_MEMBER) { // write to /donatingAgencies/
            donatingAgenciesRef.child(org.uid).update(updates, this.setState({isEditing: false}));
        } else { // write to /accounts/
            accountsRef.child(org.uid).update(updates, this.setState({isEditing: false}));
        }
    }

    handleEdit() {
        this.setState({
            isEditing: true
        });
    }

    handleCancel() {
        this.setState({
            isEditing: false
        });
    }

}

export default OrganizationDetails;