import React from 'react';
import Elm from 'react-elm-components';

import { Admin } from '../Admin.elm';
import BaseActions from '../../actions/BaseActions';

export default class Main extends React.Component {
  flags = {
    token: localStorage.getItem('user'),
    baseURL: BaseActions.BASE_URL
  };

  render() {
    return <Elm src={Admin} flags={this.flags} />;
  }
}
