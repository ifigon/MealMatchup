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
import PickupRequestedConfirmation from './PickupRequestedConfirmation';
import moment from 'moment-timezone';
import RecurringPickupForm from './RecurringPickupForm';
import EmergencyPickupForm from './EmergencyPickupForm';

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
            submissionError: null,
            foodRows: [{ foodName: '', foodWeight: '' }]
        };

        this.formId = 'recurringRequestForm';

        this.submitRequest = this.submitRequest.bind(this);
        this.createRequest = this.createRequest.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.addListToState = this.addListToState.bind(this);
        this.closeConfirm = this.closeConfirm.bind(this);
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

    closeConfirm() {
        this.setState({
            showConfirmation: false
        });
    }

    // When "Done" is clicked on the request form
    createRequest(event) {
        event.preventDefault();
        if (!this.handleValidation.bind(this)) {
            alert('Form has errors');
        } else {
            var deliveryRequest;
            var raInfo = {};
            var raRequested = null;
            var dgInfo = {};
            var dgRequested = null;
            var primaryContact = this.state.memberList[
                event.target.primaryContact.value
            ];
            var raIndex,
                dgIndex = '';

            if (this.props.type === DeliveryType.RECURRING) {
                raIndex = event.target.receivingAgency.value;
                dgIndex = event.target.delivererGroup.value;
            }
            if (this.props.type === DeliveryType.EMERGENCY) {
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
                // console.log(event.target);
                let dateTimestamp = dateTimeStringToTimestamp(
                    event.target.Date.value
                );
                let startTimestamp = dateTimeStringToTimestamp(
                    event.target.startTime.value
                );
                let endTimestamp = dateTimeStringToTimestamp(
                    event.target.endTime.value
                );

                // let dateTimestamp = moment(
                //     event.target.date.value,
                //     InputFormat.DATE
                // );

                // let durationValue;
                // // compute ending Timestamp
                // let endTimestamp, startTimestamp;

                // if (
                //     event.target.endCriteria.value ===
                //     RequestEndCriteriaType.DATE
                // ) {
                //     durationValue = event.target.endDate.value;
                //     endTimestamp = dateTimeStringToTimestamp(
                //         durationValue,
                //         event.target.startTime.value
                //     );
                // } else {
                //     durationValue = event.target.numOccurrences.value;
                //     let freq = event.target.repeats.value;
                //     if (freq === RequestRepeatType.WEEKLY) {
                //         endTimestamp = moment
                //             .tz(startTimestamp, reqTimezone)
                //             .add((durationValue - 1) * 7, 'days')
                //             .valueOf();
                //     } else if (freq === RequestRepeatType.BIWEEKLY) {
                //         endTimestamp = moment
                //             .tz(startTimestamp, reqTimezone)
                //             .add((durationValue - 1) * 14, 'days')
                //             .valueOf();
                //     } else {
                //         // TODO (jkbach): handle monthly
                //         endTimestamp = -1;
                //     }
                // }

                let pickupTimeDiffMs = (
                    moment(event.target.endTime.value, InputFormat.TIME) -
                    moment(event.target.startTime.value, InputFormat.TIME)
                ).valueOf();
                endTimestamp += pickupTimeDiffMs; //encode endTime

                if (raIndex) {
                    raRequested = this.state.receivingAgencies[raIndex];
                    raInfo['requested'] = raRequested.id;
                } else {
                    // if no specific RA requested, add all RAs to pending list
                    raInfo['pending'] = this.state.receivingAgencies.map(
                        ra => ra.id
                    );
                }

                if (dgIndex) {
                    dgRequested = this.state.delivererGroups[dgIndex];
                    dgInfo['requested'] = dgRequested.id;
                } else {
                    // if no specific DG requested, add all DGs to pending list
                    dgInfo['pending'] = this.state.delivererGroups.map(
                        dg => dg.id
                    );
                }

                // DeliveryRequest object
                deliveryRequest = {
                    status: RequestStatus.PENDING,
                    dateTimestamp: dateTimestamp,
                    startTimestamp: startTimestamp,
                    endTimestamp: endTimestamp,
                    timezone: reqTimezone,
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
            } else {
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
                    event.target.endCriteria.value ===
                    RequestEndCriteriaType.DATE
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

                if (raIndex) {
                    raRequested = this.state.receivingAgencies[raIndex];
                    raInfo['requested'] = raRequested.id;
                } else {
                    // if no specific RA requested, add all RAs to pending list
                    raInfo['pending'] = this.state.receivingAgencies.map(
                        ra => ra.id
                    );
                }

                if (dgIndex) {
                    dgRequested = this.state.delivererGroups[dgIndex];
                    dgInfo['requested'] = dgRequested.id;
                } else {
                    // if no specific DG requested, add all DGs to pending list
                    dgInfo['pending'] = this.state.delivererGroups.map(
                        dg => dg.id
                    );
                }

                // create DeliveryRequest object
                deliveryRequest = {
                    status: RequestStatus.PENDING,
                    startTimestamp: startTimestamp,
                    endTimestamp: endTimestamp,
                    timezone: reqTimezone,
                    endCriteria: {
                        type: event.target.endCriteria.value,
                        value: durationValue
                    },
                    primaryContact: primaryContact.id,
                    notes: event.target.notes.value,
                    umbrella: this.props.donatingAgency.umbrella,
                    donatingAgency: this.props.account.agency,
                    requester: this.props.account.name,
                    receivingAgency: raInfo,
                    delivererGroup: dgInfo,
                    foodItems: this.state.foodRows,
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
    }

    // when "Confirm" is clicked on the summary popup
    submitRequest() {
        // write to firebase
        firebase
            .database()
            .ref('delivery_requests')
            .child(this.props.donatingAgency.umbrella)
            .child(this.props.account.agency)
            .push(this.state.request)
            .then(() => {
                // hide popup and clear form
                this.toggleModal();
                document.getElementById(this.formId).reset();
                this.setState({ showConfirmation: true });
            })
            .catch(error => {
                this.setState({ submissionError: error });
            });
    }

    addFood(name, weight, event) {
        if (name !== '' && weight !== '') {
            var newElement = { foodName: name, foodWeight: weight };
            this.setState({ foodRows: [...this.state.foodRows, newElement] });
        }
    }

    render() {
        return (
            <div className="form">
                {this.props.type === DeliveryType.RECURRING ? (
                    <RecurringPickupForm
                        createRequest={this.createRequest}
                        errors={this.state.errors}
                        handleChange={this.handleChange}
                        memberList={this.state.memberList}
                        delivererGroups={this.state.delivererGroups}
                        receivingAgencies={this.state.receivingAgencies}
                    />
                ) : (
                    <EmergencyPickupForm
                        createRequest={this.createRequest}
                        errors={this.state.errors}
                        memberList={this.state.memberList}
                    />
                )}

                {this.state.showPopup &&
                    this.props.type === DeliveryType.RECURRING && (
                    <PickupSummary
                        title={'Request Recurring Pickup'}
                        request={this.state.request}
                        donatingAgency={this.props.donatingAgency}
                        primaryContact={this.state.primaryContact}
                        raRequested={this.state.raRequested}
                        dgRequested={this.state.dgRequested}
                        onClose={this.toggleModal}
                        onConfirm={this.submitRequest}
                        submissionError={this.state.submissionError}
                        type={this.props.type}
                    />
                )}
                {this.state.showPopup &&
                    this.props.type === DeliveryType.EMERGENCY && (
                    <PickupSummary
                        title={'Request Emergency Pickup'}
                        request={this.state.request}
                        donatingAgency={this.props.donatingAgency}
                        primaryContact={this.state.primaryContact}
                        raRequested={this.state.raRequested}
                        dgRequested={this.state.dgRequested}
                        onClose={this.toggleModal}
                        onConfirm={this.submitRequest}
                        submissionError={this.state.submissionError}
                        type={this.props.type}
                    />
                )}
                {this.state.showConfirmation && (
                    <PickupRequestedConfirmation
                        request={this.state.request}
                        closeConfirm={this.closeConfirm}
                        donatingAgency={this.props.donatingAgency}
                        raRequested={this.state.raRequested}
                    />
                )}
            </div>
        );
    }
}

export default RecurringPickupRequest;
