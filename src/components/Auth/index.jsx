import React from 'react';
import { observer, PropTypes as MobxPropTypes } from 'mobx-react';
import PropTypes from 'prop-types';

import Login from '../Login/Login.jsx';
import SignUp from '../SignUp/SignUp.jsx';

const Authenticate = observer(
  class Authenticate extends React.PureComponent {
    static propTypes = {
      history: PropTypes.object,
      userStore: MobxPropTypes.observableObject,
    };

    constructor(props) {
      super(props);

      this.userStore = this.props.userStore;
    }

    render() {
      return (
        <div className="container">
          <br />
          <div className="row">
            <div className="container">
              <div className="row">
                <div className="container">
                  <div className="row card-panel hoverable">
                    <div className="col s12">
                      <ul className="tabs">
                        <li className="tab col s4">
                          <a className="active blue-text" href="#login">
                            Login
                          </a>
                        </li>
                        <li className="tab col s4">
                          <a className="blue-text" href="#signup">
                            Signup
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div id="login" className="col s12">
                      <Login
                        userStore={this.userStore}
                        history={this.props.history}
                      />
                    </div>
                    <div id="signup" className="col s12">
                      <SignUp
                        userStore={this.userStore}
                        history={this.props.history}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);

module.exports = Authenticate;
