import React from 'react';
import { socketIoService } from './services/socketIoService';
import { ScrapeForm } from './scraping/ScrapeForm.js';
import { Login } from './login/Login.js';
import { Header } from './header/Header.js';
import { store } from './redux/store.js';


export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.state || {};
    }

    componentWillMount() {
        fetch('/users/session/validateMe', {
          method: 'GET'
        })
        .then(res => res.json())
        .then((result) => {
            socketIoService.init('new-session');
            store.dispatch({
                type: 'SET_SESSION_USER',
                payload: result.user || null
              });
          },
          (error) => {
              console.log(error);
          }
        );

        store.subscribe(() => {
            let state = store.getState();
            this.setState({sessionUser: state.sessionUser, isLoggedIn: !!state.sessionUser});
        });
    }

    render() {
        let content;
        if (this.state.isLoggedIn) {
          content = (
            <div>
            <Header></Header>
            <ScrapeForm></ScrapeForm>
            </div>
          );
        } else if (this.state.isLoggedIn === false) {
          content = <Login></Login>;
        } else {
          content = <h1>Loading...</h1>;
        }
        return content;
    }
}
