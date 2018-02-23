// NavBar.js
import React, {Component} from 'react';
import { auth } from '../../FirebaseConfig.js';
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
    constructor(props) {
        super(props);
        this.state = {
            content: props.content,
            highlighted: true
        };

        this.navBarHandler = this.navBarHandler.bind(this)
    }
    
    navBarHandler(value) {
        // value.preventDefault();
        this.setState({
            content: value
        })
        console.log('navbar: ' + this.state.content);
    }

    tempSignOut(event) {
        event.preventDefault();
        auth.signOut();
    }

    render() {
        return (
            <div className="navbar">
                <NavBarItem item={PageContent.CALENDAR} icon={calendar} handler={this.props.handler}></NavBarItem>
                {this.props.accountType === AccountType.DONATING_AGENCY_MEMBER &&
                    <NavBarItem item={PageContent.REQUEST_PICKUP} icon={truck} handler={this.props.handler}></NavBarItem>
                }
                {this.props.accountType === AccountType.DELIVERER_GROUP &&
                    <NavBarItem item={PageContent.ASSIGN_VOLUNTEERS} icon={assign_volunteer} handler={this.navBarHandler.bind(this)}></NavBarItem>
                }
                <NavBarItem item={PageContent.FOOD_LOGS} icon={foodLog} handler={this.props.handler}></NavBarItem>
                <NavBarItem item={PageContent.DIRECTORY} icon={directory} handler={this.props.handler}></NavBarItem>
                <NavBarItem item={PageContent.SETTINGS} icon={settings} handler={this.props.handler}></NavBarItem>
                <form 
                    onSubmit={this.tempSignOut.bind(this)}
                    style={{marginLeft: 0 + 'px'}}>
                    <input type="submit" value="Test SignOut" />
                </form>
            </div>
        )
    }
}

export default NavBar;