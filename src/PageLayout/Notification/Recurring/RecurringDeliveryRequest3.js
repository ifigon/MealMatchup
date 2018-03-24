import React, { Component } from 'react';
import truck from '../../../icons/green_truck.svg';

class RecurringDeliveryRequest3 extends Component {
    // TODO: add pick up to calendar
    render() {
        return (
            <div className="wrapper">
                <div className="margin">
                    <img className="icon" src={truck} alt="icon" />
                    <h1>Reoccuring pickup is scheduled!</h1>
                </div>
                <p>
                    <span className="to-from">From:</span>{' '}
                    {this.props.donatingAgency}
                    <span className="right to-from">To:</span>{' '}
                    {this.props.receivingAgency} <br />
                    Start Date: {this.props.startDate} {this.props.duration}{' '}
                    Pickup between {this.props.startTime} - {this.props.endTime}
                </p>

                <div className="buttons">
                    <button
                        onClick={this.props.close}
                        className="claim end"
                        type="button"
                    >
                        View on calendar
                    </button>
                </div>
            </div>
        );
    }
}
export default RecurringDeliveryRequest3;
