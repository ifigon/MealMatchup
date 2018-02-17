import React, { Component } from 'react';
//import './App.css';
import "typeface-roboto";
import NavBar from './PageLayout/Navigation/NavBar.js';
import PageHeader from './PageLayout/PageHeader.js';
import SignUpStudentController from './SignUpIn/SignUpStudentController';
import UserTypeController from './SignUpIn/UserTypeController';

// The main entry page to load when user is not signed in.
// Currently (win18), it is just the first page of sign in/up (select account type).
// Potentially, it would be “About” page in the future.
// For now, rendering sign up/in components

class App extends Component {
  render() {
    return (
      <div className="">
        {/* <header className="">
          <PageHeader value={"Phi Sigma Rho"}></PageHeader>
        </header> */}
        {/* <NavBar></NavBar> */}
        <div>
        <SignUpStudentController/>
        {/* <UserTypeController/> */}
        </div>
      </div>
    );
  }
}

export default App;
