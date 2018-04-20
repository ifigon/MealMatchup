import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tile from '../Tile';

import {
    getBeginOfDay,
    getDay,
    getEndOfDay,
    getISOLocalDate,
    isWeekend
} from '../shared/dates';
import { tileProps } from '../shared/propTypes';
// import moment from 'moment';

class Day extends Component {
    render() {
        let curClasses = this.props.classes;
        let currentMonthIndex = this.props.currentMonthIndex;
        let date = this.props.date;

        const className = 'react-calendar__month-view__days__day';
        // let eventsToday = [];

        // for (var checkEvent in this.state.events) {
        //     if (
        //         new Date(this.state.events[checkEvent].startTimestamp * 1000)
        //             .toString()
        //             .startsWith(date.toString().substring(0, 15))
        //     ) {
        //         // no dupilcate keys - will have to check against start time?
        //         eventsToday.push(this.state.events[checkEvent]);
        //     }
        // }

        console.log(date);
        console.log(getISOLocalDate(date).toString());
        return (
            <Tile
                classes={[
                    ...curClasses,
                    className,
                    isWeekend(date) ? `${className}--weekend` : null,
                    date.getMonth() !== currentMonthIndex
                        ? `${className}--neighboringMonth`
                        : null
                ]}
                date={date}
                dateTime={`${getISOLocalDate(date)}T00:00:00.000`}
                maxDateTransform={getEndOfDay}
                minDateTransform={getBeginOfDay}
                view="month"
                // events={eventsToday}
                // today={today}
                // futureEvent={futureEvent}
            >
                {getDay(date)}
            </Tile>
        );
    }
}

Day.propTypes = {
    currentMonthIndex: PropTypes.number.isRequired,
    ...tileProps
};

export default Day;
