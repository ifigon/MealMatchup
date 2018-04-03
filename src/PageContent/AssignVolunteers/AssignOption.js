import React, { Component } from 'react';

class AssignOption extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: this.props.delivery.date,
            deliverers: this.props.delivery.delivererGroup.deliverers
        };
    }

    render() {
        return (

            // TODO: Need backend code to generate this information dynamically and then UI code to render that.

            <div className="avi-row">
                <div className="container avi-details-container">
                    <div className="avi-detail">
                        Tuesday {this.state.date} Pick-up 
                    </div>
                    <div className="avi-detail">
                        Union Gospel Mission
                    </div>
                    <div className="avi-detail avi-volunteers">
                        {this.state.deliverers.map((deliverer, index) => {
                            return <h5 key={index}>{deliverer.name}</h5>;
                        })}
                    </div>
                    <div className="avi-detail avi-volunteers">
                        {this.state.deliverers.length === 0 ? <button type="button" className="form-button" id="confirm-button" onClick={this.props.handleEditClick}>Assign Volunteers</button>
                            : <button type="button" className="form-button" id="confirm-button" onClick={this.props.handleEditClick}>Edit</button>
                        }
                    </div>
                </div>
            </div>
        );
    }

}

export default AssignOption;