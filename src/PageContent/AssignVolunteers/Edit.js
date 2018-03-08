import React, { Component } from 'react';

class Edit extends Component {

    render() {

        return (
            <div>
                <div className="date-container">
                    {this.props.day} {this.props.date} Pick-up between {this.props.from} - {this.props.to}
                </div>
                <div className="content-container">
                    <h5 className="location" id="top"><i className="fas fa-circle circle-marker" /><span className="spacing" />{this.props.donatingAgency}</h5>
                    <i className="fas fa-circle ellipses" />
                    <i className="fas fa-circle ellipses" />
                    <i className="fas fa-circle ellipses" />
                    <h5 className="location" id="bottom"><i class="fas fa-map-marker-alt marker" /><span className="spacing" />{this.props.receivingAgency}</h5>
                </div>
                <div className="form-container">
                    <form onSubmit={this.nextStep}>

                        <label className="label-component">Student Deliverers</label>

                        <div className="form-parent">

                            <div className="form-child">
                                <label className="label-component details">Student 1</label><br />
                                <input name="name" type="text" className="form-input" /><br />
                                <label className="label-component details">Phone</label><br />
                                <input name="phone" type="password" className="form-input" /><br />
                                <label className="label-component details">Email</label><br />
                                <input type="email" className="form-input" />
                            </div>
                            <div className="form-child">
                                <label className="label-component details">Student 2</label><br />
                                <input name="name" type="text" className="form-input" /><br />
                                <label className="label-component details">Phone</label><br />
                                <input name="phone" type="password" className="form-input" /><br />
                                <label className="label-component details">Email</label><br />
                                <input type="email" className="form-input" />
                            </div>

                            <div className="form-child second-row">
                                <h5 className="label-component" id="info">Email notifications will be sent to all deliverers.</h5>
                            </div>
                            <div className="form-child second-row form-buttons-container">
                                <button type="button" className="form-button" onClick={this.props.handleCancelClick}>Cancel</button>
                                <button type="button" className="form-button" id="confirm-button" onClick={this.props.handleConfirmClick}>Confirm</button>
                            </div>


                        </div>

                    </form>
                </div>
            </div>
        );

    }

}

export default Edit;