import React, { Component } from 'react';
import { RequestRepeatType, RequestEndCriteriaType } from '../../Enums.js';

class RecurringPickupForm extends Component {
    constructor(props) {
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
            submissionError: null
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

    render() {
        return (
            <form
                id={this.formId}
                onSubmit={this.props.createRequest.bind(this)}
            >
                <div className="info">
                    <p id="form-heading">Schedule Recurring Pickup</p>
                    {Object.keys(this.props.errors).map((error, i) => {
                        return (
                            <p className="error" key={i}>
                                {this.state.errors[error]}
                            </p>
                        );
                    })}
                    <span className="flex">
                        <span className="grid">
                            <label>
                                Start Date <span className="red">*</span>
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
                                End Criteria <span className="red">*</span>
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
                            <select name="repeats" defaultValue="" required>
                                <option value="" disabled>
                                    Select
                                </option>
                                <option value={RequestRepeatType.WEEKLY}>
                                    Weekly
                                </option>
                                <option value={RequestRepeatType.BIWEEKLY}>
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
                                Primary Contact <span className="red">*</span>
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
                                {this.props.memberList.map((member, i) => {
                                    return (
                                        <option key={i} value={i}>
                                            {member.name}
                                        </option>
                                    );
                                })}
                            </select>
                            <br />
                        </span>
                    </span>
                    <span className="flex">
                        <span className="grid">
                            <label>
                                Start Time <span className="red">*</span>
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
                            <select name="delivererGroup" defaultValue="">
                                <option value="">Select</option>
                                {this.props.delivererGroups.map((dg, i) => {
                                    return (
                                        <option key={i} value={i}>
                                            {dg.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </span>
                        <span className="grid">
                            <label>Shelter</label>
                            <br />
                            <select name="receivingAgency" defaultValue="">
                                <option value="">Select</option>
                                {this.props.receivingAgencies.map((ra, i) => {
                                    return (
                                        <option key={i} value={i}>
                                            {ra.name}
                                        </option>
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
        );
    }
}
export default RecurringPickupForm;
