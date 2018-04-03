import React, { Component } from 'react';
import moment from 'moment';

class AssignOption extends Component {

    constructor(props) {
        super(props);
        let date = new Date(this.props.delivery.date);
        this.state = {
            day: moment(date).format('dddd'),
            date: moment(date).format('l'),
            deliverers: this.props.delivery.delivererGroup.deliverers,
            receivingAgency: this.props.delivery.receivingAgency.agency
        };
    }

    render() {
        return (

            // TODO: Need backend code to generate this information dynamically and then UI code to render that.

            <div className="avi-row">
                <div className="container avi-details-container">
                    <div className="avi-detail">
                        {this.state.day} {this.state.date} Pick-up 
                    </div>
                    <div className="avi-detail">
                        {this.state.receivingAgency}
                    </div>
                    <div className="avi-detail avi-volunteers">
                        {
                            this.state.deliverers.map((deliverer, index) => {
                                return <h5 key={index}>{deliverer.name}</h5>;
                            })
                        }
                    </div>
                    <div className="avi-detail avi-volunteers">
                        {this.state.deliverers.length === 0 ? <button type="button" className="form-button confirm-button-assign" id={this.props.id} onClick={this.props.handleEditClick}>Assign Volunteers</button>
                            : <button type="button" className="form-button confirm-button" id={this.props.id} onClick={this.props.handleEditClick}>Edit</button>
                        }
                    </div>
                </div>
            </div>
        );
    }

}

export default AssignOption;