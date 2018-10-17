import React from 'react';
import { UtilService } from '../services/UtilService.js';
import { SocketIoService } from '../services/socketIoService';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: 'jmay@primefinance.com', password: 'newyork952'};
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
            // console.log(result);
            SocketIoService.init('new-session');//.subscribe((value) => {
              // delete this.appData.sentNewSessionReq;
              // const sessionUser = payload;
              // this.appData.sessionUser = sessionUser;
          //});
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
