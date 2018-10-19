import React, { Component } from 'react';
import './AssignVolunteersIndex.css';
import AssignOption from './AssignOption';

class AssignVolunteersIndex extends Component {

    render() {
        const {
            deliveries,
            handleEditClick,
            deliveriesExist
        } = this.props;

    if (!deliveriesExist) {
      return <h5>No deliveries scheduled</h5>;
    } else {
      return (
        <div className="avi-container">
          <div className="">
            <div className="avi-headings">
              <div className="avi-heading">
                Date
              </div>
              <div className="avi-heading">
                Destination
              </div>
              <div className="avi-heading">
                Volunteers
              </div>
              <div className="avi-heading">
                Assign
              </div>
              <div className="avi-heading">
                Send link to volunteers
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
                  deliveryId={deliveryId} />)

          }
        </div>
      );
    }
  }
}

export default AssignVolunteersIndex;