// NavBarButton.js
import React, {Component} from 'react';
import './NavBarItem.css';

class NavBarItem extends Component {
    render(){
        let lineColor = this.props.highlighted ? '#5DC0F9' : '';
        let itemColor = this.props.highlighted ? '#F2F2F2' : '';
        return(
            <div>
                {this.props.item === 'signout' ?
                    <div className="navbar-item signout" onClick={this.props.handler}>
                        <img src={this.props.icon} className="navbar-icon" alt="icon"/>
                        <p className="navbar-name">Sign Out</p>
                    </div>
                    :
                    <div className="navbar-item" style={{background: itemColor}} onClick={() => this.props.handler(this.props.item)}>
                        <div style={{background: lineColor}} className="left-line"></div>
                        <img src={this.props.icon} className="navbar-icon" alt="icon"/>
                        <p className="navbar-name">{this.props.item}</p>
                    </div>
                }
            </div>
        );
    }
}

export default NavBarItem;