import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import NavBar from '../NavBar/NavBar.jsx';

export const DefaultLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => {
        return (
          <React.Fragment>
            <NavBar pathname={matchProps.location.pathname} {...matchProps} />
            <Component {...matchProps} />
          </React.Fragment>
        );
      }}
    />
  );
};

DefaultLayout.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};
