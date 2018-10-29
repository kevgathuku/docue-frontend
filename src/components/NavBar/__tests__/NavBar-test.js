'use strict';

import React from 'react';
import sinon from 'sinon';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import NavBar from '../NavBar.jsx';
import UserActions from '../../../actions/UserActions';

describe('NavBar', function() {
  beforeEach(function() {
    sinon.stub(UserActions, 'getSession').returns(true);
  });

  afterEach(function() {
    UserActions.getSession.restore();
  });

  describe('Component Rendering', function() {
    beforeEach(function() {
      localStorage.clear();

      window.$ = sinon.stub();
      window.$.withArgs('.dropdown-button').returns(
        sinon.stub({
          dropdown: function() {},
        })
      );
      window.$.withArgs('.button-collapse').returns(
        sinon.stub({
          sideNav: function() {},
        })
      );
    });

    it('renders the correct mobile links', function() {
      // It should find the correct title
      expect(shallow(<NavBar />).text()).toMatch(/Docue/);
      // It should render the correct menu items
      expect(shallow(<NavBar />).text()).toMatch(/Home/);
      expect(shallow(<NavBar />).text()).toMatch(/Sign Up/);
      expect(shallow(<NavBar />).text()).toMatch(/Login/);
    });

    it('renders the correct component', function() {
      expect(shallow(<NavBar />).is('.transparent')).toEqual(true);
      // It should render the site logo
      expect(shallow(<NavBar />).find('img').length).toEqual(1);
    });

    it('has the correct initial state', function() {
      const navBar = shallow(<NavBar pathname="/" />);
      expect(navBar.state().token).toEqual(null);
      expect(navBar.state().loggedIn).toEqual(null);
      expect(navBar.state().user).toEqual(null);
      expect(navBar.state().pathname).toEqual('/');
    });

    it('calls registered callbacks on mount', () => {
      // Mount the component
      mount(<NavBar />);
      expect(UserActions.getSession.calledOnce).toBe(true);
    });

    it('renders relevant links if user is logged in', function() {
      let navBar = mount(<NavBar />);
      // userStore.session = {
      //   loggedIn: 'true',
      //   user: {
      //     name: 'Kevin',
      //     role: {
      //       title: 'admin',
      //     },
      //   },
      // };
      expect(navBar.text()).toMatch(/Settings/);
      expect(navBar.text()).toMatch(/Profile/);
    });

    it('should activate the materialize dropdowns', function(done) {
      mount(<NavBar />); // Mount the component
      // The menu activators should be activated after component mount & update
      expect(window.$.withArgs('.dropdown-button').called).toBe(true);
      expect(window.$.withArgs('.button-collapse').called).toBe(true);
      done();
    });
  });

  describe('Class functions:', function() {
    describe('userSession', function() {
      beforeEach(function() {
        // browserHistory.push = jest.fn();
      });

      it('sets the correct state if the response is valid', function() {
        let navBar = mount(<NavBar />);
        // Trigger a change in the UserStore
        userStore.session = {
          loggedIn: 'true',
          user: {
            name: 'Kevin',
            role: {
              title: 'viewer',
            },
          },
        };
        expect(navBar.state().loggedIn).toEqual('true');
        expect(navBar.state().user).toBeA('object');
      });

      it('sets the correct state if the response has an error', function() {
        let navBar = mount(<NavBar />);
        // Trigger a change in the UserStore
        // userStore.session = {
        //   error: 'Error Occurred!!!!!!',
        // };
        expect(navBar.state().loggedIn).toNotExist();
        expect(navBar.state().user).toNotExist();
      });

      it('responds correctly if the user is not logged in', function() {
        sinon.spy(localStorage, 'removeItem');
        shallow(<NavBar />);
        // Trigger a change in the UserStore
        // userStore.session = {
        //   loggedIn: 'false',
        // };
        expect(localStorage.removeItem.withArgs('user').called).toBe(true);
        expect(localStorage.removeItem.withArgs('userInfo').called).toBe(true);
        localStorage.removeItem.restore();
      });

      it('responds correctly if the user is logged in', function() {
        const wrapper = mount(<NavBar pathname={'/'} />);
        // Trigger a change in the UserStore
        // userStore.session = {
        //   loggedIn: 'true',
        //   user: {
        //     name: 'Kevin',
        //     role: {
        //       title: 'viewer',
        //     },
        //   },
        // };
        expect(wrapper.state().pathname).toBe('/');
        // expect(browserHistory.push.mock.calls[0][0]).toBe('/dashboard');
      });
    });
  });

  describe('afterLoginUpdate', function() {
    beforeEach(function() {
      // Start with an empty localStorage instance
      localStorage.clear();
    });

    it('sets the correct state after login', function() {
      let navBar = mount(<NavBar />);
      // Trigger a change in the UserStore
      // userStore.loginResult = {
      //   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      //   user: {
      //     name: 'Kevin',
      //     role: {
      //       title: 'viewer',
      //     },
      //   },
      // };
      expect(navBar.state().loggedIn).toEqual('true');
      expect(navBar.state().user).toBeA('object');
      expect(navBar.state().token).toBeA('string');
    });

    it('does not change state if response has error', function() {
      let navBar = mount(<NavBar />);
      // Trigger a change in the UserStore
      // userStore.loginResult = {
      //   error: 'Error!',
      // };
      expect(navBar.state().loggedIn).toNotExist();
      expect(navBar.state().user).toNotExist();
      expect(navBar.state().token).toNotExist();
    });
  });

  describe('afterSignupUpdate', function() {
    it('sets the correct state after signup', function() {
      let navBar = mount(<NavBar />);
      // Trigger a change in the UserStore
      // userStore.signupResult = {
      //   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      //   user: {
      //     name: 'Kevin',
      //     role: {
      //       title: 'viewer',
      //     },
      //   },
      // };
      expect(navBar.state().loggedIn).toEqual('true');
      expect(navBar.state().user).toBeA('object');
      expect(navBar.state().token).toBeA('string');
    });

    it('does not change state if response has error', function() {
      let navBar = mount(<NavBar />);
      // Trigger a change in the UserStore
      // userStore.signupResult = {
      //   error: 'Error!',
      // };
      expect(navBar.state().loggedIn).toNotExist();
      expect(navBar.state().user).toNotExist();
      expect(navBar.state().token).toNotExist();
    });
  });

  describe('handleLogout', function() {
    it('should logout the user on click', function() {
      sinon.spy(localStorage, 'removeItem');
      let navBar = mount(<NavBar />);
      // Trigger a change in the logout store
      // userStore.logoutResult = {
      //   message: 'Successfully logged out',
      // };
      // Should set the state correctly
      expect(navBar.state().loggedIn).toNotExist();
      expect(navBar.state().user).toNotExist();
      expect(localStorage.removeItem.withArgs('user').called).toBe(true);
      expect(localStorage.removeItem.withArgs('userInfo').called).toBe(true);
    });

    it('should call the logout action on click', function() {
      let mockEvent = {
        preventDefault: function() {},
      };
      sinon.stub(UserActions, 'logout').returns(true);
      let user = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        user: {
          name: 'Kevin',
          role: {
            title: 'viewer',
          },
        },
      };
      sinon.spy(mockEvent, 'preventDefault');
      let navBar = mount(<NavBar />);
      const inst = navBar.instance();
      sinon.spy(inst, 'handleLogoutSubmit');
      // userStore.loginResult = user;
      // The logout button should be in the DOM
      expect(navBar.find('#logout-btn').length).toBe(1);
      navBar.find('#logout-btn').simulate('click', mockEvent);
      expect(mockEvent.preventDefault.called).toBe(true);
      expect(UserActions.logout.withArgs({}, user.token).called).toBe(true);
      expect(inst.handleLogoutSubmit.calledOnce).toBe(true);
      UserActions.logout.restore();
    });
  });
});
