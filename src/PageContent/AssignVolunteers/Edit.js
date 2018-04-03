import React, { Component } from 'react';
import moment from 'moment';

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
            s1name: '',
            s1phone: '',
            s1email: '',
            s2name: '',
            s2phone: '',
            s2email: '',
        };
    }

    componentDidMount() {
        this.checkStudents(this.props);
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
                    <h5 className="location" id="bottom"><i className="fas fa-circle circle-marker" /><span className="spacing" />{this.state.receivingAgency}</h5>
                </div>
                <div className="form-container">
                    <form onSubmit={this.handleConfirmClick.bind(this)}>

                        <label className="label-component">Student Deliverers</label>

                        <div className="form-parent">

                            <div className="form-child">
                                <label className="label-component details">Student 1</label><br />
                                <input name="name" type="text" className="form-input" onChange={this.handleNameOne.bind(this)} placeholder={this.state.s1name} required/><br />
                                <label className="label-component details">Phone</label><br />
                                <input name="phone" type="tel" className="form-input" onChange={this.handlePhoneOne.bind(this)} placeholder={this.state.s1phone} required/><br />
                                <label className="label-component details">Email</label><br />
                                <input type="email" className="form-input" onChange={this.handleEmailOne.bind(this)} placeholder={this.state.s1email} required/>
                            </div>
                            <div className="form-child">
                                <label className="label-component details">Student 2</label><br />
                                <input name="name" type="text" className="form-input" onChange={this.handleNameTwo.bind(this)} placeholder={this.state.s2name} required/><br />
                                <label className="label-component details">Phone</label><br />
                                <input name="phone" type="tel" className="form-input" onChange={this.handlePhoneTwo.bind(this)} placeholder={this.state.s2phone} required/><br />
                                <label className="label-component details">Email</label><br />
                                <input type="email" className="form-input" onChange={this.handleEmailTwo.bind(this)} placeholder={this.state.s2email} required/>
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

    checkStudents(props) {
        if(props.delivery.delivererGroup.deliverers[0]) {
            this.setState({
                s1name: props.delivery.delivererGroup.deliverers[0].name,
                s1email: props.delivery.delivererGroup.deliverers[0].email,
                s1phone: props.delivery.delivererGroup.deliverers[0].phone,
            });
            if(props.delivery.delivererGroup.deliverers[1]) {
                this.setState({
                    s2name: props.delivery.delivererGroup.deliverers[1].name,
                    s2email: props.delivery.delivererGroup.deliverers[1].email,
                    s2phone: props.delivery.delivererGroup.deliverers[1].phone,
                });
            }
        }
    }

    handleNameOne(e) {
        this.setState({s1name: e.target.value});
    }

    handlePhoneOne(e) {
        this.setState({s1phone: e.target.value});
    }

    handleEmailOne(e) {
        this.setState({s1email: e.target.value});
    }

    handleNameTwo(e) {
        this.setState({s2name: e.target.value});
    }

    handlePhoneTwo(e) {
        this.setState({s2phone: e.target.value});
    }

    handleEmailTwo(e) {
        this.setState({s2email: e.target.value});
    }

    handleConfirmClick(e) {
        e.preventDefault();
        this.props.handleConfirmClick(this.state.s1name, this.state.s1phone, this.state.s1email, this.state.s2name, this.state.s2phone, this.state.s2email);
    }

}

export default Edit;