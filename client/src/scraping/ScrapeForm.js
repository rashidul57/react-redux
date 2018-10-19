import React from 'react';
import './form.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


export class ScrapeForm extends React.Component {
    constructor(props) {
        super(props);
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
          (err) => {
            console.log(err);
          }
        )
    }
  
    render() {
        return (
          <form onSubmit={(ev) => this.handleSubmit(ev)}>
            <div class='row'>
              {/* <label>
                Find:
                <input type="text" value={this.state.findText} onChange={(ev) => this.handleChange(ev, 'findText')}/>
              </label> */}
              <TextField
                  label="Find"
                  value={this.state.findText}
                  onChange={(ev) => this.handleChange(ev, 'findText') }
                  margin="normal"
                  variant="outlined"
                />
            </div>
            <div class='row'>
              {/* <label>
                location:
                <input type="text" value={this.state.location} onChange={(ev) => this.handleChange(ev, 'location') }/>
              </label> */}

              <TextField
                  label="Location"
                  defaultValue={this.state.location}
                  onChange={(ev) => this.handleChange(ev, 'location') }
                  margin="normal"
                  variant="outlined"
                />
            </div>
            <Button type="submit" variant="contained" color="primary" className="button">Submit</Button>
          </form>
        );
    }
}
