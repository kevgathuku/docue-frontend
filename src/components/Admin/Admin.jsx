import React from 'react';
import BaseActions from '../../actions/BaseActions';
import Elm from '../../utils/ReactElm';
import ElmComponents from '../Admin.elm';

export default class Main extends React.Component {
  flags = {
    token: localStorage.getItem('user'),
    baseURL: BaseActions.BASE_URL
  };

  render() {
    return <Elm src={ElmComponents.Elm.Admin} flags={this.flags} />;
  }
}
