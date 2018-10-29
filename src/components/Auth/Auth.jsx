import React from 'react';
import PropTypes from 'prop-types';

import Login from '../Login/Login.jsx';
import SignUp from '../SignUp/SignUp.jsx';

class Authenticate extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object,
  };

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
                    <Login history={this.props.history} />
                  </div>
                  <div id="signup" className="col s12">
                    <SignUp history={this.props.history} />
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

export default Authenticate;
