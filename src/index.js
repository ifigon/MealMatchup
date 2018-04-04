import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import DonatingAgencyMemberSignup from './SignUpIn/DonatingAgency/DonatingAgencyMemberSignup.js';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App} />
            {/* TODO: DA Member Signup route with agency key */}
            <Route exact 
                path="/signup/donatingagency/member" 
                component={DonatingAgencyMemberSignup} />
            {/* TODO: Mobile route */}
        </div>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
