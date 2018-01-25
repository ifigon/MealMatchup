// NavBar.js
import React, {Component} from 'react';
import NavBarItem from './NavBarItem';
import './NavBar.css'
import logo from '../logo.svg';

class NavBar extends Component {
    render() {
        return (
            <div className="navbar">
                <div className="org-name">
                    <img src={logo} className="org-icon"/>
                    <p className="">{this.props.value}</p>
                </div>
                <NavBarItem value={'Schedule'}></NavBarItem>
                <NavBarItem value={'Food Logistics'}></NavBarItem>
                <NavBarItem value={'Directory'}></NavBarItem>
                <NavBarItem value={'Settings'}></NavBarItem>
            </div>
        )
    }
}

export default NavBar;