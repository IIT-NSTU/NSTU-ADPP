import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

const app = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>

)
root.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
