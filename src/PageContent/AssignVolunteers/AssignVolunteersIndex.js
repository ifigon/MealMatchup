import React, { Component } from 'react';
import './AssignVolunteersIndex.css';
import AssignOption from './AssignOption';

class AssignVolunteersIndex extends Component {

    render() {
        const {
            deliveries,
            deliveriesExist,
            handleEditClick,
        } = this.props;

        //if(Object.keys(deliveries).length === 0) {
        if(!deliveriesExist) { 
            return <h5>No deliveries scheduled at this time... keep an eye out for more openings!</h5>;
        } else {
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
                        Object.keys(deliveries)
                            .sort((dId1, dId2) => deliveries[dId1].startTimestamp - deliveries[dId2].startTimestamp)
                            .map(deliveryId => 
                                <AssignOption 
                                    handleEditClick={handleEditClick} 
                                    key={deliveryId} 
                                    delivery={deliveries[deliveryId]} 
                                    deliveryId={deliveryId}/>)
                            
                    } 
                </div>
            );
        }
    }
}

export default AssignVolunteersIndex;