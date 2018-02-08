// NavBarButton.js
import React, {Component} from 'react';
import logo from 'public-encrypt';
import './NavBarItem.css';

class NavBarItem extends Component {
    constructor(){
    super();

    this.state = {
        lineHighlighted: false
      }
    }

    changeColor(){
        this.setState({lineHighlighted: !this.state.lineHighlighted})
    }

    render(){
        //let highlightLineColor = this.state.lineHighlighted ? "white" : "black"
        return(
            <div className="navbar-item" onClick={this.changeColor.bind(this)}>
                {/* <div className="left-line"></div> */}
                <img src={logo} className="navbar-icon" alt="icon"/>
                <p className="navbar-name">{this.props.value}</p>
            </div>
        )
    }
}
export default NavBarItem;