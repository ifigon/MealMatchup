import React, { Component } from 'react'

class UserTypeSignUp extends Component {
    constructor(props){
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
                        <img alt="" type="image/svg+xml" src="../../icons/volunteer.svg" />   Student Group
                    </div>
                    <div onClick={this.showShelter} className="user-type">
                        <img alt="" type="image/svg+xml" src="../icons/shelter.svg" />    Receiving Agency
                    </div>
                    <div onClick={this.showDonator} className="user-type">
                        <img alt="" type="image/svg+xml" src="../icons/vitamins.svg" />     Donating Agency
                    </div>
                </div>
            </div> 
        )
    }
    showStudent(e) {
        e.preventDefault()

        // this.props.saveValues(data)
        this.props.showStudent()
    }
    showShelter(e) {
        e.preventDefault()
        this.props.showShelter()
    }
    showDonator(e) {
        e.preventDefault()
        this.props.showDonator()
    }
}
export default UserTypeSignUp;