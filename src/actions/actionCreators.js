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

export const getSessionStart = () => ({ type: AppConstants.GET_SESSION_START });

export const profileUpdateStart = () => ({
  type: AppConstants.PROFILE_UPDATE_START,
});

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

export const logoutFailure = (error) => ({
  type: AppConstants.LOGOUT_ERROR,
  payload: { error },
});

export const logoutSuccess = (logoutResult) => ({
  type: AppConstants.LOGOUT_SUCCESS,
  payload: { logoutResult },
});

export const getSessionFailure = (error) => ({
  type: AppConstants.GET_SESSION_ERROR,
  payload: { error },
});

export const getSessionSuccess = (session) => ({
  type: AppConstants.GET_SESSION_SUCCESS,
  payload: { session },
});

export const profileUpdateFailure = (error) => ({
  type: AppConstants.PROFILE_UPDATE_ERROR,
  payload: { error },
});

export const profileUpdateSuccess = (user) => ({
  type: AppConstants.PROFILE_UPDATE_SUCCESS,
  payload: { user },
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

export const initiateLogout = (token) => (dispatch) => {
  request
    .post(`${BaseActions.BASE_URL}/api/users/logout`)
    .set('x-access-token', token)
    .send({})
    .end((err, result) => {
      if (err) {
        dispatch(logoutFailure(err.response.body.error));
      } else {
        dispatch(logoutSuccess(result.body));
      }
    });
};

export const initiateUpdateProfile = (userId, payload, token) => (dispatch) => {
  dispatch(profileUpdateStart());

  request
    .put(`${BaseActions.BASE_URL}/api/users/${userId}`)
    .set('x-access-token', token)
    .send(payload)
    .end((err, result) => {
      if (err) {
        dispatch(profileUpdateFailure(err.response.body.error));
      } else {
        dispatch(profileUpdateSuccess(result.body));
      }
    });
};

export const getSession = (token) => (dispatch) => {
  dispatch(getSessionStart());

  request
    .get(`${BaseActions.BASE_URL}/api/users/session`)
    .set('x-access-token', token)
    .end((err, result) => {
      if (err) {
        dispatch(getSessionFailure(err.response.body.error));
      } else {
        dispatch(getSessionSuccess(result.body));
      }
    });
};
