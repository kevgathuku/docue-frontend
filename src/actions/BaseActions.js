/* @flow */
import AppDispatcher from '../dispatcher/AppDispatcher';
import request from 'superagent';

let BASE_URL;
if (process.env.NODE_ENV === 'development') {
  console.log('Running in DEV');
  BASE_URL = 'http://localhost:8000';
} else {
  BASE_URL = 'https://docue.herokuapp.com';
}

export default {
  BASE_URL: BASE_URL,
  get: (url: string, actionType: string, token: ?string = null) => {
    request
      .get(BASE_URL + url)
      .set('x-access-token', token)
      .end((err, result) => {
        AppDispatcher.dispatch({
          actionType: actionType,
          data: result.body
        });
      });
  },

  delete: (url: string, actionType: string, token: ?string = null) => {
    request
      .delete(BASE_URL + url)
      .set('x-access-token', token)
      .end((err, result) => {
        AppDispatcher.dispatch({
          actionType: actionType,
          data: result.body,
          statusCode: result.statusCode
        });
      });
  },

  put: (
    url: string,
    data: Object,
    actionType: string,
    token: ?string = null
  ) => {
    request
      .put(BASE_URL + url)
      .set('x-access-token', token)
      .send(data)
      .end((err, result) => {
        AppDispatcher.dispatch({
          actionType: actionType,
          data: result.body,
          statusCode: result.statusCode
        });
      });
  },

  post: (
    url: string,
    data: Object,
    actionType: string,
    token: ?string = null
  ) => {
    request
      .post(BASE_URL + url)
      .set('x-access-token', token)
      .send(data)
      .end((err, result) => {
        AppDispatcher.dispatch({
          actionType: actionType,
          data: result.body
        });
      });
  }
};
