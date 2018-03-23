import React, { Component } from 'react';
import './AssignVolunteers.css';
import Edit from './Edit';
import Confirmation from './Confirmation'
import AssignVolunteersIndex from './AssignVolunteersIndex';
// import firebase from '../../FirebaseConfig';

class AssignVolunteers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            onConfirm: false
        }
    }

    render() {

        return (

            <div className="container">

                {this.showStep()}

                {this.state.onConfirm ? 
                    <Confirmation 
                        handleCloseClick={this.handleCloseClick.bind(this)}
                        studentGroup={this.props.studentGroup}
                    /> 
                    : 
                    <div />
                }
                
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

    handleEditClick() {
        this.setState({
            step: 1
        });
    }

    handleCancelClick() {
        this.setState({
            step: 0
        });
    }

    showStep() {

        switch(this.state.step) {

            case 0:
                return (
                    <AssignVolunteersIndex 
                        handleEditClick={this.handleEditClick.bind(this)}
                    />
                );

            case 1:
                return (
                        <Edit 
                            day={this.props.day}
                            date={this.props.date}
                            from={this.props.from}
                            to={this.props.to}
                            donatingAgency={this.props.donatingAgency}
                            receivingAgency={this.props.receivingAgency}
                            handleConfirmClick={this.handleConfirmClick.bind(this)}
                            handleCancelClick={this.handleCancelClick.bind(this)}
                        />
                );
            default:
                return (
                    <div />
                );

        }

    }
}

export default AssignVolunteers;