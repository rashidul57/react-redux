import React from 'react';
import ReactDOM from 'react-dom';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import * as _ from 'lodash';


// custom imports
import { store } from '../redux/store.js';
import './style.scss';
import { socketIoService } from '../services/socketIoService';

export class ScrapeForm extends React.Component {

    sites = [
        'bbb',
        'reoindustry'
    ];

    constructor(props) {
        super(props);
        this.state = {site: 'bbb', findText: 'General Contractor', location: 'Hartford, CT', message: '', links: [], data: [], labelWidth: 0, submitted: false};
    }

    componentWillMount() {
        socketIoService.getUploadStatus().subscribe(data => {
            if (data && data.message) {
                this.setState({message: data.message});
                if (data.links) {
                    this.setState(prevState => ({
                      links: prevState.links.concat(data.links)
                    }));
                }
                if (data.value) {
                  this.setState(prevState => ({
                    data: [...prevState.data, data.value]
                  }));
                }

                if (data.complete) {
                  this.setState({submitted: false});
                }
            }
        });
    }

    componentDidMount() {
        this.setState({
          labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
        });
    }
  
    handleChange(ev, prop) {
        this.setState({[prop]: ev.target.value});
    }
  
    handleSubmit(ev) {
        ev.preventDefault();
        let url = "/dataGenerator?findText=";
        switch(this.state.site) {
            case 'bbb':
            url += this.state.findText + '&location=' + this.state.location;
            break;
            case 'reoindustry':
            url += this.state.findText;
            break;
        }
        this.setState({submitted: true});

        fetch(url + '&site=' + this.state.site, {
          method: 'GET'
        })
        .then(res => res.json())
        .then(
          (result) => {
              // console.log(result);
          },
          (err) => {
            console.log(err);
          }
        )
    }

    handleSiteChange(ev) {
        const state = {site: ev.target.value};
        switch (state.site) {
          case 'bbb':
          state.findText = 'General Contractor';
          break;
          case 'reoindustry':
          state.findText = 'new york';
          break;
        }
        this.setState(state);
    }

    getSiteList() {
        return this.sites.map(function(value) {
          return (
            <MenuItem value={value}>{value}</MenuItem>
          );
        });
    }

    getListItems(list, title) {
        if (!list || !list.length) {
            return null;
        }
        return (
          <div>
            <div>{title}</div>
            <div>
              {
                list.map(item => {
                  if (typeof item === 'object') {
                    item = JSON.stringify(item);
                  }
                  return <ListItem>{item}</ListItem>;
                })
              }
            </div>
          </div>
        );
    }

    getProgressSpinner() {
        if (!this.state.submitted) {
          return null;
        }
        return <div>Scraping in progress: <CircularProgress /></div>
    }

    getMessage() {
        if (!this.state.message) {
          return null;
        }
        return <div><h2>{this.state.message}</h2></div>;
    }
  
    render() {
        const list = this.getSiteList();
        return (
          <div class='sections'>
            <div>
              <form class='input-section' onSubmit={(ev) => this.handleSubmit(ev)}>
                <FormControl variant="outlined">
                    <InputLabel ref={ref => {this.InputLabelRef = ref;}} htmlFor="outlined-site">Site</InputLabel>
                    <Select
                      value={this.state.site}
                      onChange={(ev) => this.handleSiteChange(ev)}
                      input={
                        <OutlinedInput
                          labelWidth={this.state.labelWidth}
                          name="site"
                          id="outlined-site"
                        />
                      }
                    >
                    {list}
                    </Select>
                </FormControl>
              

                <div class='row'>
                  <TextField
                      label="Find"
                      value={this.state.findText}
                      onChange={(ev) => this.handleChange(ev, 'findText') }
                      margin="normal"
                      variant="outlined"
                    />
                </div>
                {this.state.site === 'bbb' ? 
                (<div class='row'>
                  <TextField
                      label="Location"
                      defaultValue={this.state.location}
                      onChange={(ev) => this.handleChange(ev, 'location') }
                      margin="normal"
                      variant="outlined"
                    />
                </div>) : null}
                <Button type="submit" variant="contained" color="primary" className="button">Submit</Button>
              </form>
            </div>
            <div class='output-section'>
              {this.getProgressSpinner()}
              {this.getMessage()}
              <div class='output-data'>
                {this.getListItems(this.state.links, 'Links')}
                {this.getListItems(this.state.data, 'Scrapped Data')}
              </div>
            </div>
          </div>
        );
    }
}
