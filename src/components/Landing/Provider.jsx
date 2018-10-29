import React from 'react';

// Props to http://jaketrent.com/post/send-props-to-children-react/ 😃
// Renders children props with extra props we may want to add
const renderChildren = function(props) {
  return React.Children.map(props.children, (child) => {
    return React.cloneElement(child, {});
  });
};

export default function Provider(props) {
  return <div>{renderChildren(props)}</div>;
}
