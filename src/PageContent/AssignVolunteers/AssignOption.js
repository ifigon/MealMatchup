import React, { Component } from 'react';
import {DeliveryStatus} from '../../Enums.js';
import {StringFormat} from '../../Enums.js';
import moment from 'moment';

class AssignOption extends Component {
    getButton(status, deliverers) {
        if (status === DeliveryStatus.COMPLETED) {
            return (<button disabled className="form-button already-completed-button" id={this.props.deliveryId}>Completed</button>);
        } else if (!deliverers || deliverers.length === 0) {
            return (<button type="button" className="form-button confirm-button-assign" id={this.props.deliveryId} onClick={this.props.handleEditClick}>Assign Volunteers</button>);
        } else {
            return (<button type="button" className="form-button confirm-button" id={this.props.deliveryId} onClick={this.props.handleEditClick}>Edit</button>);
        }
    }

    render() {
        const {
            deliverers,
            receivingAgency,
            startTimestamp,
            status,
        } = this.props.delivery;

        let startMoment = moment(startTimestamp);
        let date = startMoment.format(StringFormat.WEEKDAY_WITH_DATE);
        return (
            <div className="avi-row">
                <div className="container avi-details-container">
                    <div className="avi-detail">
                        {date} Pick-up 
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
                        {this.getButton(status, deliverers)}
                        
                    </div>
                </div>
            </div>
        );
    }

}

export default AssignOption;