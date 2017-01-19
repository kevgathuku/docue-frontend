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

  beforeEach(function() {
    nock(BaseActions.BASE_URL)
      .post('/api/users/login')
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
});
