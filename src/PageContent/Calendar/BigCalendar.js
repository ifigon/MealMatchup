import React, {Component} from 'react';
import Calendar from 'react-calendar';
import './Calendar.css'
import Moment from 'moment'

class BigCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todayNum: null
        }

        this.nextMonth = this.nextMonth.bind(this);
        this.prevMonth = this.prevMonth.bind(this);
    }

    componentWillMount() {
        this.setState({
            todayNum: Moment().format("D")
        });
    }

    componentDidMount() {
        console.log("today:" + this.state.todayNum)
        if (this.state.todayNum > 10) {
            // this.setState({
            //     todayNum: 
            // })
        }
    //     // TODO ADD CIRCLES AROUND EACH TIME FOR "TODAY" INDICATOR
    //     var dayTimeTags = document.getElementsByTagName('time');

    //     for (var i = 0; i < dayTimeTags.length; i++) {
    //         // `element` is the element you want to wrap
            // var parent = dayTimeTags[i].parentNode;
            // var wrapper = document.createElement('div');
            // wrapper.className = "calendar-day-wrapper";

    //         // set the wrapper as child (instead of the element)
    //         parent.replaceChild(wrapper, dayTimeTags[i]);
    //         // set element as child of wrapper
    //         wrapper.appendChild(dayTimeTags[i]);

    //         // dayTimeTags[i].
    //         // console.log(dayTimeTags[i].firstChild.data); //second console output
    //     }

        var calendarTiles = document.getElementsByClassName("react-calendar__tile");
        // var dayTimeTags = document.getElementsByTagName('time');

        for (var i = 0; i < calendarTiles.length; i++) {
            var date = calendarTiles[i].children[0];
            var wrapper = document.createElement('div');

            // date-current-day is classname for current day

            wrapper.className = "button-date-text ";
            wrapper.appendChild(date)
            calendarTiles[i].appendChild(wrapper)
            
            console.log(calendarTiles[i])
            if(!calendarTiles[i].classList.contains('react-calendar__month-view__days__day--neighboringMonth')) {
                if(calendarTiles[i].children[0].children[0].innerHTML === this.state.todayNum) {
                    calendarTiles[i].children[0].classList.add('date-current-day');
                }
            }
            var eventsDiv = document.createElement('div');
            eventsDiv.innerHTML = "event";
            // TODO APPEND EVENTS TO THIS DIV
            calendarTiles[i].appendChild(eventsDiv);
        }
    }

    //accomodate +/- years and random selection of dates from react-calendar for current day class active
    nextMonth(e) {
        e.preventDefault();
        this.setState({
            month:Moment().add(this.state.diff,'months').format('MMMM')
        });
    }

    prevMonth(e) {
        e.preventDefault();
        this.setState({
            month:Moment().subtract(this.state.diff,'months').format('MMMM')
        });
    }

    // render() {
    //     return (
    //         <div style={{marginTop: '120px', marginLeft:'250px'}} id="calHeader">
    //             <div id="monPrev" onClick={this.prevMonth}>
    //                 <img alt="icon" type="image/svg+xml" src={Previous} className="user-icon"/>
    //             </div>
    //             <div id="monName">{this.state.month}</div>
    //             <div id="monNext" onClick={this.nextMonth}>
    //                 <img alt="icon" type="image/svg+xml" src={Next} className="user-icon"/>
    //             </div>
    //         </div>
    //     );
    // }

    render() {
        return (
            <div style={{marginTop: '120px', marginLeft:'250px', marginRight:'50px', marginBottom:'25px'}} id="calHeader">
                <Calendar />
            </div>
        );
    }
}

export default BigCalendar;