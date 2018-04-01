import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import MobileController from './MobileDelivery/MobileController';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App} />
<<<<<<< HEAD
            {/* TODO: Mobile route 
                - unique path to a pickup and pass info into MobileDelivery
            */}
            <Route exact path="/mobile" component={MobileController} />
=======
            {/* TODO: Mobile route */}
>>>>>>> 8c27430ea9f39f545dbf9e897a5f32a9ab63f956
        </div>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
