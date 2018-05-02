import React, { Component } from 'react';
import firebase, { accountsRef } from '../../FirebaseConfig.js';
import {
    RequestRepeatType,
    RequestEndCriteriaType,
    RequestStatus,
    InputFormat,
    DeliveryType
} from '../../Enums.js';
import './RequestPickup.css';
import PickupSummary from './PickupSummary.js';
import moment from 'moment-timezone';
import add from '../../icons/plus-button.svg';

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
            primaryContact: {},
            raRequested: null,
            dgRequested: null,
            type: ''
        };

        this.formId = 'recurringRequestForm';

        this.submitRequest = this.submitRequest.bind(this);
        this.createRequest = this.createRequest.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.addListToState = this.addListToState.bind(this);
    }

    // Query DB to populate lists in this.state
    componentDidMount() {
        // add members in this donating agency to state.memberList
        var members = this.props.donatingAgency.members;
        this.addListToState(members, 'memberList', true);

        var umbrella = this.props.donatingAgency.umbrella;
        accountsRef
            .child(umbrella)
            .once('value')
            .then(
                function(umbrellaSnap) {
                    // add receiving agencies in the same umbrella to state.receivingAgencies
                    var ras = umbrellaSnap.val().receivingAgencies;
                    this.addListToState(ras, 'receivingAgencies', false);

                    // add deliverer groups in the same umbrella to state.delivererGroups
                    var dgs = umbrellaSnap.val().delivererGroups;
                    this.addListToState(dgs, 'delivererGroups', false);
                }.bind(this)
            );
    }

    componentWillReceiveProps() {
        this.setState({ type: this.props.type });
    }
    // Helper function: append {id, name} for each entry in the list to
    // the given field in this.state
    addListToState(list, field, isMember) {
        for (let key in list) {
            accountsRef
                .child(list[key])
                .once('value')
                .then(
                    function(snap) {
                        var snapVal = snap.val();

                        // if adding agencies, only add verified and activated ones
                        if (
                            !isMember &&
                            (!snapVal.isVerified || !snapVal.isActivated)
                        ) {
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
                            entry['primaryContact'] = snapVal.primaryContact;
                        }

                        // append entry into state
                        this.setState(prevState => {
                            return { [field]: prevState[field].concat(entry) };
                        });
                    }.bind(this)
                );
        }
    }

    // Validate the request form inputs
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Date
        if (!fields['startDate']) {
            formIsValid = false;
            errors['startDate'] = 'Start date cannot be empty';
        }

        if (!fields['endCriteria']) {
            // the they need to have one or the other error msg
            errors['endCriteria'] = 'Must select radio button';
            formIsValid = false;
        } else if (fields['endCriteria'] === RequestEndCriteriaType.DATE) {
            // perform all endDate related checks
            if (fields['endDate'] < fields['startDate']) {
                formIsValid = false;
                errors['endBeforeStart'] =
                    'End date cannot be before start date';
            } else if (fields['endDate'] === '' || !fields['endDate']) {
                formIsValid = false;
                errors['endBeforeStart'] = 'Enter an end date';
            }
        } else if (
            fields['occurTimes'] === '' ||
            !fields['occurTimes'] ||
            fields['occurTimes'] < 2
        ) {
            formIsValid = false;
            errors['invalidOccurTimes'] = 'Pickup must recur at least once';
        }

        //Time
        if (fields['endTime'] < fields['startTime']) {
            formIsValid = false;
            errors['time'] = 'Invalid time range';
        }

        this.setState({
            errors: errors
        });
        return formIsValid;
    }

    handleChange(field, e) {
        var val = e.target.value;
        this.setState(prevState => {
            let fields = prevState.fields;
            fields[field] = val;
            return { fields: fields };
        });
    }

    toggleModal() {
        this.setState(prevState => {
            return { showPopup: !prevState.showPopup };
        });
    }

    // When "Done" is clicked on the request form
    createRequest(event) {
        event.preventDefault();
        if (!this.handleValidation()) {
            alert('Form has errors');
        } else {
            // force request's timezone to be the same as DA's
            let reqTimezone = this.props.donatingAgency.timezone;
            let dateTimeStringToTimestamp = (dateString, timeString) =>
                moment
                    .tz(
                        dateString + timeString,
                        InputFormat.DATE + InputFormat.TIME,
                        reqTimezone
                    )
                    .valueOf();
            let startTimestamp = dateTimeStringToTimestamp(
                event.target.startDate.value,
                event.target.startTime.value
            );

            let durationValue;
            // compute ending Timestamp
            let endTimestamp;
            if (
                event.target.endCriteria.value === RequestEndCriteriaType.DATE
            ) {
                durationValue = event.target.endDate.value;
                endTimestamp = dateTimeStringToTimestamp(
                    durationValue,
                    event.target.startTime.value
                );
            } else {
                durationValue = event.target.numOccurrences.value;
                let freq = event.target.repeats.value;
                if (freq === RequestRepeatType.WEEKLY) {
                    endTimestamp = moment
                        .tz(startTimestamp, reqTimezone)
                        .add((durationValue - 1) * 7, 'days')
                        .valueOf();
                } else if (freq === RequestRepeatType.BIWEEKLY) {
                    endTimestamp = moment
                        .tz(startTimestamp, reqTimezone)
                        .add((durationValue - 1) * 14, 'days')
                        .valueOf();
                } else {
                    // TODO (jkbach): handle monthly
                    endTimestamp = -1;
                }
            }
            let pickupTimeDiffMs = (
                moment(event.target.endTime.value, InputFormat.TIME) -
                moment(event.target.startTime.value, InputFormat.TIME)
            ).valueOf();
            endTimestamp += pickupTimeDiffMs; //encode endTime

            var raInfo = {};
            var raRequested = null;
            var raIndex = event.target.receivingAgency.value;
            if (raIndex) {
                raRequested = this.state.receivingAgencies[raIndex];
                raInfo['requested'] = raRequested.id;
            } else {
                // if no specific RA requested, add all RAs to pending list
                raInfo['pending'] = this.state.receivingAgencies.map(
                    ra => ra.id
                );
            }

            var dgInfo = {};
            var dgRequested = null;
            var dgIndex = event.target.delivererGroup.value;
            if (dgIndex) {
                dgRequested = this.state.delivererGroups[dgIndex];
                dgInfo['requested'] = dgRequested.id;
            } else {
                // if no specific DG requested, add all DGs to pending list
                dgInfo['pending'] = this.state.delivererGroups.map(dg => dg.id);
            }

            var primaryContact = this.state.memberList[
                event.target.primaryContact.value
            ];

            // create DeliveryRequest object
            var deliveryRequest = {
                status: RequestStatus.PENDING,
                startTimestamp: startTimestamp,
                endTimestamp: endTimestamp,
                timezone: reqTimezone,
                endCriteria: {
                    type: event.target.endCriteria.value,
                    value: durationValue
                },
                repeats: event.target.repeats.value,
                primaryContact: primaryContact.id,
                notes: event.target.notes.value,
                umbrella: this.props.donatingAgency.umbrella,
                donatingAgency: this.props.account.agency,
                requester: this.props.account.name,
                receivingAgency: raInfo,
                delivererGroup: dgInfo,
                requestTimestamp: Date.now()
            };

            this.setState({
                request: deliveryRequest,
                primaryContact: primaryContact,
                raRequested: raRequested,
                dgRequested: dgRequested
            });

            this.toggleModal();
        }
    }

    // when "Confirm" is clicked on the summary popup
    submitRequest() {
        // write to firebase
        firebase
            .database()
            .ref('delivery_requests')
            .child(this.props.donatingAgency.umbrella)
            .child(this.props.account.agency)
            .push(this.state.request);

        // hide popup and clear form
        this.toggleModal();
        document.getElementById(this.formId).reset();
    }

    addFood() {
        //TODO add item
    }

    render() {
        return (
            <div className="form">
                {this.state.type === DeliveryType.EMERGENCY ? (
                    <form id={this.formId} onSubmit={this.createRequest}>
                        <div className="info">
                            <p id="form-heading">Schedule Recurring Pickup</p>
                            {Object.keys(this.state.errors).map((error, i) => {
                                return (
                                    <p className="error" key={i}>
                                        {this.state.errors[error]}
                                    </p>
                                );
                            })}
                            <span className="flex">
                                <span className="grid">
                                    <label>
                                        Start Date{' '}
                                        <span className="red">*</span>
                                    </label>
                                    <br />
                                    <input
                                        type="date"
                                        name="startDate"
                                        onChange={this.handleChange.bind(
                                            this,
                                            'startDate'
                                        )}
                                        required
                                    />
                                    <br />
                                </span>
                                <span className="grid">
                                    <label>
                                        {' '}
                                        End Criteria{' '}
                                        <span className="red">*</span>
                                    </label>
                                    <br />
                                    <label className="container-smaller">
                                        <input
                                            type="radio"
                                            name="endCriteria"
                                            value={RequestEndCriteriaType.OCCUR}
                                            onChange={this.handleChange.bind(
                                                this,
                                                'endCriteria'
                                            )}
                                            required
                                        />
                                        <span className="checkmark" />After{' '}
                                        <input
                                            type="number"
                                            name="numOccurrences"
                                            onChange={this.handleChange.bind(
                                                this,
                                                'occurTimes'
                                            )}
                                        />{' '}
                                        times<br />
                                    </label>
                                    <label className="container-smaller">
                                        <input
                                            type="radio"
                                            name="endCriteria"
                                            value={RequestEndCriteriaType.DATE}
                                            onChange={this.handleChange.bind(
                                                this,
                                                'endCriteria'
                                            )}
                                        />
                                        <span className="checkmark" />End on
                                        <input
                                            type="date"
                                            name="endDate"
                                            onChange={this.handleChange.bind(
                                                this,
                                                'endDate'
                                            )}
                                        />
                                    </label>
                                    <br />
                                </span>
                            </span>
                            <span className="flex">
                                <span className="grid">
                                    <label>
                                        Repeats <span className="red">*</span>
                                    </label>
                                    <br />
                                    <select
                                        name="repeats"
                                        defaultValue=""
                                        required
                                    >
                                        <option value="" disabled>
                                            Select
                                        </option>
                                        <option
                                            value={RequestRepeatType.WEEKLY}
                                        >
                                            Weekly
                                        </option>
                                        <option
                                            value={RequestRepeatType.BIWEEKLY}
                                        >
                                            Every other week
                                        </option>
                                        {/* TODO warning if not every month in the range has this date */}
                                        {/* <option value={RequestRepeatType.MONTHLY}>Monthly</option> */}
                                        {/* (TODO SPR18) Nth Weekday of Month */}
                                        {/* <option value={RequestRepeatType.??}>Monthly, on the ith of X</option> */}
                                    </select>
                                    <br />
                                </span>
                                <span className="grid">
                                    <label>
                                        Primary Contact{' '}
                                        <span className="red">*</span>
                                    </label>
                                    <br />
                                    <select
                                        name="primaryContact"
                                        defaultValue=""
                                        required
                                    >
                                        <option value="" disabled>
                                            Select
                                        </option>
                                        {this.state.memberList.map(
                                            (member, i) => {
                                                return (
                                                    <option key={i} value={i}>
                                                        {member.name}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                    <br />
                                </span>
                            </span>
                            <span className="flex">
                                <span className="grid">
                                    <label>
                                        Start Time{' '}
                                        <span className="red">*</span>
                                    </label>
                                    <br />
                                    <input
                                        type="time"
                                        name="startTime"
                                        onChange={this.handleChange.bind(
                                            this,
                                            'startTime'
                                        )}
                                        required
                                    />
                                </span>
                                <span className="grid">
                                    <label>
                                        End Time <span className="red">*</span>
                                    </label>
                                    <br />
                                    <input
                                        type="time"
                                        name="endTime"
                                        onChange={this.handleChange.bind(
                                            this,
                                            'endTime'
                                        )}
                                        required
                                    />
                                </span>
                            </span>
                            <span className="grid">
                                <p id="form-heading">Notes for Pickup</p>
                                <textarea
                                    name="notes"
                                    placeholder="Ex: Use the underground parking garage upon entrance. Key card access required after 3:00pm."
                                />
                            </span>
                            <p id="form-heading">Agencies involved</p>
                            <span className="flex">
                                <span className="grid">
                                    <label>Student Group</label>
                                    <br />
                                    <select
                                        name="delivererGroup"
                                        defaultValue=""
                                    >
                                        <option value="">Select</option>
                                        {this.state.delivererGroups.map(
                                            (dg, i) => {
                                                return (
                                                    <option key={i} value={i}>
                                                        {dg.name}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                </span>
                                <span className="grid">
                                    <label>Shelter</label>
                                    <br />
                                    <select
                                        name="receivingAgency"
                                        defaultValue=""
                                    >
                                        <option value="">Select</option>
                                        {this.state.receivingAgencies.map(
                                            (ra, i) => {
                                                return (
                                                    <option key={i} value={i}>
                                                        {ra.name}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                </span>
                            </span>
                            <div className="buttons-form">
                                <input type="submit" value="Done" />
                                <input type="reset" value="Cancel" />
                            </div>
                        </div>
                    </form>
                ) : (
                    <form id={this.formId} onSubmit={this.createRequest}>
                        <div className="info">
                            <p id="form-heading">Schedule Emergency Pickup</p>
                            {Object.keys(this.state.errors).map((error, i) => {
                                return (
                                    <p className="error" key={i}>
                                        {this.state.errors[error]}
                                    </p>
                                );
                            })}
                            <span className="flex">
                                <span className="grid">
                                    <label>
                                        Date <span className="red">*</span>
                                    </label>
                                    <br />
                                    <input
                                        type="date"
                                        name="Date"
                                        onChange={this.handleChange.bind(
                                            this,
                                            'Date'
                                        )}
                                        required
                                    />
                                    <br />
                                </span>
                            </span>
                            <span className="flex">
                                <span className="grid">
                                    <label>
                                        Primary Contact{' '}
                                        <span className="red">*</span>
                                    </label>
                                    <br />
                                    <select
                                        name="primaryContact"
                                        defaultValue=""
                                        required
                                    >
                                        <option value="" disabled>
                                            Select
                                        </option>
                                        {this.state.memberList.map(
                                            (member, i) => {
                                                return (
                                                    <option key={i} value={i}>
                                                        {member.name}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                    <br />
                                </span>
                            </span>
                            <span className="flex">
                                <span className="grid">
                                    <label>
                                        Start Time{' '}
                                        <span className="red">*</span>
                                    </label>
                                    <br />
                                    <input
                                        type="time"
                                        name="startTime"
                                        onChange={this.handleChange.bind(
                                            this,
                                            'startTime'
                                        )}
                                        required
                                    />
                                </span>
                                <span className="grid">
                                    <label>
                                        End Time <span className="red">*</span>
                                    </label>
                                    <br />
                                    <input
                                        type="time"
                                        name="endTime"
                                        onChange={this.handleChange.bind(
                                            this,
                                            'endTime'
                                        )}
                                        required
                                    />
                                </span>
                            </span>
                            <p id="form-heading">Food Items</p>
                            <span className="flex">
                                <span className="grid">
                                    <label>Name</label>
                                    <br />
                                    <input
                                        name="foodName"
                                        defaultValue=""
                                        required
                                    />
                                </span>
                                <span className="grid">
                                    <label>Weight</label>
                                    <br />
                                    <input
                                        name="foodWeight"
                                        defaultValue=""
                                        required
                                    />
                                    <img
                                        src={add}
                                        alt="add item"
                                        onClick={this.addFood.bind(this)}
                                    />
                                </span>
                            </span>

                            <span className="grid">
                                <p id="form-heading">Notes for Pickup</p>
                                <textarea
                                    name="notes"
                                    placeholder="Ex: Use the underground parking garage upon entrance. Key card access required after 3:00pm."
                                />
                            </span>
                            <div className="buttons-form">
                                <input type="submit" value="Done" />
                                <input type="reset" value="Cancel" />
                            </div>
                        </div>
                    </form>
                )}

                {this.state.showPopup && (
                    <PickupSummary
                        title={'Request Recurring Pickup'}
                        request={this.state.request}
                        donatingAgency={this.props.donatingAgency}
                        primaryContact={this.state.primaryContact}
                        raRequested={this.state.raRequested}
                        dgRequested={this.state.dgRequested}
                        onClose={this.toggleModal}
                        onConfirm={this.submitRequest}
                    />
                )}
            </div>
        );
    }
}

export default RecurringPickupRequest;
