import AppConstants from '../constants/AppConstants';

const initialState = {
  users: null,
  usersError: null,
  session: {
    loggedIn: false,
  },
  sessionError: '',
  loginError: '',
  logoutResult: '',
  logoutError: '',
  signupError: null,
  profileUpdateResult: null,
  profileUpdateError: '',
  token: '',
  user: {},
  loggedIn: {},
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
      return Object.assign({}, state, { loginError: '', token, user });
    }
    case AppConstants.PROFILE_UPDATE_ERROR:
      return Object.assign({}, state, {
        profileUpdateError: action.payload.error,
      });
    case AppConstants.PROFILE_UPDATE_SUCCESS: {
      const { user: updatedUser } = action.payload;
      const users = state.users.map((user) => {
        if (user._id === updatedUser._id) {
          return updatedUser;
        } else {
          return user;
        }
      });
      return Object.assign({}, state, { profileUpdateError: '', users });
    }
    case AppConstants.LOGOUT_ERROR:
      return Object.assign({}, state, { logoutError: action.payload.error });
    case AppConstants.LOGOUT_SUCCESS: {
      const { message } = action.payload.logoutResult;
      return Object.assign({}, state, {
        logoutError: '',
        token: '',
        user: {},
        logoutResult: message,
      });
    }
    case AppConstants.GET_SESSION_ERROR:
      return Object.assign({}, state, { sessionError: action.payload.error });
    case AppConstants.GET_SESSION_SUCCESS:
      {
        const { loggedIn } = action.payload.session;

        if (loggedIn === 'false') {
          return Object.assign({}, state, {
            token: '',
            user: {},
            session: {
              loggedIn: false,
            },
          });
        }

        if (loggedIn === 'true') {
          return Object.assign({}, state, {
            session: {
              loggedIn: true,
            },
            user: action.payload.session.user,
          });
        }
      }
      break;
    default:
      return state;
  }
};

export default reducer;
