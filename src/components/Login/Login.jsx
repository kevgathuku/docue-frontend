import React from 'react';
import Elm from '../../utils/ReactElm';
import { observe } from 'mobx';
import { observer, PropTypes } from 'mobx-react';
import { browserHistory } from 'react-router';
import ElmComponents from '../Login.elm';

import UserActions from '../../actions/UserActions';

const LoginForm = observer(
  class LoginForm extends React.Component {
    static propTypes = {
      userStore: PropTypes.observableObject
    };

    constructor(props) {
      super(props);
      this.userStore = this.props.userStore;
    }

    componentDidMount() {
      // Mobx eventListeners
      observe(this.userStore, 'loginResult', this.handleLoginResult);
    }

    handleLoginResult = () => {
      let data = this.userStore.loginResult;
      if (data) {
        if (data.error) {
          window.Materialize.toast(data.error, 2000, 'error-toast');
        } else {
          // The login was successful. Store user data in localStorage
          localStorage.setItem('user', data.token);
          localStorage.setItem('userInfo', JSON.stringify(data.user));
          window.Materialize.toast(
            'Logged in Successfully!',
            2000,
            'success-toast'
          );
          browserHistory.push('/dashboard');
        }
      }
    };

    setupPorts = ports => {
      let userStore = this.userStore;
      // Receives a record from Elm, which comes in as a JS obect
      ports.handleSubmit.subscribe(function(model) {
        let loginPayload = {
          username: model.email,
          password: model.password
        };
        UserActions.login(loginPayload, userStore);
      });
    };

    render() {
      return <Elm src={ElmComponents.Elm.Login} ports={this.setupPorts} />;
    }
  }
);

module.exports = LoginForm;
