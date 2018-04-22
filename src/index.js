import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import MobileController from './MobileDelivery/MobileController';
import App from './App';
import DonatingAgencyMemberSignup from './SignUpIn/DonatingAgency/DonatingAgencyMemberSignup.js';
import { PageContent } from './Enums';
// import UserTypeController from './SignUpIn/UserTypeController';
// import SignIn from './SignUpIn/SignIn';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            {/* TODO: Mobile route 
                - unique path to a pickup and pass info into MobileDelivery
            */}
            <Route exact path="/mobile" component={MobileController} />
            {/* TODO: DA Member Signup route with agency key */}
            <Route
                exact
                path="/signup/donatingagency/member"
                component={DonatingAgencyMemberSignup}
            />

            {/* TODO: Get login functionality back with these routes */}
            {/* <Route path="/signup" component={UserTypeController} />

            <Route path="/login" component={SignIn} /> */}

            <Route
                path="/calendar"
                render={props => (
                    <App content={PageContent.CALENDAR} {...props} />
                )}
            />
            <Route
                path="/directory"
                render={props => (
                    <App content={PageContent.DIRECTORY} {...props} />
                )}
            />
            <Route
                path="/assign-volunteers"
                render={props => (
                    <App content={PageContent.ASSIGN_VOLUNTEERS} {...props} />
                )}
            />
            <Route
                path="/food-logs"
                render={props => (
                    <App content={PageContent.FOOD_LOGS} {...props} />
                )}
            />
            <Route
                path="/settings"
                render={props => (
                    <App content={PageContent.SETTINGS} {...props} />
                )}
            />
            <Route
                path="/request-pickup"
                render={props => (
                    <App content={PageContent.REQUEST_PICKUP} {...props} />
                )}
            />
        </Switch>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
