import React from 'react';
import ReactDOM from "react-dom";
import { ParamForm } from './scraping/ParamForm.js';
import { Login } from './login/Login.js';
import { socket } from './services/socketClient';



ReactDOM.render(
    <Login />,
    document.getElementById('root')
);

