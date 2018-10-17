import React from 'react';
import ReactDOM from "react-dom";
import { ScrapeForm } from './scraping/ScrapeForm.js';
import { App } from './App.js';
import { socket } from './services/socketIoService';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

