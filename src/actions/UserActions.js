import request from 'superagent';

import BaseActions from './BaseActions';

export default {
  update: (userID, user, token, store) => {
    request
      .put(BaseActions.BASE_URL + `/api/users/${userID}`)
      .set('x-access-token', token)
      .send(user)
      .end((err, result) => {
        store.setProfileUpdateResult(result.body);
      });
  },

  getSession: (token, store) => {
    request
      .get(BaseActions.BASE_URL + '/api/users/session')
      .set('x-access-token', token)
      .end((err, result) => {
        store.setSession(result.body);
      });
  },
};
