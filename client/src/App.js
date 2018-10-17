import React from 'react';
import { SocketIoService } from './services/socketIoService';
import { ScrapeForm } from './scraping/ScrapeForm.js';
import { Login } from './login/Login.js';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        fetch('/users/session/validateMe', {
          method: 'GET'
        })
        .then(res => res.json())
        .then((result) => {
            SocketIoService.init('new-session');
            this.setState({isLoggedIn: true});
          },
          (error) => {
              console.log(error);
          }
        )
    }
  
    render() {
        if (this.state.isLoggedIn) {
          return <ScrapeForm></ScrapeForm>;
        } else if (this.state.isLoggedIn === false) {
          return <Login></Login>;
        } else {
          return <h1>Loading...</h1>;
        }
    }
}
