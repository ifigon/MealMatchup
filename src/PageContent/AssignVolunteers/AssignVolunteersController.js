import React, { Component } from 'react';
import './AssignVolunteers.css';
import Edit from './Edit';
import Confirmation from './Confirmation';
import AssignVolunteersIndex from './AssignVolunteersIndex';

class AssignVolunteers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            onConfirm: false,
            deliveries: []
        };
    }

    componentWillMount() {
        let deliveryList = [];
        deliveryList.push({
            date: "2018-02-28",
            startTime: "14:00",
            endTime: "17:00",
            delivererGroup: {
                group: "R8BAHrxdkfQoAmfWvGa1OJmjQP43",  // uid-key of deliverer-group
                deliverers: [
                    {
                        name: "Alice",
                        email: "alice@uw.edu",
                        phone: 1237894560
                    },
                    {
                        name: "Chris",
                        email: "chris@uw.edu",
                        phone: 4561230789
                    }
                ]
            },
            description: {
                foodItems: [
                    {
                        food: "Baked beans",
                        quantity: 15,
                        unit: "lb"  // Enums.FoodUnit
                    },
                    {
                        food: "Bread",
                        quantity: 4,
                        unit: "loaves"  // Enums.FoodUnit
                    },
                ]
            }
        });
        this.setState({
            deliveries: deliveryList
        });
    }

    render() {
        return (
            <div className="container">

                {this.showStep()}

                {this.state.onConfirm ?
                    <Confirmation 
                        handleCloseClick={this.handleCloseClick.bind(this)}
                        studentGroup={this.props.studentGroup}
                        s1name={this.state.s1name}
                        s1phone={this.state.s1phone}
                        s1email={this.state.s1email}
                        s2name={this.state.s2name}
                        s2phone={this.state.s2phone}
                        s2email={this.state.s2email}
                    /> 
                    : 
                    <div />
                }
                
            </div>
        );

    }

    handleConfirmClick(s1name, s1phone, s1email, s2name, s2phone, s2email) {
        this.setState({
            onConfirm: true,
            s1name: s1name,
            s1phone: s1phone,
            s1email: s1email,
            s2name: s2name,
            s2phone: s2phone,
            s2email: s2email
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
                    deliveries={this.state.deliveries}
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