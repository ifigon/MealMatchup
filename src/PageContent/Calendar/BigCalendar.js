import React, {Component} from 'react';
import Calendar from 'react-calendar';
import './Calendar.css'

class BigCalendar extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
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
            var wrapper = document.createElement('span');
            wrapper.className = "button-date-text";
            wrapper.appendChild(date)
            // console.log(wrapper)
            calendarTiles[i].appendChild(wrapper)
            console.log(calendarTiles[i])





            // // console.log(date.innerHTML)
            
            // // var newDate = document.createElement('time');
            // // newDate = date;

            // var parent = dayTimeTags[i].parentNode;
            // // console.log(parent)
           
            
            // wrapper.className = "calendar-day-wrapper";
            // wrapper.appendChild(date);
            // // wrapper.innerHTML = date.innerHTML;
            // // console.log(wrapper)
            // // //when replace, is it removing parent classes?
            // console.log(calendarTiles[i])
            // // calendarTiles[i].replaceChild(wrapper, calendarTiles[i].children[0]);
            // // date.replaceChild


            var eventsDiv = document.createElement('div');
            eventsDiv.innerHTML = "event";
            // TODO APPEND EVENTS TO THIS DIV
            calendarTiles[i].appendChild(eventsDiv);
            
        }

    }

    render() {
        return (
            <div style={{marginTop: '120px', marginLeft:'250px', marginRight:'50px', marginBottom:'25px'}} id="calHeader">
                <Calendar />
            </div>
        );
    }
}

export default BigCalendar;