import React, { Component } from 'react';
import volunteer from "../icons/volunteer.svg";
import shelter from "../icons/shelter.svg";
import vitamins from "../icons/vitamins.svg";

class UserTypeSignUp extends Component {
    constructor(props) {
        super(props);
        this.showStudent = this.showStudent.bind(this);
        this.showDonator = this.showDonator.bind(this);
        this.showShelter = this.showShelter.bind(this);
    }
    render() {
        return (
            <div className="user-type-wrapper">
                <div className="user-type-box">
                    <div className="user-type-label">SELECT ACCOUNT TYPE</div>
                    <div onClick={this.showStudent} className="user-type">
                        <img alt="icon" type="image/svg+xml" src={volunteer} className="user-icon"/>   Student Group
                    </div>
                    <div onClick={this.showShelter} className="user-type">
                        <img alt="icon" type="image/svg+xml" src={shelter} className="user-icon"/>    Receiving Agency
                    </div>
                    <div onClick={this.showDonator} className="user-type">
                        <img alt="icon" type="image/svg+xml" src={vitamins} className="user-icon"/>     Donating Agency
                    </div>
                </div>
            </div>
        )
    }
    showStudent(e) {
        e.preventDefault();

        // this.props.saveValues(data)
        this.props.showStudent();
    }
    showShelter(e) {
        e.preventDefault();
        this.props.showShelter();
    }
    showDonator(e) {
        e.preventDefault();
        this.props.showDonator();
    }
}
export default UserTypeSignUp;