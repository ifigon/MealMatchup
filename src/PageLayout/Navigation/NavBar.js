// NavBar.js
import React, {Component} from 'react';
import NavBarItem from './NavBarItem';
import './NavBar.css';
import calendar from '../../icons/calendar.svg';
import directory from '../../icons/directory.svg';
import foodLog from '../../icons/food_log.svg';
import settings from '../../icons/settings.svg';

class NavBar extends Component {
    render() {
        return (
            <div className="navbar">
                <NavBarItem item={'Calendar'} icon={calendar}></NavBarItem>
                <NavBarItem item={'Food Logs'} icon={foodLog}></NavBarItem>
                <NavBarItem item={'Directory'} icon={directory}></NavBarItem>
                <NavBarItem item={'Settings'} icon={settings}></NavBarItem>
            </div>
        )
    }
}

export default NavBar;