import { action, extendObservable } from 'mobx';

class UserStore {
  constructor() {
    extendObservable(this, {
      // Minimally defined state
      session: null,
      logoutResult: null,
      profileUpdateResult: null,

      setSession: action(function(session) {
        this.session = session;
      }),

      setLogoutResult: action(function(logoutResult) {
        this.logoutResult = logoutResult;
      }),

      setProfileUpdateResult: action(function(profileUpdateResult) {
        this.profileUpdateResult = profileUpdateResult;
      }),
    });
  }
}

export default new UserStore();
