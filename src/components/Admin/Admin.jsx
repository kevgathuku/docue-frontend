import React from 'react';
import Elm from 'react-elm-components';

import { Admin } from '../Admin.elm';

export default class Main extends React.Component {
  flags = {
    token: localStorage.getItem('user')
  };

  render() {
    return <Elm src={Admin} flags={this.flags} />;
  }
}
