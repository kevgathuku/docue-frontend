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
      profileUpdateResult: null,

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

      setProfileUpdateResult: action(function(profileUpdateResult) {
        this.profileUpdateResult = profileUpdateResult;
      }),

    });
  }
}

export default new UserStore();
