import React from 'react';
import { UtilService } from '../services/utilService.js';
import { SocketIoService } from '../services/socketIoService';
import { store } from '../redux/store.js';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: 'rashid@sentinellabs.io', password: 'newyork952'};
    }
  
    handleChange(event, prop) {
        this.setState({[prop]: event.target.value});
    }
  
    handleSubmit(event) {
        event.preventDefault();

        const data = {
          email: this.state.email,
          password: UtilService.encryptText(this.state.password)
        };
        fetch("/users/login", {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then((result) => {
            this.setState({isLoggedIn: result.loggedIn});
            store.dispatch({
              type: 'SET_SESSION_USER',
              payload: result.user || null
            });
            SocketIoService.init('new-session');
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
        return (
          <form onSubmit={(ev) => this.handleSubmit(ev)}>
            <div class='row'>
              <label>
                Email:
                <input type="text" value={this.state.email}/>
              </label>
            </div>
            <div class='row'>
              <label>
                Password:
                <input type="text" value={this.state.password}/>
              </label>
            </div>
            <input type="submit" value="Login" />
          </form>
        );
    }
}
