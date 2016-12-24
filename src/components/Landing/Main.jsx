import React from 'react';
import NavBar from '../NavBar/index.jsx';

class Main extends React.PureComponent {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
    location: React.PropTypes.object
  };

  render() {
    return (
      <div>
        <NavBar pathname={this.props.location.pathname}/>
        {this.props.children}
      </div>
    );
  }
}

export default Main;
