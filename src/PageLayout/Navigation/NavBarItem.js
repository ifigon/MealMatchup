// NavBarButton.js
import React, {Component} from 'react';
import styles from './NavBarItem.module.css';

class NavBarItem extends Component {
    render(){
        let lineColor = this.props.highlighted ? '#5DC0F9' : '';
        let itemColor = this.props.highlighted ? '#F2F2F2' : '';
        return(
            <div>
                {this.props.item === 'signout' ?
                    <div className={styles['navbar-item'] + ' ' + styles['signout']} onClick={this.props.handler}>
                        <img src={this.props.icon} className={styles['navbar-icon']} alt="icon"/>
                        <span className={styles['navbar-name']}>Sign Out</span>
                    </div>
                    :
                    <div className={styles['navbar-item']} style={{background: itemColor}} onClick={() => this.props.handler(this.props.item)}>
                        <div style={{background: lineColor}} className={styles['left-line']}></div>
                        <img src={this.props.icon} className={styles['navbar-icon']} alt="icon"/>
                        <span className={styles['navbar-name']}>{this.props.item}</span>
                    </div>
                }
            </div>
        );
    }
}

export default NavBarItem;