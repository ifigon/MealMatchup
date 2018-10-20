import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import MobileController from './MobileDelivery/MobileController';
import App from './App';
import DonatingAgencyMemberSignup from './SignUpIn/DonatingAgency/DonatingAgencyMemberSignup.js';
// import UserTypeController from './SignUpIn/UserTypeController';
// import SignIn from './SignUpIn/SignIn';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            {/* Mobile Delivery Route: uId: umbrellaId, dId: deliveryId */}
            <Route
                exact
                path="/mobile/delivery/:id"
                component={MobileController}
            />
            {/* TODO: DA Member Signup route with agency key */}
            <Route
                exact
                path="/signup/donatingagency/member"
                component={DonatingAgencyMemberSignup}
            />

            {/* TODO: Get login functionality back with these routes */}
            {/* <Route path="/signup" component={UserTypeController} />

            <Route path="/login" component={SignIn} /> */}

            <Route path="/calendar" component={App} />
            <Route path="/directory" component={App} />
            <Route path="/assign-volunteers" component={App} />
            <Route path="/food-logs" component={App} />
            <Route path="/settings" component={App} />
            <Route path="/request-pickup" component={App} />
        </Switch>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
