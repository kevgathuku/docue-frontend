import React from 'react';
import Elm from 'react-elm-components';
import { Landing } from '../Landing.elm';

export default class Main extends React.PureComponent {
  render() {
    return <Elm src={Landing} />;
  }
}
