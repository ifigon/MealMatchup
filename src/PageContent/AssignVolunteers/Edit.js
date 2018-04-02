import React, { Component } from 'react';

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            s1name: "",
            s1phone: "",
            s1email: "",
            s2name: "",
            s2phone: "",
            s2email: ""
        }
    }

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
                    <h5 className="location" id="bottom"><i className="fas fa-map-marker-alt marker" /><span className="spacing" />{this.props.receivingAgency}</h5>
                </div>
                <div className="form-container">
                    <form onSubmit={this.nextStep}>

                        <label className="label-component">Student Deliverers</label>

                        <div className="form-parent">

                            <div className="form-child">
                                <label className="label-component details">Student 1</label><br />
                                <input name="name" type="text" className="form-input" onChange={this.handleNameOne.bind(this)} /><br />
                                <label className="label-component details">Phone</label><br />
                                <input name="phone" type="tel" className="form-input" onChange={this.handlePhoneOne.bind(this)} /><br />
                                <label className="label-component details">Email</label><br />
                                <input type="email" className="form-input" onChange={this.handleEmailOne.bind(this)} />
                            </div>
                            <div className="form-child">
                                <label className="label-component details">Student 2</label><br />
                                <input name="name" type="text" className="form-input" onChange={this.handleNameTwo.bind(this)} /><br />
                                <label className="label-component details">Phone</label><br />
                                <input name="phone" type="tel" className="form-input" onChange={this.handlePhoneTwo.bind(this)} /><br />
                                <label className="label-component details">Email</label><br />
                                <input type="email" className="form-input" onChange={this.handleEmailTwo.bind(this)} />
                            </div>

                            <div className="form-child second-row">
                                <h5 className="label-component" id="info">Email notifications will be sent to all deliverers.</h5>
                            </div>
                            <div className="form-child second-row form-buttons-container">
                                <button type="button" className="form-button" onClick={this.props.handleCancelClick}>Cancel</button>
                                <button type="submit" className="form-button" id="confirm-button" onClick={this.handleConfirmClick.bind(this)}>Confirm</button>
                            </div>


                        </div>

                    </form>
                </div>
            </div>
        );

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

    handleConfirmClick() {
        this.props.handleConfirmClick(this.state.s1name, this.state.s1phone, this.state.s1email, this.state.s2name, this.state.s2phone, this.state.s2email);
    }

}

export default Edit;