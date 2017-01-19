'use strict';

import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import userStore from '../../../stores/UserStore';
import DocStore from '../../../stores/DocStore';
import RoleStore from '../../../stores/RoleStore';
import Admin from '../Admin.jsx';

describe('Admin', function() {

  describe('Component Rendering', function() {
    it('displays the correct contents', function() {
      // It should find the correct content
      expect(shallow(<Admin userStore={userStore} />).text()).toMatch(/Admin\s+Panel/);
      expect(shallow(<Admin userStore={userStore} />).text()).toMatch(/Manage\s+Users/);
    });

    it('renders the correct component', function() {
      expect(shallow(<Admin userStore={userStore} />).is('.container')).toEqual(true);
      expect(shallow(<Admin userStore={userStore} />).find('.flow-text').length).toEqual(3);
    });
  });

  describe('Class Functions', function() {
    var admin;

    beforeEach(function() {
      admin = mount(<Admin userStore={userStore}/>);
    });

    afterEach(function() {
      admin.unmount();
    });

    describe('handleUsersResult', function() {
      it('correctly updates the users count', function() {
        let users = [1, 2, 3, 4, 5];
        userStore.users = users;
        expect(admin.find('#users-count').text()).toMatch(/5/);
      });
    });

    describe('handleDocsResult', function() {
      it('correctly updates the docs count', function() {
        let documents = [1, 2, 3, 4];
        DocStore.setDocs(documents);
        expect(admin.find('#docs-count').text()).toMatch(/4/);
      });
    });

    describe('handleDocsResult', function() {
      it('correctly updates the docs count', function() {
        let roles = [1, 2, 3, 4, 5, 6];
        RoleStore.setRoles(roles);
        expect(admin.find('#roles-count').text()).toMatch(/6/);
      });
    });

  });
});
