import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import MobileDelivery from './MobileDelivery/MobileDelivery';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App} />
            {/* TODO: Mobile route 
                - unique path to a pickup and pass info into MobileDelivery
            */}
            <Route exact path="/mobile" component={MobileDelivery} />
        </div>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
