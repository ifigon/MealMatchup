// Disable undeclared variable check on 'exports'
/*global exports:true*/
/*eslint no-undef: "error"*/

import moment from 'moment';
import { StringFormat } from './Enums.js';

export function getWeekdayFromDateString(dateStr) {
    let m = moment(dateStr, StringFormat.DATE);
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[m.day()];
}