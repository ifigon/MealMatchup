import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './BackendScripts.js'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
