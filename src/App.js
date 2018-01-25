import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';
import "typeface-roboto";
import NavBar from './Navigation/NavBar';

class App extends Component {
  render() {
    return (
      <div className="">
        <header className="">
        </header>
        <NavBar value={"Phi Sigma Rho"}></NavBar>
      </div>
    );
  }
}

export default App;
