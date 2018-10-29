import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Provider from './Provider';

import NavBar from '../NavBar/NavBar.jsx';

export const DefaultLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => {
        return (
          <Provider>
            <NavBar pathname={matchProps.location.pathname} {...matchProps} />
            <Component {...matchProps} />
          </Provider>
        );
      }}
    />
  );
};

DefaultLayout.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};
