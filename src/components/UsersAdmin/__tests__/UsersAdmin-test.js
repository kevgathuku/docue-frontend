'use strict';

import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import RoleStore from '../../../stores/RoleStore';
import RoleActions from '../../../actions/RoleActions';
import UserActions from '../../../actions/UserActions';
import UsersAdmin from '../UsersAdmin.jsx';

describe('UsersAdmin', function() {
  describe('Component Rendering', function() {
    it('renders the correct component', function() {
      expect(shallow(<UsersAdmin />).is('.container')).toEqual(true);
      expect(shallow(<UsersAdmin />).text()).toMatch(/Manage Users/);
    });
  });

  describe('Class Functions', function() {
    window.Materialize = {};

    var usersAdmin;

    beforeEach(function() {
      sinon.stub(RoleActions, 'getRoles').returns(true);
      sinon.stub(UserActions, 'update').returns(true);
      window.Materialize.toast = sinon.spy();
      usersAdmin = mount(<UsersAdmin />);
    });

    afterEach(function() {
      RoleActions.getRoles.restore();
      UserActions.update.restore();
      usersAdmin.unmount();
    });

    describe('handleSelectChange', function() {
      it('should correctly update the state', function() {
        let user = {
          _id: 1,
          role: {
            _id: 22,
          },
        };
        let val = {
          _id: 1,
        };
        const instance = usersAdmin.instance();
        sinon.spy(instance, 'handleSelectChange');
        instance.handleSelectChange(user, val);
        expect(usersAdmin.state()[user._id]).toBe(val);
        instance.handleSelectChange.restore();
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
