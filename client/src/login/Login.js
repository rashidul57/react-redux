import React from 'react';

export class Login extends React.Component {
    constructor(props) {
      super(props);

      this.state = {email: 'General Contractor', password: 'Hartford, CT'};
    }
  
    handleChange(event, prop) {
      this.setState({[prop]: event.target.value});
    }
  
    handleSubmit(event) {
      // console.log('submitted: ' + this.state.findText, this.state.location);
      event.preventDefault();

      fetch("/dataGenerator?findText=" + this.state.findText + '&location=' + this.state.location, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
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
              <input type="text" value={this.state.email} onChange={(ev) => this.handleChange(ev, 'findText')}/>
            </label>
          </div>
          <div class='row'>
            <label>
              Password:
              <input type="text" value={this.state.password} onChange={(ev) => this.handleChange(ev, 'location') }/>
            </label>
          </div>
          <input type="submit" value="Login" />
        </form>
      );
    }
  }
