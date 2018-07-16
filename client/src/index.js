import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


// hot module replacement
if (module.hot) {
  module.hot.accept();
} 
////////////////////////

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
