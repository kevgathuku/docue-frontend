import { action, extendObservable } from 'mobx';

class UserStore {
  constructor() {
    extendObservable(this, {
      // Minimally defined state
      session: null,
      profileUpdateResult: null,

      setSession: action(function(session) {
        this.session = session;
      }),

      setProfileUpdateResult: action(function(profileUpdateResult) {
        this.profileUpdateResult = profileUpdateResult;
      }),
    });
  }
}

export default new UserStore();
