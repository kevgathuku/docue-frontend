import nock from 'nock';
import BaseActions from '../BaseActions';

describe('UserActions', function() {
  let response = {
    status: 'OK',
  };
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
});
