import React from 'react';
import { Provider, connect } from 'react-redux';
import { store } from '../redux/store.js';

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
          // SocketIoService.init('new-session');
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
            <div class='row'>
              {welsomeMsg}
              <input type='button' value='Logout' onClick={(ev) => this.logout(ev)}></input>
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