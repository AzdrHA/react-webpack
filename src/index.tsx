import React from 'react';
import ReactDOM from 'react-dom';
import Home from './screens/Home/Home';
import reportWebVitals from '@app/reportWebVitals';
import '@scss/index.scss';

ReactDOM.render(
    <React.StrictMode>
      <Home/>
    </React.StrictMode>,
    document.getElementById('root'),
);

reportWebVitals();
