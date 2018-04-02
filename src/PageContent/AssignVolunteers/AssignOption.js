import React, { Component } from 'react';

class AssignOption extends Component {

    render() {
        return (

            // TODO: Need backend code to generate this information dynamically and then UI code to render that.

            <div className="avi-row">
                <div className="container avi-details-container">
                    <div className="avi-detail">
                        Tuesday 11/21 Pick-up 
                    </div>
                    <div className="avi-detail">
                        Union Gospel Mission
                    </div>
                    <div className="avi-detail avi-volunteers">
                        <h5>James Mathew</h5>
                        <h5>Erika Zhang</h5>
                    </div>
                    <div className="avi-detail avi-volunteers">
                        <button type="button" className="form-button" id="confirm-button" onClick={this.props.handleEditClick}>Edit</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default AssignOption;