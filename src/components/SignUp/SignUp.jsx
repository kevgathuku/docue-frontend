import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { handleFieldChange } from '../../utils/componentHelpers';
import { initiateSignup } from '../../actions/actionCreators';

class SignupForm extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object,
    signupError: PropTypes.object,
    token: PropTypes.string,
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      username: null,
      firstname: null,
      lastname: null,
      email: null,
      password: null,
      passwordConfirm: null,
      result: null,
    };
  }

  componentDidUpdate(prevProps) {
    let { signupError, user, token } = this.props;
    if (signupError && prevProps.signupError !== this.props.signupError) {
      window.Materialize.toast(signupError.error, 2000, 'error-toast');
      return;
    }

    if (token && prevProps.token !== this.props.token) {
      localStorage.setItem('user', token);
    }

    if (user && prevProps.user !== this.props.user) {
      // The signup was successful. Save user's info in localStorage
      localStorage.setItem('userInfo', JSON.stringify(user));
      window.Materialize.toast(
        'Your Account has been created successfully!',
        2000,
        'success-toast'
      );
      this.props.history.push('/dashboard');
    }
  }

  comparePassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      window.Materialize.toast("passwords don't match", 2000, 'error-toast');
      return false;
    } else if (password.length >= 1 && password.length < 6) {
      window.Materialize.toast(
        'passwords should be > 6 characters ',
        2000,
        'error-toast'
      );
      return false;
    } else {
      return true;
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.comparePassword(this.state.password, this.state.passwordConfirm)) {
      let userPayload = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        username: this.state.email,
        email: this.state.email,
        password: this.state.password,
      };
      this.props.dispatch(initiateSignup(userPayload));
    }
  };

  handleFieldChange = (event) => {
    if (event.target.name === 'password-confirm') {
      this.setState({ passwordConfirm: event.target.value });
    } else {
      let stateObject = handleFieldChange(event);
      this.setState(stateObject);
    }
  };

  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="input-field col m6 s12">
            <input
              className="validate"
              id="firstname"
              name="firstname"
              onChange={this.handleFieldChange}
              required
              type="text"
            />
            <label htmlFor="firstname">First Name</label>
          </div>
          <div className="input-field col m6 s12">
            <input
              className="validate"
              id="lastname"
              name="lastname"
              onChange={this.handleFieldChange}
              required
              type="text"
            />
            <label htmlFor="lastname">Last Name</label>
          </div>
          <div className="input-field col s12">
            <input
              className="validate"
              id="email"
              name="email"
              onChange={this.handleFieldChange}
              required
              type="email"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s12">
            <input
              className="validate"
              id="password"
              name="password"
              onChange={this.handleFieldChange}
              required
              type="password"
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-field col s12">
            <input
              className="validate"
              id="password-confirm"
              name="password-confirm"
              onChange={this.handleFieldChange}
              required
              type="password"
            />
            <label htmlFor="password-confirm">Confirm Password</label>
          </div>
          <div className="col s12">
            <div className="center">
              <button
                className="btn waves-effect waves-light blue"
                name="action"
                type="submit"
              >
                Sign up
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    signupError: state.signupError,
    token: state.token,
    user: state.user,
  };
};

export default connect(mapStateToProps)(SignupForm);
