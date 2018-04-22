import React, { Component } from 'react';
import ReactCalendar from './ReactCalendar/Calendar';

class Calendar extends Component {
    render() {
        return <ReactCalendar account={this.props.account} />;
    }
}
export default Calendar;
