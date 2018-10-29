import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSession, initiateLogout } from '../../actions/actionCreators';
import logoSrc from '../../images/favicon.png';

class NavBar extends React.Component {
  // Receive the current pathname as a prop
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object,
    loggedIn: PropTypes.bool,
    logoutResult: PropTypes.string,
    pathname: PropTypes.string,
    session: PropTypes.shape({
      loggedIn: PropTypes.bool,
    }),
    token: PropTypes.string,
    user: PropTypes.object,
  };

  componentDidMount() {
    const token = localStorage.getItem('user');
    // Send a request to check if the user is logged in
    this.props.dispatch(getSession(token));

    window.$('.dropdown-button').dropdown();
    window.$('.button-collapse').sideNav();
  }

  componentDidUpdate(prevProps) {
    window.$('.dropdown-button').dropdown();
    // window.$('.button-collapse').sideNav();

    const { logoutResult, session } = this.props;

    if (logoutResult && prevProps.logoutResult !== logoutResult) {
      // Remove the user's token and info
      localStorage.removeItem('user');
      localStorage.removeItem('userInfo');

      this.props.history.push('/');
    }

    if (session && prevProps.session !== session) {
      // session contains 'true' + the user object or 'false'
      if (session.loggedIn === false) {
        // If there is a user token in localStorage, remove it
        // because it is invalid now
        localStorage.removeItem('user');
        localStorage.removeItem('userInfo');

        // If the user is not logged in and is not on the homepage
        // redirect them to the login page
        if (this.props.pathname !== '/') {
          this.props.history.push('/auth');
        }
      } else if (session.loggedIn) {
        // Redirect to the dashboard if logged in and on the auth page or homepage
        if (this.props.pathname === '/auth' || this.props.pathname === '/') {
          this.props.history.push('/dashboard');
        }
      }
    }
  }

  handleLogoutSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('user');
    this.props.dispatch(initiateLogout(token));
  };

  render() {
    return this.props.pathname === '/' ? null : (
      <nav className="transparent black-text" role="navigation">
        <div className="nav-wrapper container">
          <a className="brand-logo brand-logo-small" href="/">
            <img alt="Docue Logo" id="header-logo" src={logoSrc} />
            {'      Docue'}
          </a>
          <a href="#" data-activates="mobile-demo" className="button-collapse">
            <i className="material-icons" style={{ color: 'grey' }}>
              menu
            </i>
          </a>
          <ul className="side-nav" id="mobile-demo">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              {this.props.loggedIn ? (
                <a href="/profile">Profile</a>
              ) : (
                <a href="/auth">Login</a>
              )}
            </li>
            <li>
              {this.props.loggedIn ? (
                <a href="/#" onClick={this.handleLogoutSubmit}>
                  Logout
                </a>
              ) : (
                <a href="/auth">Sign Up</a>
              )}
            </li>
          </ul>
          <ul className="right hide-on-med-and-down" id="nav-mobile">
            <li>
              {this.props.loggedIn ? (
                <div>
                  <ul id="dropdown" className="dropdown-content">
                    <li>
                      <a href="/profile">My Profile</a>
                    </li>
                    <li>
                      <a href="/dashboard">All Documents</a>
                    </li>
                    {this.props.user.role &&
                    this.props.user.role.title === 'admin' ? (
                      <li>
                        <a href="/admin">Settings</a>
                      </li>
                    ) : null}
                    <li className="divider" />
                    <li>
                      <a
                        href="/#"
                        id="logout-btn"
                        onClick={this.handleLogoutSubmit}
                      >
                        {' '}
                        Logout
                      </a>
                    </li>
                  </ul>
                  <a
                    className="dropdown-button"
                    data-activates="dropdown"
                    data-beloworigin="true"
                    data-constrainwidth="false"
                  >
                    {this.props.user.name.first}
                    <i className="material-icons right">arrow_drop_down</i>
                  </a>
                </div>
              ) : null}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user,
    loggedIn: state.user._id && state.session.loggedIn,
    logoutResult: state.logoutResult,
    session: state.session,
  };
};

export default connect(mapStateToProps)(NavBar);
