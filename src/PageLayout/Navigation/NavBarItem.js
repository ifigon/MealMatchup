// NavBarButton.js
import React, {Component} from 'react';
import './NavBarItem.css';

class NavBarItem extends Component {
    constructor(){
    super();

    this.state = {
        highlighted: false
      }
    }

    changeColor(){
        this.setState({highlighted: !this.state.highlighted})
    }

    render(){
        let lineColor = this.state.highlighted ? '#5DC0F9' : ''
        let itemColor = this.state.highlighted ? '#F2F2F2' : ''
        return(
            <div className="navbar-item" style={{background: itemColor}} onClick={this.changeColor.bind(this)}>
            {/* <div className="navbar-item" style={{background: itemColor}}> */}
                <div style={{background: lineColor}} className="left-line"></div>
                <img src={this.props.icon} className="navbar-icon" alt="icon"/>
                <p className="navbar-name">{this.props.item}</p>
            </div>
        )
    }
}
export default NavBarItem;