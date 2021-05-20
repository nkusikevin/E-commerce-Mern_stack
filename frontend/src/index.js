import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css'
import './index.css';
import './fontawesome-free-5.15.3-web/css/all.min.css'
import App from './App';
import store from "./store"
import {Provider} from "react-redux"
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider  store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
