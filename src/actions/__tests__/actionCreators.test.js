import nock from 'nock';

import AppConstants from '../../constants/AppConstants';
import BaseActions from '../BaseActions';
import { fetchUsersStart } from '../actionCreators';

describe('UserActions', () => {
  let response = { status: 'OK' };
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

  it('should create a fetchUsersStart action', () => {
    const expectedAction = { type: AppConstants.FETCH_USERS_START };
    expect(fetchUsersStart()).toEqual(expectedAction);
  });
});
