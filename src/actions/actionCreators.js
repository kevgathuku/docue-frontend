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
