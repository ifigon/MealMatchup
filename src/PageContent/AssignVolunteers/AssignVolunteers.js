import React, { Component } from 'react';
import './AssignVolunteers.css';
import Edit from './Edit';
// import firebase from '../../FirebaseConfig';

class AssignVolunteers extends Component {

    render() {

        return (

            <div className="container">

            <div className="opacity-container">
                
            </div>

                <Edit 
                    day={this.props.day}
                    date={this.props.date}
                    from={this.props.from}
                    to={this.props.to}
                    donatingAgency={this.props.donatingAgency}
                    receivingAgency={this.props.receivingAgency}
                />
            </div>
        );

    }

}

export default AssignVolunteers;