// Disable undeclared variable check on 'exports'
/*global exports:true*/
/*eslint no-undef: "error"*/

import moment from 'moment';
import { DateTimeFormat } from './Enums.js';

export function getWeekdayFromDateString(dateStr) {
    let m = moment(dateStr, DateTimeFormat.DATE);
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[m.day()];
};