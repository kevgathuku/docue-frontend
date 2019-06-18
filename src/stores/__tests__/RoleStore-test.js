import AppDispatcher from '../../dispatcher/AppDispatcher';
import RoleStore from '../RoleStore';
import constants from '../../constants/AppConstants';
import sinon from 'sinon';

describe('RoleStore', function() {
  var registerSpy;

  beforeAll(function() {
    // Don't emit the change in the tests
    sinon.stub(RoleStore, 'emitChange', function() {
      return true;
    });
    sinon.spy(AppDispatcher, 'dispatch');
    registerSpy = sinon.stub(AppDispatcher, 'register');
    registerSpy.onFirstCall().returnsArg(0);
  });

  afterAll(function() {
    AppDispatcher.dispatch.restore();
    registerSpy.restore();
  });

  it('adds all fetched roles', function() {
    sinon.spy(RoleStore, 'setRoles');
    var rolesPayload = {
      actionType: constants.GET_ROLES,
      data: 'Another One',
    };
    AppDispatcher.dispatch(rolesPayload);
    expect(RoleStore.setRoles.called).toBe(true);
    const roles = RoleStore.getRoles();
    expect(roles).toBe(rolesPayload.data);
  });

  it('adds a created role', function() {
    sinon.spy(RoleStore, 'setCreatedRole');
    var rolePayload = {
      actionType: constants.CREATE_ROLE,
      data: 'Another One',
    };
    AppDispatcher.dispatch(rolePayload);
    expect(RoleStore.setCreatedRole.called).toBe(true);
    const roles = RoleStore.getCreatedRole();
    expect(roles).toBe(rolePayload.data);
  });
});
