import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Elm from '../../utils/ReactElm';
import ElmComponents from '../Login.elm';
import { initiateLogin } from '../../actions/actionCreators';

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object,
    loginError: PropTypes.string,
    token: PropTypes.string,
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.setupPorts = this.setupPorts.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { loginError, user, token } = this.props;

    if (loginError) {
      this.showLoginError();
    }

    // The login was successful. Store user data in localStorage
    if (token && prevProps.token !== this.props.token) {
      localStorage.setItem('user', token);
    }

    if (user && prevProps.user !== this.props.user) {
      // The signup was successful. Save user's info in localStorage
      localStorage.setItem('userInfo', JSON.stringify(user));
      window.Materialize.toast(
        'Logged in Successfully!',
        2000,
        'success-toast'
      );
      this.props.history.push('/dashboard');
    }
  }

  showLoginError = () => {
    const { loginError } = this.props;
    return window.Materialize.toast(loginError, 2000, 'error-toast');
  };

  setupPorts(ports) {
    const component = this;
    // Receives a record from Elm, which comes in as a JS obect
    ports.handleSubmit.subscribe(function(model) {
      let loginPayload = {
        username: model.email,
        password: model.password,
      };
      component.props.dispatch(initiateLogin(loginPayload));
    });
  }

  render() {
    return <Elm src={ElmComponents.Elm.Login} ports={this.setupPorts} />;
  }
}

const mapStateToProps = (state) => {
  return {
    loginError: state.loginError,
    token: state.token,
    user: state.user,
  };
};

export default connect(mapStateToProps)(Login);
