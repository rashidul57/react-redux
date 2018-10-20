import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// custom imports
import { store } from '../redux/store.js';
import { UtilService } from '../services/utilService.js';
import { socketIoService } from '../services/socketIoService';

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
            socketIoService.init('new-session');
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
          <form noValidate autoComplete="off" onSubmit={(ev) => this.handleSubmit(ev)}>
            <div class='row'>
              <TextField
                  id="outlined-name"
                  label="Email"
                  defaultValue={this.state.email}
                  onChange={(ev) => this.handleChange(ev, 'findText') }
                  margin="normal"
                  variant="outlined"
                />
            </div>
            <div class='row'>
              <TextField
                  label="Password"
                  defaultValue={this.state.password}
                  margin="normal"
                  variant="outlined"
                />
            </div>
            <Button type="submit" variant="contained" color="primary" className="button">Login</Button>
          </form>
        );
    }
}
