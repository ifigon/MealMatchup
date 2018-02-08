// NavBar.js
import React, {Component} from 'react';
import NavBarItem from './NavBarItem';
import './NavBar.css'
import logo from 'public-encrypt';

class NavBar extends Component {
    render() {
        return (
            <div className="navbar">
                <NavBarItem value={'Assign Volunteers'}></NavBarItem>
                <NavBarItem value={'Schedule'}></NavBarItem>
                <NavBarItem value={'Food Logistics'}></NavBarItem>
                <NavBarItem value={'Directory'}></NavBarItem>
                <NavBarItem value={'Settings'}></NavBarItem>
            </div>
        )
    }
}

export default NavBar;