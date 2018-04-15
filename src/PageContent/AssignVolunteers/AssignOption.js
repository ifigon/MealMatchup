import React, { Component } from 'react';
import {StringFormat} from '../../Enums.js';
import moment from 'moment';

class AssignOption extends Component {
    render() {
        const {
            deliverers,
            receivingAgency,
            startTimestamp,
        } = this.props.delivery;

        let startMoment = moment(startTimestamp);
        let startDay = startMoment.format(StringFormat.WEEKDAY);
        let startDate = startMoment.format(StringFormat.DATE_FULL);
        return (
            <div className="avi-row">
                <div className="container avi-details-container">
                    <div className="avi-detail">
                        {startDay}, {startDate} Pick-up 
                    </div>
                    <div className="avi-detail">
                        {receivingAgency}
                    </div>
                    <div className="avi-detail avi-volunteers">
                        {
                            (deliverers && deliverers.map((deliverer, index) => {
                                return <h5 key={index}>{deliverer.name}</h5>;
                            }))
                        }
                    </div>
                    <div className="avi-detail avi-volunteers">
                        {(!deliverers || deliverers.length === 0) ? 
                            <button type="button" className="form-button confirm-button-assign" id={this.props.deliveryId} onClick={this.props.handleEditClick}>Assign Volunteers</button>
                            : <button type="button" className="form-button confirm-button" id={this.props.deliveryId} onClick={this.props.handleEditClick}>Edit</button>
                        }
                    </div>
                </div>
            </div>
        );
    }

}

export default AssignOption;