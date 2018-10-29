import AppConstants from '../constants/AppConstants';

const initialState = {
  users: null,
  usersError: null,
  session: null,
  loginError: '',
  logoutResult: null,
  signupError: null,
  profileUpdateResult: null,
  token: '',
  user: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AppConstants.FETCH_USERS_SUCCESS:
      return Object.assign({}, state, { users: action.payload.users });
    case AppConstants.FETCH_USERS_ERROR:
      return Object.assign({}, state, { usersError: action.payload.error });
    case AppConstants.SIGNUP_ERROR:
      return Object.assign({}, state, { signupError: action.payload.error });
    case AppConstants.SIGNUP_SUCCESS:
      const { token, user } = action.payload.signupResult;
      return Object.assign({}, state, { token, user });
    case AppConstants.LOGIN_ERROR:
      return Object.assign({}, state, { loginError: action.payload.error });
    case AppConstants.LOGIN_SUCCESS: {
      const { token, user } = action.payload.loginResult;
      return Object.assign({}, state, {
        loginError: '',
        token,
        user,
      });
    }
    default:
      return state;
  }
};

export default reducer;
