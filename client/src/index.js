import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.jsx';


import registerServiceWorker from './registerServiceWorker';
import './index.css';

// hot module replacement
// if (module.hot) {
//   module.hot.accept();
// }
////////////////////////

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
