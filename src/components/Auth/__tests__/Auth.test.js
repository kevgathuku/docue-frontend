import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import Auth from '../Auth';

describe('Auth', function() {
  const props = { history: {} };

  it('renders correctly', function() {
    const wrapper = shallow(<Auth {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
