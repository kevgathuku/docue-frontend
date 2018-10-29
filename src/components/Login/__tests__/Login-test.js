'use strict';

import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import Login from '../Login.jsx';

describe('Login', function() {
  describe('Component Rendering', function() {
    it('displays the correct contents', function() {
      // It should find the correct content
      expect(shallow(<Login />).text()).toMatch(/Login/);
    });

    it('renders the correct component', function() {
      expect(shallow(<Login />).is('.row')).toEqual(true);
      expect(shallow(<Login />).find('.input-field').length).toEqual(2);
    });
  });

  describe('Class Functions', function() {
    window.Materialize = {};

    var login;

    beforeEach(function() {
      window.Materialize.toast = sinon.spy();
      login = mount(<Login />);
    });

    afterEach(function() {
      login.unmount();
    });

    describe('handleLogin', function() {
      it('should return the correct result if login is valid', function() {
        sinon.spy(localStorage, 'setItem');
        // Trigger a change in the login store
        let response = {
          token: 'weknfe',
          user: {
            name: 'kevin',
            role: {
              title: 'viewer',
            },
          },
        };
        // Should be handled correctly
        expect(localStorage.setItem.withArgs('user').called).toBe(true);
        expect(localStorage.setItem.withArgs('userInfo').called).toBe(true);
        // The first arg of the first call to the function was '/dashboard'
        // expect(browserHistory.push.mock.calls[0][0]).toBe('/dashboard');
        localStorage.setItem.restore();
      });

      it('should return the correct result if login raised error', function() {
        // Trigger a change in the login store
        let response = {
          error: 'Error Occurred',
        };
        // Should be handled correctly
        expect(window.Materialize.toast.withArgs(response.error).called).toBe(
          true
        );
      });
    });

    describe('handleFieldChange', function() {
      it('should correctly update the state', function() {
        let fieldChangeEvent = {
          target: {
            name: 'email',
            value: 'my@email.com',
          },
          preventDefault: function() {},
        };
        const instance = login.instance();
        sinon.spy(instance, 'handleFieldChange');
        instance.handleFieldChange(fieldChangeEvent);
        expect(login.state()[fieldChangeEvent.target.name]).toBe(
          fieldChangeEvent.target.value
        );
        instance.handleFieldChange.restore();
      });
    });

    describe('handleSubmit', function() {
      it('should call handleSubmit on submit click', function() {
        // simulate the submit form event
        let loginEvent = {
          preventDefault: function() {},
        };
        const instance = login.instance();
        sinon.spy(instance, 'handleSubmit');
        sinon.spy(loginEvent, 'preventDefault');
        login.setState({
          password: 'password',
          passwordConfirm: 'password',
        });
        // Submit the form
        login.find('form').simulate('submit', loginEvent);
        expect(loginEvent.preventDefault.called).toBe(true);
        expect(instance.handleSubmit.calledOnce).toBe(true);
        instance.handleSubmit.restore();
      });
    });
  });
});
