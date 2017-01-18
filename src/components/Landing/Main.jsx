import React from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import userStore from '../../stores/UserStore';

// Props to http://jaketrent.com/post/send-props-to-children-react/ 😃
// Renders children props with extra props we may want to add
const renderChildren = function(props) {
  return React.Children.map(props.children, (child) => {
    return React.cloneElement(child, {
      userStore: props.userStore
    });
  });
};

function Provider(props) {
  return (
    <div>
      {renderChildren(props)}
    </div>
  );
}

class Main extends React.PureComponent {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
    location: React.PropTypes.object
  };

  render() {
    return (
      <Provider userStore={userStore}>
        <NavBar pathname={this.props.location.pathname} />
        {this.props.children}
      </Provider>
    );
  }
}

export default Main;
