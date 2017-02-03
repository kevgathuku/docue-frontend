import React from 'react';
import {observe} from 'mobx';
import {observer, PropTypes} from 'mobx-react';

import UserActions from '../../actions/UserActions';
import {browserHistory} from 'react-router';
import logoSrc from '../../images/favicon.png';

const NavBar = observer(class NavBar extends React.Component {
  // Receive the current pathname as a prop
  static propTypes = {
    pathname: React.PropTypes.string,
    userStore: PropTypes.observableObject
  };

  constructor(props) {
    super(props);

    this.userStore = this.props.userStore;
    this.state = {
      pathname: this.props.pathname,
      token: localStorage.getItem('user'),
      loggedIn: null,
      user: null
    };
  }

  componentDidMount() {
    // Send a request to check if the user is logged in
    UserActions.getSession(this.state.token, this.userStore);
    // Acts as eventListeners
    observe(this.userStore, 'session', this.userSession);
    observe(this.userStore, 'loginResult', this.afterLoginUpdate);
    observe(this.userStore, 'signupResult', this.afterSignupUpdate);
    observe(this.userStore, 'logoutResult', this.handleLogoutResult);

    window.$('.dropdown-button').dropdown();
    window.$('.button-collapse').sideNav();
  }

  componentDidUpdate() {
    window.$('.dropdown-button').dropdown();
    // window.$('.button-collapse').sideNav();
  }

  afterLoginUpdate = () => {
    // Update the state after a user login event
    let data = this.userStore.loginResult;
    if (data && !data.error) {
      this.setState({
        loggedIn: 'true',
        token: data.token,
        user: data.user
      });
    }
  };

  afterSignupUpdate = () => {
    // Update the state after a user signs up
    let data = this.userStore.signupResult;
    if (data && !data.error) {
      this.setState({
        loggedIn: 'true',
        token: data.token,
        user: data.user
      });
    }
  };

  userSession = () => {
    // Returns 'true' + the user object or 'false'
    let response = this.userStore.session;
    if (response && !response.error) {
      this.setState({
        loggedIn: response.loggedIn,
        user: response.user
      });
      if (response.loggedIn === 'false') {
        // If there is a user token in localStorage, remove it
        // because it is invalid now
        localStorage.removeItem('user');
        localStorage.removeItem('userInfo');
        // If the user is not logged in and is not on the homepage
        // redirect them to the login page
        if (this.state.pathname !== '/') {
          browserHistory.push('/auth');
        }
      } else if (response.loggedIn === 'true') {
        if (this.state.pathname === '/auth' || this.state.pathname === '/') {
          browserHistory.push('/dashboard');
        }
      }
    }
  };

  handleLogoutSubmit = (event) => {
    event.preventDefault();
    // Send a request to check if the user is logged in
    UserActions.logout({}, this.state.token, this.userStore);
  };

  handleLogoutResult = () => {
    let data = this.userStore.logoutResult;
    if (data && !data.error) {
      // Remove the user's token and info
      localStorage.removeItem('user');
      localStorage.removeItem('userInfo');
      // Set the state to update the navbar links
      this.setState({
        loggedIn: null,
        user: null
      });
      browserHistory.push('/');
    }
  };

  render() {
    return this.props.pathname === '/' ? null : (
        <nav className="transparent black-text" role="navigation">
          <div className="nav-wrapper container">
            <a className="brand-logo brand-logo-small" href="/">
              <img alt="Docue Logo" id="header-logo" src={logoSrc}/>
              {'      Docue'}
            </a>
            <a href="#" data-activates="mobile-demo" className="button-collapse">
              <i className="material-icons" style={{color: 'grey'}}>menu</i>
            </a>
            <ul className="side-nav" id="mobile-demo">
              <li><a href="/">Home</a></li>
              <li>
                {this.state.loggedIn === 'true'
                  ? <a href="/profile" >Profile</a>
                  : <a href="/auth">Login</a>
                }
              </li>
              <li>
                {this.state.loggedIn === 'true'
                  ? <a href="/#" onClick={this.handleLogoutSubmit}>Logout</a>
                  : <a href="/auth">Sign Up</a>
                }
              </li>
            </ul>
            <ul className="right hide-on-med-and-down" id="nav-mobile">
              <li>
                {this.state.loggedIn === 'true'
                  ? <div>
                      <ul id="dropdown" className="dropdown-content">
                        <li><a href="/profile">My Profile</a></li>
                        <li><a href="/dashboard">All Documents</a></li>
                        {
                          this.state.user.role.title === 'admin'
                          ? <li><a href="/admin">Settings</a></li>
                          : null
                        }
                        <li className="divider"></li>
                        <li>
                          <a href="/#" id="logout-btn"
                              onClick={this.handleLogoutSubmit}
                          > Logout
                          </a>
                        </li>
                      </ul>
                      <a className="dropdown-button"
                          data-activates="dropdown"
                          data-beloworigin="true"
                          data-constrainwidth="false"
                      >{this.state.user.name.first}
                        <i className="material-icons right">arrow_drop_down</i>
                      </a>
                    </div>
                  : null
                }
              </li>
            </ul>
          </div>
        </nav>
      )
  }
});

export default NavBar;
