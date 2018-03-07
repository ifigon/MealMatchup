import React, { Component } from 'react';
import './AssignVolunteers.css';
import Edit from './Edit';
import Confirmation from './Confirmation'
// import firebase from '../../FirebaseConfig';

class AssignVolunteers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            onConfirm: false
        }
    }

    render() {

        return (

            <div className="container">

                {this.state.onConfirm ? 
                    <Confirmation 
                        handleCloseClick={this.handleCloseClick.bind(this)}
                    /> 
                    : 
                    <div />
                }
                

                <Edit 
                    day={this.props.day}
                    date={this.props.date}
                    from={this.props.from}
                    to={this.props.to}
                    donatingAgency={this.props.donatingAgency}
                    receivingAgency={this.props.receivingAgency}
                    handleConfirmClick={this.handleConfirmClick.bind(this)}
                />
            </div>
        );

    }

    handleConfirmClick() {
        this.setState({
            onConfirm: true
        });
    }

    handleCloseClick() {
        this.setState({
            onConfirm: false
        });
    }
}

export default AssignVolunteers;