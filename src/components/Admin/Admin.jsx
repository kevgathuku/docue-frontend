import React from 'react';
import {observer} from 'mobx-react';
import DocActions from '../../actions/DocActions';
import DocStore from '../../stores/DocStore';
import RoleActions from '../../actions/RoleActions';
import RoleStore from '../../stores/RoleStore';
import UserActions from '../../actions/UserActions';

const Admin = observer(class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.userStore = this.props.userStore;
    this.state = {
      docs: null,
      token: localStorage.getItem('user')
    };
  }

  componentDidMount() {
    DocActions.getDocs(this.state.token);
    RoleActions.getRoles(this.state.token);
    UserActions.fetchAllUsers(this.state.token, this.userStore);
    DocStore.addChangeListener(this.handleDocsResult, 'fetchDocs');
    RoleStore.addChangeListener(this.handleRolesResult);
  }

  componentWillUnmount() {
    DocStore.removeChangeListener(this.handleDocsResult, 'fetchDocs');
    RoleStore.removeChangeListener(this.handleRolesResult);
  }

  handleDocsResult = () => {
    let docs = DocStore.getDocs();
    if (docs && !docs.error) {
      this.setState({
        docs: docs
      });
    }
  };

  handleRolesResult = () => {
    let roles = RoleStore.getRoles();
    this.setState({roles: roles});
  };

  render() {
    return (
      <div className="container">
        <div className="card-panel">
          <h2 className="header center-align">Admin Panel</h2>
          <div className="row">
            <div className="col s4 center-align">
              <h5>Total Users</h5>
              <p id="users-count" className="flow-text">{this.userStore.users ? this.userStore.users.length : 0}</p>
              <a className="waves-effect waves-light btn blue" href="/admin/users">
                <i className="material-icons left">face</i>
                Manage Users</a>
            </div>
            <div className="col s4 center-align">
              <h5>Total Documents</h5>
              <p id="docs-count" className="flow-text">{this.state.docs ? this.state.docs.length : 0}</p>
              <a className="waves-effect waves-light btn blue" href="/dashboard">
                <i className="material-icons left">drafts</i>
                Manage Documents</a>
            </div>
            <div className="col s4 center-align">
              <h5>Total Roles</h5>
              <p id="roles-count" className="flow-text">{this.state.roles ? this.state.roles.length : 0}</p>
              <a className="waves-effect waves-light btn blue" href="/admin/roles">
                <i className="material-icons left">settings</i>
                Manage Roles</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Admin;
