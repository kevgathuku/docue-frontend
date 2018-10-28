import { action, extendObservable } from 'mobx';

class UserStore {
  constructor() {
    extendObservable(this, {
      // Minimally defined state
      session: null,
      loginResult: null,
      logoutResult: null,
      signupResult: null,
      profileUpdateResult: null,

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
