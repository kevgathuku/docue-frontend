import React from 'react';
import Elm from 'react-elm-components';
import { NotFound } from '../NotFound.elm';

export default class Main extends React.PureComponent {
  render() {
    return <Elm src={NotFound} />;
  }
}
