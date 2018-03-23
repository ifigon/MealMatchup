import React, { Component } from 'react';
import './AssignVolunteersIndex.css';
import AssignOption from './AssignOption';

class AssignVolunteersIndex extends Component {

    render() {

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
                <AssignOption 
                    handleEditClick={this.props.handleEditClick}
                />
                <AssignOption 
                    handleEditClick={this.props.handleEditClick}
                />
                <AssignOption 
                    handleEditClick={this.props.handleEditClick}
                />
            </div>
        );

    }

}

export default AssignVolunteersIndex;