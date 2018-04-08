import React, { Component } from 'react';
import moment from 'moment';
import { StringFormat } from '../../Enums';

class Edit extends Component {

    constructor(props) {
        super(props);
        let date = new Date(this.props.delivery.date);
        this.state = {
            day: moment(date).format('dddd'),
            date: moment(date).format('l'),
            from: this.props.delivery.startTime,
            to: this.props.delivery.endTime,
            donatingAgency: this.props.delivery.donatingAgency.agency,
            receivingAgency: this.props.delivery.receivingAgency.agency,
            deliverers: this.props.delivery.delivererGroup.deliverers
        };
    }

    render() {
        return (
            <div>
                <div className="date-container">
                    {this.state.day} {this.state.date} Pick-up between {this.state.from} - {this.state.to}
                </div>
                <div className="content-container">
                    <h5 className="location" id="top"><i className="fas fa-circle circle-marker" /><span className="spacing" />{this.state.donatingAgency}</h5>
                    <i className="fas fa-circle ellipses" />
                    <i className="fas fa-circle ellipses" />
                    <i className="fas fa-circle ellipses" />
                    <h5 className="location" id="bottom"><i className="fas fa-map-marker-alt map-marker" /><span className="spacing" />{this.state.receivingAgency}</h5>
                </div>
                <div className="form-container">
                    <form onSubmit={this.handleConfirmClick.bind(this)}>

                        <label className="label-component">Student Deliverers</label>

                        <div className="form-parent">

                            <div className="form-child">
                                <label className="label-component details">Student 1</label><br />
                                <input name="name1" type="text" className="form-input" defaultValue={this.state.deliverers[0] ? this.state.deliverers[0].name : ''} required/><br />
                                <label className="label-component details">Phone</label><br />
                                <input name="phone1" type="tel" pattern={StringFormat.PHONE} placeholder="xxx-xxx-xxxx" className="form-input" defaultValue={this.state.deliverers[0] ? this.state.deliverers[0].phone : ''} required/><br />
                                <label className="label-component details">Email</label><br />
                                <input name="email1" type="email" className="form-input" defaultValue={this.state.deliverers[0] ? this.state.deliverers[0].email : ''} required/>
                            </div>
                            <div className="form-child">
                                <label className="label-component details">Student 2</label><br />
                                <input name="name2" type="text" className="form-input" defaultValue={this.state.deliverers[1] ? this.state.deliverers[1].name : ''} required/><br />
                                <label className="label-component details">Phone</label><br />
                                <input name="phone2" type="tel" pattern={StringFormat.PHONE} placeholder="xxx-xxx-xxxx" className="form-input" defaultValue={this.state.deliverers[1] ? this.state.deliverers[1].phone : ''} required/><br />
                                <label className="label-component details">Email</label><br />
                                <input name="email2" type="email" className="form-input" defaultValue={this.state.deliverers[1] ? this.state.deliverers[1].email : ''} required/>
                            </div>

                            <div className="form-child second-row">
                                <h5 className="label-component" id="info">Email notifications will be sent to all deliverers.</h5>
                            </div>
                            <div className="form-child second-row form-buttons-container">
                                <button type="button" className="form-button" onClick={this.props.handleCancelClick}>Cancel</button>
                                <button type="submit" className="form-button confirm-button" onSubmit={this.handleConfirmClick.bind(this)}>Confirm</button>
                            </div>


                        </div>

                    </form>
                </div>
            </div>
        );

    }

    handleConfirmClick(e) {
        e.preventDefault();
        let d1 = {
            name: e.target.name1.value,
            phone: e.target.phone1.value,
            email: e.target.email1.value
        };
        let d2 = {
            name: e.target.name2.value,
            phone: e.target.phone2.value,
            email: e.target.email2.value
        };
        this.props.handleConfirmClick(d1, d2);
    }

}

export default Edit;