import React from 'react';
import ReactDOM from "react-dom";
import { ScrapeForm } from './scraping/ScrapeForm.js';
import { App } from './App.js';
import { socket } from './services/socketIoService';
import { Provider, connect } from 'react-redux';
import { store } from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById('root')
);

