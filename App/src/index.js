import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/Routes';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';

const store = configureStore();


ReactDOM.render(
  <Provider store={store}>  
    <Routes/>
  </Provider>,
  document.getElementById('root')
);