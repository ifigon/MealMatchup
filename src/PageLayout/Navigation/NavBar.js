// NavBar.js
import React, { Component } from 'react';
import { auth } from '../../FirebaseConfig.js';
import { AccountType, PageContent } from '../../Enums.js';
import NavBarItem from './NavBarItem';
import './NavBar.css';
import calendar from '../../icons/calendar.svg';
import directory from '../../icons/directory.svg';
import foodLog from '../../icons/food_log.svg';
import settings from '../../icons/settings.svg';
import truck from '../../icons/truck.svg';
import assign_volunteer from '../../icons/assign_volunteer.svg';
import signout from '../../icons/logout.svg';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    signOut(event) {
        event.preventDefault();
        auth.signOut();
    }

    render() {
        return (
            <div className="navbar">
                <Link to={'/calendar'}>
                    <NavBarItem
                        highlighted={
                            this.props.content === PageContent.CALENDAR
                        }
                        item={PageContent.CALENDAR}
                        icon={calendar}
                        handler={this.props.handler}
                    />
                </Link>
                {this.props.accountType ===
                    AccountType.DONATING_AGENCY_MEMBER && (
                        <Link to={'/request-pickup'}>
                            <NavBarItem
                                highlighted={
                                    this.props.content ===
                                PageContent.REQUEST_PICKUP
                                }
                                item={PageContent.REQUEST_PICKUP}
                                icon={truck}
                                handler={this.props.handler}
                            />
                        </Link>
                    )}
                {this.props.accountType === AccountType.DELIVERER_GROUP && (
                    <Link to={'/assign-volunteers'}>
                        {' '}
                        <NavBarItem
                            highlighted={
                                this.props.content ===
                                PageContent.ASSIGN_VOLUNTEERS
                            }
                            item={PageContent.ASSIGN_VOLUNTEERS}
                            icon={assign_volunteer}
                            handler={this.props.handler}
                        />
                    </Link>
                )}
                <Link to={'/food-logs'}>
                    <NavBarItem
                        highlighted={
                            this.props.content === PageContent.FOOD_LOGS
                        }
                        item={PageContent.FOOD_LOGS}
                        icon={foodLog}
                        handler={this.props.handler}
                    />
                </Link>
                <Link to={'/directory'}>
                    <NavBarItem
                        highlighted={
                            this.props.content === PageContent.DIRECTORY
                        }
                        item={PageContent.DIRECTORY}
                        icon={directory}
                        handler={this.props.handler}
                    />
                </Link>
                <Link to={'/settings'}>
                    <NavBarItem
                        highlighted={
                            this.props.content === PageContent.SETTINGS
                        }
                        item={PageContent.SETTINGS}
                        icon={settings}
                        handler={this.props.handler}
                    />
                </Link>
                <Link to={''}>
                    <NavBarItem
                        item={'signout'}
                        icon={signout}
                        handler={this.signOut.bind(this)}
                    />
                </Link>
            </div>
        );
    }
}

export default NavBar;
