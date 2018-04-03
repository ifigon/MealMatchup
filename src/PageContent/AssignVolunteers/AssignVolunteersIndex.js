import React, { Component } from 'react';
import './AssignVolunteersIndex.css';
import AssignOption from './AssignOption';

class AssignVolunteersIndex extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deliveries: this.props.deliveries
        };
    }

    render() {

        return (
            this.renderElements()
        );

    }

    renderElements() {
        if(this.state.deliveries.length === 0) {
            return <h5>No deliveries scheduled</h5>;
        }
        else {
            return (
                <div className="avi-container">  
                    <div className="avi-row">
                        <div className="container avi-headings">
                            <div className="avi-detail">
                                Date
                            </div>
                            <div className="avi-detail">
                                Destination
                            </div>
                            <div className="avi-detail">
                                Volunteers
                            </div>
                        </div>
                    </div>
                    {
                        this.props.deliveries.map((delivery, index) => {
                            return <AssignOption handleEditClick={this.props.handleEditClick} key={index} delivery={delivery} id={index}/>;
                        })
                    }
                    
                </div>
            );
        }
    }

}

export default AssignVolunteersIndex;