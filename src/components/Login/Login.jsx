import React from 'react';
import {observe} from 'mobx';
import {observer, PropTypes} from 'mobx-react';
import {browserHistory} from 'react-router';

import { handleFieldChange } from '../../utils/componentHelpers';
import UserActions from '../../actions/UserActions';

const LoginForm = observer(class LoginForm extends React.Component {
  static propTypes = {
    userStore: PropTypes.observableObject
  };

  constructor(props) {
    super(props);

    this.userStore = this.props.userStore;
    this.state = {
      email: null,
      password: null,
      result: null
    };
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
        window.Materialize.toast('Logged in Successfully!', 2000, 'success-toast');
        browserHistory.push('/dashboard');
      }
    }
  };

  handleFieldChange = (event) => {
    let stateObject = handleFieldChange(event);
    this.setState(stateObject);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let loginPayload = {
      username: this.state.email,
      password: this.state.password
    };
    UserActions.login(loginPayload, this.userStore);
  };

  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="input-field col s12">
            <input className="validate"
                id="email"
                name="email"
                onChange={this.handleFieldChange}
                required
                type="text"
            />
          <label htmlFor="email">Email Address</label>
          </div>
          <div className="input-field col s12">
            <input className="validate"
                id="password"
                name="password"
                onChange={this.handleFieldChange}
                required
                type="password"
            />
          <label htmlFor="password">Password</label>
          </div>
          <div className="col s12">
            <div className="container center">
              <button className="btn waves-effect header-btn blue"
                  name="action"
                  type="submit"
              > Login
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = LoginForm;
