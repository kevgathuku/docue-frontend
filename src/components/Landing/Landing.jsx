import React from 'react';
import Elm from 'react-elm-components';
import { Landing } from '../Landing.elm';

// Requires the CSS for it to be included in the final output
import 'react-select/dist/react-select.css';
import '../../styles/style.css';

export default class Main extends React.PureComponent {
  render() {
    return <Elm src={Landing} />;
  }
}
