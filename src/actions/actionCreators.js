import request from 'superagent';

import AppConstants from '../constants/AppConstants';
import BaseActions from './BaseActions';

export const fetchUsersStart = () => ({
  type: AppConstants.FETCH_USERS_START,
});

export const fetchUsersFailure = (error) => ({
  type: AppConstants.FETCH_USERS_ERROR,
  payload: {
    error,
  },
});

export const fetchUsersSuccess = (users) => ({
  type: AppConstants.FETCH_USERS_SUCCESS,
  payload: { users },
});

export const signupStart = () => ({ type: AppConstants.SIGNUP_START });

export const loginStart = () => ({ type: AppConstants.LOGIN_START });

export const signupFailure = (error) => ({
  type: AppConstants.SIGNUP_ERROR,
  payload: { error },
});

export const signupSuccess = (signupResult) => ({
  type: AppConstants.SIGNUP_SUCCESS,
  payload: { signupResult },
});

export const loginFailure = (error) => ({
  type: AppConstants.LOGIN_ERROR,
  payload: { error },
});

export const loginSuccess = (loginResult) => ({
  type: AppConstants.LOGIN_SUCCESS,
  payload: { loginResult },
});

export const fetchUsers = (token) => (dispatch) => {
  dispatch(fetchUsersStart());

  request
    .get(`${BaseActions.BASE_URL}/api/users`)
    .set('x-access-token', token)
    .end((err, result) => {
      if (err) {
        dispatch(fetchUsersFailure(err));
      } else {
        dispatch(fetchUsersSuccess(result.body));
      }
    });
};

export const initiateSignup = (user) => (dispatch) => {
  dispatch(signupStart());

  request
    .post(`${BaseActions.BASE_URL}/api/users`)
    .send(user)
    .end((err, result) => {
      if (err) {
        dispatch(signupFailure(err));
      } else {
        dispatch(signupSuccess(result.body));
      }
    });
};

export const initiateLogin = (payload) => (dispatch) => {
  dispatch(loginStart());

  request
    .post(`${BaseActions.BASE_URL}/api/users/login`)
    .send(payload)
    .end((err, result) => {
      if (err) {
        dispatch(loginFailure(err.response.body.error));
      } else {
        dispatch(loginSuccess(result.body));
      }
    });
};
