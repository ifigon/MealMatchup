import React, { Component } from 'react';
import './Confirmation.css';
import ConfirmationCard from './ConfirmationCard';

class Confirmation extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {

        return (

            <div className="confirmation-container">
                <ConfirmationCard 
                    delivery={this.props.delivery}
                    handleCloseClick={this.props.handleCloseClick}
                    s1name={this.props.s1name}
                    s1phone={this.props.s1phone}
                    s1email={this.props.s1email}
                    s2name={this.props.s2name}
                    s2phone={this.props.s2phone}
                    s2email={this.props.s2email}
                />
            </div>
        );

    }

}

export default Confirmation;