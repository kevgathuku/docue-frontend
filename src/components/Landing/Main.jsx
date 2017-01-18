import React from 'react';
import NavBar from '../NavBar/NavBar.jsx';

import userStore from '../../stores/UserStore';

class Main extends React.PureComponent {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
    location: React.PropTypes.object
  };

  render() {
    return (
      <div>
        <NavBar pathname={this.props.location.pathname} userStore={userStore}/>
        {this.props.children}
      </div>
    );
  }
}

export default Main;
