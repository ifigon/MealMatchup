// NavBarButton.js
import './SignUpIn.css';
import StudentSignUp1 from './StudentSignUp1';
import SignUpStudentController from './SignUpStudentController';
import UserTypeSetUp from './UserTypeSetUp';
let React = require('react');
let createReactClass = require('create-react-class');


// let UserTypeController = createReactClass({

//     getInitialState: function () {
//         return {
//             step: 0
//         }
//     },
//     showStep: function () {
//         switch (this.state.step) {
//             case 0:
//                 return 
//                 <div className="user-type-wrapper">
//                     <div className="user-type-box">
//                         <div className="user-type-label">SELECT ACCOUNT TYPE</div>
//                         <div  className="user-type">
//                             <img type="image/svg+xml" src="../../icons/volunteer.png" />   Student Group
//                         </div>
//                         <div className="user-type">
//                             <img type="image/svg+xml" src="../icons/shelter.svg" />    Receiving Agency
//                         </div>
//                         <div className="user-type">
//                             <img type="image/svg+xml" src="../icons/vitamins.svg" />     Donating Agency
//                         </div>
//                     </div>
//                 </div>
//             case 1:
//                 return <StudentSignUp />
//         }
//     },


//     render() {
//         console.log(this.showStep());
//         console.log("this.state", this.state);
//         return (
//             <div className="signup-wrapper">
//                 {this.showStep()}
//             </div>
//         )
//     }

// })

// export default UserTypeController;
let fieldValues = {
    organizationName: null,
    numVolunteers: null,
    contactName: null,
    contactEmail: null,
    contactNumber: null,
    email: null,
    password: null,
    memberName: null,
    memberNumber: null,
    memberEmail: null,
    position: null
}
let UserTypeController = createReactClass({
    getInitialState: function () {
        return {
            step: 0
        }
    },
    saveValues: function (fields) {
        return function () {
            // Remember, `fieldValues` is set at the top of this file, we are simply appending
            // to and overriding keys in `fieldValues` with the `fields` with Object.assign
            // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
            fieldValues = Object.assign({}, fieldValues, fields)
        }()
    },

    nextStep: function () {
        this.setState({
            step: this.state.step + 1
        })
    },

    previousStep: function () {
        this.setState({
            step: this.state.step - 1
        })
    },

    submitRegistration: function () {
        // Handle via ajax submitting the user data, upon
        // success return this.nextStop(). If it fails,
        // show the user the error but don't advance

        this.nextStep()
    },

    showStep: function () {
        switch (this.state.step) {
            case 0:
            return
                <UserTypeSetUp nextStep={this.nextStep} />
            // <div className="user-type-wrapper">
            //     <div className="user-type-box">
            //         <div className="user-type-label">SELECT ACCOUNT TYPE</div>
            //         <div  className="user-type">
            //             <img type="image/svg+xml" src="../../icons/volunteer.png" />   Student Group
            //         </div>
            //         <div className="user-type">
            //             <img type="image/svg+xml" src="../icons/shelter.svg" />    Receiving Agency
            //         </div>
            //         <div className="user-type">
            //             <img type="image/svg+xml" src="../icons/vitamins.svg" />     Donating Agency
            //         </div>
            //     </div>
            // </div> 
            case 1:
                return
                <div className="signup">
                    <StudentSignUp1
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        fieldValues={this.fieldValues}
                        saveValues={this.saveValues}
                    />
                </div>
            // case 2:
            //     return                 <div  className="signup">
            //     <StudentSignUp2 fieldValues={fieldValues}
            //         nextStep={this.nextStep}
            //         previousStep={this.previousStep}
            //         saveValues={this.saveValues} /></div>
            // case 3:
            //     return                 <div  className="signup">
            //     <StudentSignUp3 fieldValues={fieldValues}
            //         previousStep={this.previousStep}
            //         submitRegistration={this.submitRegistration} /></div>
            // case 4:
            //     return <Success fieldValues={fieldValues} />
        }
    },

    render() {
        //let highlightLineColor = this.state.lineHighlighted ? "white" : "black"
        return (
            <div className="signup-wrapper">
                {/* <div  className="signup"> */}
                {/* <span className="progress-step">Ste {this.state.step}</span> */}
                {this.showStep()}
                {/* </div> */}
            </div>
        )
    }
})
export default UserTypeController;