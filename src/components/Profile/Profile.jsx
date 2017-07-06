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
    // Receives tuple from Elm of message, displayLength, className
    // tuple converted to fixed-length, mixed JS array
    ports.materializeToast.subscribe(function(toastParams) {
      window.Materialize.toast.apply(null, toastParams);
    });
  }

  render() {
    return <Elm src={Profile} flags={this.flags} ports={this.setupPorts} />;
  }
}
