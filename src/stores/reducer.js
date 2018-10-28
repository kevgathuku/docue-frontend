import AppConstants from '../constants/AppConstants';

const initialState = {
  users: null,
  usersError: null,
  session: null,
  loginResult: null,
  logoutResult: null,
  signupResult: null,
  profileUpdateResult: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AppConstants.FETCH_USERS_SUCCESS:
      return Object.assign({}, state, {
        users: action.payload.users,
      });
    case AppConstants.FETCH_USERS_ERROR:
      return Object.assign({}, state, {
        usersError: action.payload.error,
      });
    default:
      return state;
  }
};

export default reducer;
