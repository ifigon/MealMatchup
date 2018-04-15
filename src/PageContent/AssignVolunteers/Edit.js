import React, { Component } from 'react';
import moment from 'moment';
import { StringFormat } from '../../Enums';

class Edit extends Component {
    render() {
        const {
            startTimestamp,
            endTimestamp,
            donatingAgency,
            receivingAgency,
            deliverers,
        } = this.props.delivery;

        let startMoment =  moment(startTimestamp);
        let startTime = startMoment.format(StringFormat.TIME);
        let day = startMoment.format(StringFormat.WEEKDAY);
        let date = startMoment.format(StringFormat.DATE_FULL);
        let endMoment = moment(endTimestamp);
        let endTime = endMoment.format(StringFormat.TIME);

        return (
            <div>
                <div className="date-container">
                    {day}, {date} - Pick-up between {startTime} - {endTime}
                </div>
                <div className="content-container">
                    <h5 className="location" id="top"><i className="fas fa-circle circle-marker" /><span className="spacing" />{donatingAgency.name}</h5>
                    <i className="fas fa-circle ellipses" />
                    <i className="fas fa-circle ellipses" />
                    <i className="fas fa-circle ellipses" />
                    <h5 className="location" id="bottom"><i className="fas fa-map-marker-alt map-marker" /><span className="spacing" />{receivingAgency}</h5>
                </div>
                <div className="form-container">
                    <form onSubmit={this.handleConfirmClick.bind(this)}>
                        <label className="label-component">Student Deliverers</label>
                        <div className="form-parent">
                            {(() => {
                                let volunteerRows = [];
                                for (let i = 0; i < 2; i++) {
                                    let present = deliverers && deliverers[i];
                                    volunteerRows.push(
                                        <div key={i} className="form-child">
                                            <label className="label-component details">Student {i + 1}</label><br />
                                            <input name={`name${(i + 1)}`} type="text" className="form-input" defaultValue={present ? deliverers[i].name : ''} required/><br />
                                            <label className="label-component details">Phone</label><br />
                                            <input name={`phone${(i + 1)}`} onChange={this.phoneFormat} type="tel" pattern={StringFormat.PHONE} placeholder="xxx-xxx-xxxx" className="form-input" defaultValue={present ? deliverers[i].phone : ''} required/><br />
                                            <label className="label-component details">Email</label><br />
                                            <input name={`email${(i + 1)}`} type="email" className="form-input" defaultValue={present ? deliverers[i].email : ''} required/>
                                        </div>
                                    );
                                }
                                return volunteerRows;
                            })()}
                            {/* <div className="form-child second-row">
                                 <h5 className="label-component" id="info">Email notifications will be sent to all deliverers.</h5>
                            </div> */}
                            <div className="form-child second-row form-buttons-container">
                                <button type="button" className="form-button" onClick={this.props.handleCancelClick}>Cancel</button>
                                <button type="submit" className="form-button confirm-button" onSubmit={this.handleConfirmClick.bind(this)}>Confirm</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    handleConfirmClick(e) {
        e.preventDefault();
        let d1 = {
            name: e.target.name1.value,
            phone: e.target.phone1.value,
            email: e.target.email1.value
        };
        let d2 = {
            name: e.target.name2.value,
            phone: e.target.phone2.value,
            email: e.target.email2.value
        };
        this.props.handleConfirmClick(d1, d2);
    }

    phoneFormat(e,f) {
        let val = e.target.value.replace(/\D/g, '').substring(0, 10);
        let corrected = '';
        for (let i = 0; i < val.length; i++) {
            if (i === 3 || i === 6) {
                corrected += '-';
            }
            corrected += val.charAt(i);
        }
        e.target.value = corrected;
    }
}

export default Edit;