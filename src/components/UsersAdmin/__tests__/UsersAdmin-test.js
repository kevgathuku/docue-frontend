'use strict';

import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import RoleStore from '../../../stores/RoleStore';
import userStore from '../../../stores/UserStore';
import RoleActions from '../../../actions/RoleActions';
import UserActions from '../../../actions/UserActions';
import UsersAdmin from '../UsersAdmin.jsx';

describe('UsersAdmin', function() {

  describe('Component Rendering', function() {
    it('renders the correct component', function() {
      expect(shallow(<UsersAdmin userStore={userStore}/>).is('.container')).toEqual(true);
      expect(shallow(<UsersAdmin userStore={userStore}/>).text()).toMatch(/Manage Users/);
    });
  });

  describe('Class Functions', function() {
    window.Materialize = {};

    var usersAdmin;

    beforeEach(function() {
      sinon.stub(RoleActions, 'getRoles').returns(true);
      sinon.stub(UserActions, 'fetchAllUsers').returns(true);
      sinon.stub(UserActions, 'update').returns(true);
      window.Materialize.toast = sinon.spy();
      usersAdmin = mount(<UsersAdmin userStore={userStore}/>);
    });

    afterEach(function() {
      RoleActions.getRoles.restore();
      UserActions.fetchAllUsers.restore();
      UserActions.update.restore();
      usersAdmin.unmount();
    });

    describe('handleSelectChange', function() {
      it('should correctly update the state', function() {
        let user = {
          _id: 1,
          role: {
            _id: 22
          }
        };
        let val = {
          _id: 1
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
        let val = [{
          _id: 1
        }];
        RoleStore.setRoles(val);
        expect(RoleStore.getRoles()).toEqual(val);
        expect(usersAdmin.state().roles).toBe(val);
      });
    });

    describe('handleUsersResult', function() {
      it('should correctly update the state', function() {
        let users = [{
          _id: 1,
          name: {
            first: 'Kevin',
            last: 'wknflfwe'
          },
          role: {
            title: 'viewer'
          }
        }];
        userStore.users = users;
        expect(usersAdmin.text()).toMatch(users[0].name.first);
      });
    });

  });
});
