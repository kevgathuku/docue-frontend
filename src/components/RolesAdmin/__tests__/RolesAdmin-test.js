import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import RolesAdmin from '../RolesAdmin.jsx';
import RoleActions from '../../../actions/RoleActions';

// TODO: Remove the skip when refactoring tests
describe.skip('RolesAdmin', function() {
  beforeEach(function() {
    sinon.stub(RoleActions, 'getRoles').returns(true);
  });

  afterEach(function() {
    RoleActions.getRoles.restore();
  });

  describe('Component Rendering', function() {
    it('renders the correct component', function() {
      expect(shallow(<RolesAdmin />).is('.container')).toEqual(true);
      expect(shallow(<RolesAdmin />).find('.fixed-action-btn').length).toEqual(
        1
      );
      expect(shallow(<RolesAdmin />).text()).toMatch(/Manage Roles/);
    });

    it('calls componentDidMount', () => {
      sinon.spy(RolesAdmin.prototype, 'componentDidMount');
      mount(<RolesAdmin />); // Mount the component
      expect(RolesAdmin.prototype.componentDidMount.called).toBe(true);
      RolesAdmin.prototype.componentDidMount.restore();
    });

    it('calls componentWillUnmount', () => {
      sinon.spy(RolesAdmin.prototype, 'componentWillUnmount');
      let rolesAdmin = mount(<RolesAdmin />); // Mount the component
      rolesAdmin.unmount();
      expect(RolesAdmin.prototype.componentWillUnmount.calledOnce).toBe(true);
      RolesAdmin.prototype.componentWillUnmount.restore();
    });
  });
});
