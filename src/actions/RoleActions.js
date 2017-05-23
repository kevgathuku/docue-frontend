import AppConstants from '../constants/AppConstants';
import BaseActions from './BaseActions';

export default {
  create: (data, token) => {
    BaseActions.post('/api/roles', data, AppConstants.CREATE_ROLE, token);
  },

  getRoles: token => {
    BaseActions.get('/api/roles', AppConstants.GET_ROLES, token);
  }
};
