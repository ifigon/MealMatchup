import React, { Component } from 'react';
import './Confirmation.css';
import ConfirmationCard from './ConfirmationCard';

class Confirmation extends Component {

    render() {

        return (

            <div className="confirmation-container">
                <ConfirmationCard 
                    delivery={this.props.delivery}
                    handleCloseClick={this.props.handleCloseClick}
                    handleCancelClick={this.props.handleCancelClick}
                    deliverer1={this.props.deliverer1}
                    deliverer2={this.props.deliverer2}
                />
            </div>
        );

    }

}

export default Confirmation;