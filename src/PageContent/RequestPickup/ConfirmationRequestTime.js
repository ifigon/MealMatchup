import React from 'react';
import {
    RequestRepeatType,
    RequestEndCriteriaType,
    StringFormat,
    InputFormat
} from '../../Enums';
import moment from 'moment';

class ConfirmationRequestTime extends React.Component {
    render() {
        let dayOfWeek = moment(this.props.request.startTimestamp).format(
            StringFormat.WEEKDAY
        );
        var repeatMap = {
            [RequestRepeatType.WEEKLY]: 'every ' + dayOfWeek,
            [RequestRepeatType.BIWEEKLY]: 'every other ' + dayOfWeek,
            // TODO: calculate nth day of month
            [RequestRepeatType.MONTHLY]: 'monthly'
        };

        var durationText = '';
        if (
            this.props.request.endCriteria.type === RequestEndCriteriaType.OCCUR
        ) {
            durationText =
                this.props.request.endCriteria.value + ' pickups requested';
        } else {
            durationText =
                'Ending ' +
                moment(
                    this.props.request.endCriteria.value,
                    InputFormat.DATE
                ).format(StringFormat.DATE_FULL);
        }
        durationText += ' for ' + repeatMap[this.props.request.repeats];

        let start_date_with_weekday = moment(
            this.props.request.startTimestamp
        ).format(StringFormat.WEEKDAY_WITH_DATE);
        let startTime = moment(this.props.request.startTimestamp).format(
            StringFormat.TIME
        );
        let endTime = moment(this.props.request.endTimestamp).format(
            StringFormat.TIME
        );
        return (
            <div className="confirmation-time-wrapper">
                <p className="confirmation-time-p">
                    <b>Start Date:</b> {start_date_with_weekday}{' '}
                </p>
                <p className="confirmation-time-p">
                    <b>Pickups:</b> {durationText}
                </p>
                <p className="confirmation-time-p">
                    <b>Time:</b> {startTime} - {endTime}
                </p>
            </div>
        );
    }
}
export default ConfirmationRequestTime;
