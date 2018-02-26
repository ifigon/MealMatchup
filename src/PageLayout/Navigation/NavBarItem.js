// NavBarButton.js
import React, {Component} from 'react';
import './NavBarItem.css';

class NavBarItem extends Component {
    constructor(props){
    super(props);

    this.state = {
        content: props.content,
        highlighted: false
      }
    }

    changeColor(){
        this.setState({
            highlighted: !this.state.highlighted
        })
        console.log(this.state.highlighted);
    }

    render(){
        let lineColor = this.props.highlighted ? '#5DC0F9' : ''
        let itemColor = this.props.highlighted ? '#F2F2F2' : ''
        return(
            <div className="navbar-item" style={{background: itemColor}} onClick={() => this.props.handler(this.props.item)}>
                <div style={{background: lineColor}} className="left-line"></div>
                <img src={this.props.icon} className="navbar-icon" alt="icon"/>
                <p className="navbar-name">{this.props.item}</p>
            </div>
        )
    }
}

export default NavBarItem;