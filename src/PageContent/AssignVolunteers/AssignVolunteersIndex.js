import React, { Component } from 'react';
import './AssignVolunteersIndex.css';
import AssignOption from './AssignOption';

class AssignVolunteersIndex extends Component {

    render() {
        return (
            this.renderElements()
        );
    }

    renderElements() {
        // TODO (jkbach): some kind of loading here would be good.
        if(Object.keys(this.props.deliveries).length === 0) {
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
                        Object.keys(this.props.deliveries).map((delivery_id, index) => {
                            return <AssignOption 
                                handleEditClick={this.props.handleEditClick} 
                                key={delivery_id} 
                                delivery={this.props.deliveries[delivery_id]} 
                                deliveryId={delivery_id}/>;
                        })
                    }
                    
                </div>
            );
        }
    }

}

export default AssignVolunteersIndex;