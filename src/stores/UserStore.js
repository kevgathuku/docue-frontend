import {
  action,
  extendObservable
} from 'mobx';

class UserStore {
  constructor() {
    extendObservable(this, {
      // Minimally defined state
      users: null,
      session: null,
      loginResult: null,
      logoutResult: null,
      signupResult: null,
      updateResult: null,

      setUsers: action(function(users) {
        this.users = users;
      }),

      setSession: action(function(session) {
        this.session = session;
      }),

      setLoginResult: action(function(loginResult) {
        this.loginResult = loginResult;
      }),

      setLogoutResult: action(function(logoutResult) {
        this.logoutResult = logoutResult;
      }),

      setSignupResult: action(function(signupResult) {
        this.signupResult = signupResult;
      }),

      setUpdateResult: action(function(updateResult) {
        this.updateResult = updateResult;
      }),

    });
  }
}

export default new UserStore();

// AppDispatcher.register((action) => {
//   switch (action.actionType) {
//   case AppConstants.USER_LOGIN:
//     UserStore.setLoginResult(action.data);
//     break;
//   case AppConstants.USER_LOGOUT:
//     UserStore.setLogoutResult(action.data);
//     break;
//   case AppConstants.USER_SIGNUP:
//     UserStore.setSignupResult(action.data);
//     break;
//   case AppConstants.USER_SESSION:
//     UserStore.setSession(action.data);
//     break;
//   case AppConstants.USER_UPDATE:
//     UserStore.setUpdateResult(action.data);
//     break;
//   case AppConstants.GET_USERS:
//     UserStore.setUsers(action.data);
//     break;
//   default:
//       // no default action
