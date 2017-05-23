import React from 'react';
import Elm from 'react-elm-components';
import { Main } from '../NotFound.elm';

export default class NotFound extends React.PureComponent {
  render() {
    return <Elm src={Main} />;
  }
}
