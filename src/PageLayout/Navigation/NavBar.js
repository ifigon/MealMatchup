// NavBar.js
import React, {Component} from 'react';
import { AccountType, PageContent }from '../../Enums.js';
import NavBarItem from './NavBarItem';
import './NavBar.css';
import assign_volunteer from '../../icons/assign_volunteer.svg';
import calendar from '../../icons/calendar.svg';
import directory from '../../icons/directory.svg';
import foodLog from '../../icons/food_log.svg';
import settings from '../../icons/settings.svg';
import truck from '../../icons/truck.svg';

class NavBar extends Component {
    render() {
        return (
            <div className="navbar">
                <NavBarItem item={PageContent.CALENDAR} icon={calendar}></NavBarItem>
                {this.props.accountType === AccountType.DONATING_AGENCY_MEMBER &&
                    <NavBarItem item={PageContent.REQUEST_PICKUP} icon={truck}></NavBarItem>
                }
                {this.props.accountType === AccountType.DELIVERER_GROUP &&
                    <NavBarItem item={PageContent.ASSIGN_VOLUNTEERS} icon={assign_volunteer}></NavBarItem>
                }
                <NavBarItem item={PageContent.FOOD_LOGS} icon={foodLog}></NavBarItem>
                <NavBarItem item={PageContent.DIRECTORY} icon={directory}></NavBarItem>
                <NavBarItem item={PageContent.SETTINGS} icon={settings}></NavBarItem>
            </div>
        )
    }
}

export default NavBar;