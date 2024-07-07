import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from 'react-redux';
import { rootStore, persistor } from './redux/config';
import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <Provider store={rootStore}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>    
      </Provider>
    </Router>
);

