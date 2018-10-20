import React from 'react';
import { Provider, connect } from 'react-redux';
import Button from '@material-ui/core/Button';

// custom imports
import { store } from '../redux/store.js';
import './style.scss';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sessionUser: ''};
    }

    componentWillMount() {
        store.subscribe(() => {
            let state = store.getState();
            this.setState({sessionUser: state.sessionUser});
        });
    }

    logout() {
      fetch('/users/session/logout', {
        method: 'GET'
      })
      .then(res => res.json())
      .then((result) => {
          this.setState({isLoggedIn: false});
          this.props.dispatch({
              type: 'SET_SESSION_USER',
              payload: null
            });
        },
        (error) => {
            console.log(error);
        }
      );
    }

    render() {
        let welsomeMsg = '<a href="#">Login</a>';
        if (this.props.state.sessionUser) {
            welsomeMsg = "Welcome: " + this.props.state.sessionUser.fullName;
        }
        return (
            <div class='row header'>
              {welsomeMsg}
              <Button color="primary" onClick={(ev) => this.logout(ev)}>Logout</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
  const sessionUser = state.sessionUser;
  return {state};
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  }
}
Header = connect(mapStateToProps, mapDispatchToProps)(Header);

export { Header };