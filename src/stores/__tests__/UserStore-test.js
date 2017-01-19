import userStore from '../UserStore';
import expect from 'expect';

describe('UserStore', function() {

  // Dummy placeholder test
  // Add tests when we add computed properties
  it('saves the user update result', function() {
    var userPayload = {
      data: 'Another One'
    };
    userStore.profileUpdateResult = userPayload;
    expect(userStore.profileUpdateResult).toEqual(userPayload);
  });
});
