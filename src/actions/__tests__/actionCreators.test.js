import AppConstants from '../../constants/AppConstants';
import { fetchUsersStart } from '../actionCreators';

describe('useractions', () => {
  it('should create a fetchUsersStart action', () => {
    const expectedAction = { type: AppConstants.FETCH_USERS_START };
    expect(fetchUsersStart()).toEqual(expectedAction);
  });
});
