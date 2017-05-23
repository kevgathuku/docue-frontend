import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import BaseStore from './BaseStore';

let RoleStore = Object.assign({}, BaseStore, {
  createdRole: null,
  roles: null,

  setRoles(roles) {
    this.roles = roles;
    this.emitChange();
  },

  getRoles() {
    return this.roles;
  },

  setCreatedRole(role) {
    this.createdRole = role;
    this.emitChange();
  },

  getCreatedRole() {
    return this.createdRole;
  }
});

AppDispatcher.register(action => {
  switch (action.actionType) {
  case AppConstants.CREATE_ROLE:
    RoleStore.setCreatedRole(action.data);
    break;
  case AppConstants.GET_ROLES:
    RoleStore.setRoles(action.data);
    break;
  default:
    // no default action
  }
  return true;
});

export default RoleStore;
