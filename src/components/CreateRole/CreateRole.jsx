import React from 'react';
import Elm from 'react-elm-components';
import { browserHistory } from 'react-router';
import RoleActions from '../../actions/RoleActions';
import RoleStore from '../../stores/RoleStore';
import { CreateRole } from '../CreateRole.elm';

const token = localStorage.getItem('user');

export default class Main extends React.Component {
  componentDidMount() {
    RoleStore.addChangeListener(this.handleRoleCreateResult);
  }

  componentWillUnmount() {
    RoleStore.removeChangeListener(this.handleRoleCreateResult);
  }

  flags = {
    token: token
  };

  setupPorts(ports) {
    ports.handleSubmit.subscribe(function(title) {
      if (!title) {
        return window.Materialize.toast(
          'Please Provide a Role Title',
          2000,
          'error-toast'
        );
      }
      let role = {
        title: title
      };
      RoleActions.create(role, token);
    });
  }

  handleRoleCreateResult = () => {
    let data = RoleStore.getCreatedRole();
    if (data) {
      if (data.error) {
        window.Materialize.toast(data.error, 2000, 'error-toast');
      } else {
        window.Materialize.toast(
          'Role created successfully!',
          2000,
          'success-toast'
        );
        browserHistory.push('/admin/roles');
      }
    }
  };

  render() {
    return <Elm src={CreateRole} flags={this.flags} ports={this.setupPorts} />;
  }
}
