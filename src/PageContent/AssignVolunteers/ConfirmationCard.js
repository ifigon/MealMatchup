import React, { Component } from 'react';
import './ConfirmationCard.css';

class ConfirmationCard extends Component {

    render() {

        return (
            <div className="confirmation-card-container">
                <i class="fas fa-times close-card" onClick={this.props.handleCloseClick} />
            </div>
        );

    }

}

export default ConfirmationCard;