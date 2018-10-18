import React from 'react';
import './form.scss';
import { add } from '../services/dataService';

export class ScrapeForm extends React.Component {
    constructor(props) {
        super(props);
        debugger
        this.state = {findText: 'General Contractor', location: 'Hartford, CT'};
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
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
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
                Find:
                <input type="text" value={this.state.findText} onChange={(ev) => this.handleChange(ev, 'findText')}/>
              </label>
            </div>
            <div class='row'>
              <label>
                location:
                <input type="text" value={this.state.location} onChange={(ev) => this.handleChange(ev, 'location') }/>
              </label>
            </div>
            <input type="submit" value="Submit" />
          </form>
        );
    }
}
