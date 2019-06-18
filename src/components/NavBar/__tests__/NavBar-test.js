import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { NavBar } from '../NavBar.jsx';

describe('NavBar', function() {
  describe('Component Rendering', function() {
    beforeEach(function() {
      global.localStorage.clear();

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

    it('renders the correct content', function() {
      const props = {
        dispatch: jest.fn(),
      }
      const wrapper = shallow(<NavBar {...props} />)
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should activate the materialize dropdowns', function(done) {
      const props = {
        dispatch: jest.fn(),
      }
      mount(<NavBar {...props} />);
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

      it.skip('responds correctly if the user is not logged in', function() {
        sinon.spy(global.localStorage, 'removeItem');

        const props = {
          dispatch: jest.fn(),
          session: {
            loggedIn: false
          }
        }
        shallow(<NavBar {...props} />);

        expect(localStorage.removeItem.withArgs('user').called).toBe(true);
        expect(localStorage.removeItem.withArgs('userInfo').called).toBe(true);
        localStorage.removeItem.restore();
      });

      it.skip('responds correctly if the user is logged in', function() {
        const props = {
          pathname: "/",
          dispatch: jest.fn(),
          history: {
            push: jest.fn(),
          },
          session: {
            loggedIn: true,
            user: {
              name: 'Kevin',
              role: {
                title: 'viewer',
              }
            }
          }
        }
        const wrapper = mount(<NavBar {...props} />);
        // Trigger a change in the UserStore
        // userStore.session = {
        //   loggedIn: 'true',
          // user: {
          //   name: 'Kevin',
          //   role: {
          //     title: 'viewer',
          //   },
          // },
        // };
        // this.props.history.push('/dashboard');
        expect(props.push.mock.calls[0][0]).toBe('/dashboard');
      });
    });
  });

  describe('handleLogout', function() {
    it.skip('should logout the user on click', function() {
      sinon.spy(localStorage, 'removeItem');

      const props = {
        dispatch: jest.fn(),
        user: {
          name: {
            first: 'Kevin',
          },
          role: {
            title: 'viewer',
          },
        },
      }
      mount(<NavBar {...props} />);
      // Trigger a change in the logout store
      // userStore.logoutResult = {
      //   message: 'Successfully logged out',
      // };
      expect(localStorage.removeItem.withArgs('user').called).toBe(true);
      expect(localStorage.removeItem.withArgs('userInfo').called).toBe(true);
    });

    it('should call the logout action on click', function() {
      const mockEvent = {
        preventDefault: jest.fn(),
      };
      const props = {
        loggedIn: true,
        dispatch: jest.fn(),
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        user: {
          name: {
            first: 'Kevin',
          },
          role: {
            title: 'viewer',
          },
        },
      };

      let navBar = mount(<NavBar {...props} />);
      // userStore.loginResult = user;
      // The logout button should be in the DOM
      expect(navBar.find('#logout-btn').length).toBe(1);
      navBar.find('#logout-btn').simulate('click', mockEvent);

      expect(mockEvent.preventDefault).toBeCalled();
      expect(props.dispatch).toBeCalled();
    });
  });
});
