import React from 'react';
import Elm from 'react-elm-components';
import BaseActions from '../../actions/BaseActions';
import { Profile } from '../Profile.elm';

const user = JSON.parse(localStorage.getItem('userInfo'));

export default class Main extends React.PureComponent {
  flags = {
    token: localStorage.getItem('user'),
    baseURL: BaseActions.BASE_URL,
    user: {
      id_: user._id,
      email: user.email,
      firstName: user.name.first,
      lastName: user.name.last,
      role: user.role.title
    }
  };

  setupPorts(ports) {
    // Receives tuple, which corresponds to fixed-length, mixed JS arrays
    function handler(message, displayLength, className) {
      return window.Materialize.toast(message, displayLength, className);
    }
    ports.materializeToast.subscribe(function(args) {
      handler.apply(null, args);
    });
  }

  render() {
    return <Elm src={Profile} flags={this.flags} ports={this.setupPorts} />;
  }
}
