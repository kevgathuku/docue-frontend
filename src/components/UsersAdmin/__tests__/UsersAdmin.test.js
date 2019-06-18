import React from 'react';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import RoleStore from '../../../stores/RoleStore';
import RoleActions from '../../../actions/RoleActions';
import { UsersAdmin } from '../UsersAdmin';

describe('UsersAdmin', function() {
  let props;
  beforeEach(() => {
    props = { fetchUsers: jest.fn(), updateProfile: jest.fn() };
  });

  describe('Component Rendering', function() {
    it('renders correctly given no users', function() {
      const wrapper = shallow(<UsersAdmin {...props} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders correctly when users are provided', function() {
      const users = [
        {
          _id: 'somehting',
          email: 'some@ht.ing',
          name: { first: 'efwfeww', last: '' },
          role: { title: 'fefefe', _id: 'roleID' },
        },
      ];
      const localProps = Object.assign({}, props, {
        users,
      });
      const wrapper = shallow(<UsersAdmin {...localProps} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('Class Functions', function() {
    let usersAdmin;

    beforeEach(function() {
      sinon.stub(RoleActions, 'getRoles').returns(true);
      usersAdmin = shallow(<UsersAdmin {...props} />);
    });

    afterEach(function() {
      RoleActions.getRoles.restore();
    });

    describe('handleSelectChange', function() {
      it('calls updateProfile when the user role and selected role are different', () => {
        const state = { token: 'bar' };
        usersAdmin.setState(state);

        let user = { _id: 1, role: { _id: 22, title: 'Default' } };
        let val = { _id: 1, title: 'staff' };
        const updatedUser = Object.assign({}, user, { role: val });
        const instance = usersAdmin.instance();
        instance.handleSelectChange(user, val);

        expect(props.updateProfile).toHaveBeenCalledWith(
          user._id,
          updatedUser,
          state.token
        );
      });

      it('does not call updateProfile when the user role and selected role are different', () => {
        let role = { _id: 1, title: 'staff' };
        let user = { _id: 1, role };
        const instance = usersAdmin.instance();
        instance.handleSelectChange(user, role);

        expect(props.updateProfile).not.toHaveBeenCalled();
      });
    });

    describe('handleRolesResult', function() {
      it('should correctly update the state', function() {
        let val = [
          {
            _id: 1,
          },
        ];
        RoleStore.setRoles(val);
        expect(RoleStore.getRoles()).toEqual(val);
        expect(usersAdmin.state().roles).toBe(val);
      });
    });
  });
});
