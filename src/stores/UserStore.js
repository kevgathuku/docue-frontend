import { action, extendObservable } from 'mobx';

class UserStore {
  constructor() {
    extendObservable(this, {
      // Minimally defined state
      profileUpdateResult: null,

      setProfileUpdateResult: action(function(profileUpdateResult) {
        this.profileUpdateResult = profileUpdateResult;
      }),
    });
  }
}

export default new UserStore();
