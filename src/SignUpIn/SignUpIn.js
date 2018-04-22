// No log in functionality yet
import './SignUpIn.css';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import SignIn from './SignIn';
import UserTypeController from './UserTypeController';

class SignUpIn extends Component {
    render() {
        return (
            <div className="login-buttons">
                <div className="button-wrapper">
                    <Link to={'/login'}>
                        <button className="button">LOGIN</button>{' '}
                    </Link>
                </div>
                <Link to={'/signup'}>
                    <div className="button-wrapper">
                        <button className="button">CREATE ACCOUNT</button>
                    </div>
                </Link>
            </div>
        );
    }
}
export default SignUpIn;
