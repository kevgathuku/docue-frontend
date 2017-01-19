import request from 'superagent';

import AppConstants from '../constants/AppConstants';
import BaseActions from './BaseActions';

export default {
  login: (user, store) => {
    request
      .post(`${BaseActions.BASE_URL}/api/users/login`)
      .send(user)
      .end((err, result) => {
        store.setLoginResult(result.body);
      });
  },

  logout: (data, store, token) => {
    request
      .post(`${BaseActions.BASE_URL}/api/users/logout`)
      .set('x-access-token', token)
      .send(data)
      .end((err, result) => {
        store.setLogoutResult(result.body);
      });
  },

  signup: (user, store) => {
    request
      .post(`${BaseActions.BASE_URL}/api/users`)
      .send(user)
      .end((err, result) => {
        store.setSignupResult(result.body);
      });
  },

  update: (userID, user, store, token) => {
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

  fetchAllUsers: (token) => {
    BaseActions.get('/api/users', AppConstants.GET_USERS, token);
  }
};
