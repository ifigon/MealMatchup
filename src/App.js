import React, { Component } from 'react';
//import './App.css';
import "typeface-roboto";
import NavBar from './PageLayout/Navigation/NavBar.js';
import PageHeader from './PageLayout/PageHeader.js';
import logo from './icons/temp-logo.svg'
import FoodLogsContainer from './PageContent/FoodLogs/FoodLogsContainer';

// The main entry page to load when user is not signed in.
// Currently (win18), it is just the first page of sign in/up (select account type).
// Potentially, it would be “About” page in the future.
// For now, rendering sign up/in components

class App extends Component {
  render() {
    return (
      <div className="">
        <header className="">
          <PageHeader title={"Seattle Gospel Union Mission"} logo={logo}></PageHeader>
        </header>
        <NavBar></NavBar>
        <FoodLogsContainer></FoodLogsContainer>
      </div>
    );
  }
}

export default App;
