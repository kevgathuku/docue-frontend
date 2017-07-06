import React from 'react';
import Elm from 'react-elm-components';

import BaseActions from '../../actions/BaseActions';
import { RolesAdmin } from '../RolesAdmin.elm';

export default class RolesAdminComponent extends React.Component {
  flags = {
    token: localStorage.getItem('user'),
    baseURL: BaseActions.BASE_URL
  };

  render() {
    return <Elm src={RolesAdmin} flags={this.flags} />;
  }
}
