'use strict';

import expect from 'expect';
import nock from 'nock';
import {when} from 'mobx';
import userStore from '../../stores/UserStore';
import BaseActions from '../BaseActions';
import UserActions from '../UserActions';

describe('UserActions', function() {
  let payload = {};
  let response = {
    'status': 'OK'
  };
  let store = userStore;
  let userID = 4;

  beforeEach(function() {
    nock(BaseActions.BASE_URL)
      .post('/api/users/login')
      .reply(200, response);

    nock(BaseActions.BASE_URL)
      .post('/api/users/logout')
      .reply(200, response);

    nock(BaseActions.BASE_URL)
      .post('/api/users')
      .reply(200, response);

    nock(BaseActions.BASE_URL)
      .put(`/api/users/${userID}`)
      .reply(200, response);

    nock(BaseActions.BASE_URL)
      .get('/api/users/session')
      .reply(200, response);

    nock(BaseActions.BASE_URL)
      .get('/api/users')
      .reply(200, response);
  });

  it('login triggers change in userStore', function(done) {
    UserActions.login(payload, store);

    when(
      () => store.loginResult,
      () => {
        // async failing expects are not picked up with Jest,
        // you have to try/catch and call done.fail(e);
        // https://github.com/mobxjs/mobx/issues/494
        try {
          expect(store.loginResult).toEqual(response);
          done();
        } catch (e) {
          done.fail(e);
        }
      }
    );
  });

  it('logout triggers change in userStore', function(done) {
    UserActions.logout(payload, 'token', store);

    when(
      () => store.logoutResult,
      () => {
        try {
          expect(store.logoutResult).toEqual(response);
          done();
        } catch (e) {
          done.fail(e);
        }
      }
    );
  });

  it('signup triggers change in userStore', function(done) {
    UserActions.signup(payload, store);

    when(
      () => store.signupResult,
      () => {
        try {
          expect(store.signupResult).toEqual(response);
          done();
        } catch (e) {
          done.fail(e);
        }
      }
    );
  });

  it('update triggers change in userStore', function(done) {
    UserActions.update(userID, payload, 'token', store);

    when(
      () => store.profileUpdateResult,
      () => {
        try {
          expect(store.profileUpdateResult).toEqual(response);
          done();
        } catch (e) {
          done.fail(e);
        }
      }
    );
  });

  it('getSession triggers change in userStore', function(done) {
    UserActions.getSession('token', store);

    when(
      () => store.session,
      () => {
        try {
          expect(store.session).toEqual(response);
          done();
        } catch (e) {
          done.fail(e);
        }
      }
    );
  });

  it('fetchAllUsers triggers change in userStore', function(done) {
    UserActions.fetchAllUsers('token', store);

    when(
      () => store.users,
      () => {
        try {
          expect(store.users).toEqual(response);
          done();
        } catch (e) {
          done.fail(e);
        }
      }
    );
  });
});
