import React, { Component } from 'react'

class UserTypeSignUp extends Component {
    constructor(props){
        super(props);
        this.nextStep = this.nextStep.bind(this);
        console.log("in usertype signup")
    }
    render() {
        return (
           <div className="user-type-wrapper">
                <div className="user-type-box">
                    <div className="user-type-label">SELECT ACCOUNT TYPE</div>
                    <div  className="user-type">
                        <img alt="" type="image/svg+xml" src="../../icons/volunteer.svg" />   Student Group
                    </div>
                    <div className="user-type">
                        <img alt="" type="image/svg+xml" src="../icons/shelter.svg" />    Receiving Agency
                    </div>
                    <div className="user-type">
                        <img alt="" type="image/svg+xml" src="../icons/vitamins.svg" />     Donating Agency
                    </div>
                </div>
            </div> 
        )
    }
    nextStep(e) {
        e.preventDefault()

        // this.props.saveValues(data)
        this.props.nextStep()
    }
}
export default UserTypeSignUp;