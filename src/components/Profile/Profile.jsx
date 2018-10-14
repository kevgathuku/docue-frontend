import React from 'react';
import Elm from '../../utils/ReactElm';
import BaseActions from '../../actions/BaseActions';
import ElmComponents from '../Profile.elm';

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
      role: user.role ? user.role.title : ''
    },
  };

  setupPorts(ports) {
    // Receives tuple from Elm of message, displayLength, className
    // tuple converted to fixed-length, mixed JS array
    ports.materializeToast.subscribe(function(toastParams) {
      window.Materialize.toast.apply(null, toastParams);
    });

    ports.updateCachedUserInfo.subscribe(function(userInfo) {
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          _id: userInfo.id_,
          email: userInfo.email,
          name: {
            first: userInfo.firstName,
            last: userInfo.lastName,
          },
          role: {
            title: userInfo.role,
          },
        })
      );
      window.Materialize.toast('Profile Info Updated!', 2000, 'success-toast');
    });
  }

  render() {
    return <Elm src={ElmComponents.Elm.Profile} flags={this.flags} ports={this.setupPorts} />;
  }
}
