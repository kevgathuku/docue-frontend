import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RoleActions from '../../actions/RoleActions';
import RoleStore from '../../stores/RoleStore';

import {
  fetchUsers,
  initiateUpdateProfile,
} from '../../actions/actionCreators';

class UsersAdmin extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      token: localStorage.getItem('user'),
      selectedRole: null,
      users: null,
      roles: [],
      access: {
        viewer: 'Public Documents',
        staff: 'Staff and Public Documents',
        admin: 'All Documents',
      },
      options: [],
    };
  }

  componentDidMount() {
    RoleActions.getRoles(this.state.token);
    this.props.dispatch(fetchUsers(this.state.token));
    RoleStore.addChangeListener(this.handleRolesResult);
  }

  componentWillUnmount() {
    RoleStore.removeChangeListener(this.handleRolesResult);
  }

  handleRolesResult = () => {
    let roles = RoleStore.getRoles();
    this.setState({ roles: roles });
  };

  // Prepend the user object to the function arguments through bind
  handleSelectChange = (user, val) => {
    let stateObject = (function() {
      let returnObj = {};
      returnObj[user._id] = val;
      return returnObj;
    })();
    this.setState(stateObject);
    // Update the user's Role
    // Don't update if the already existing role is the one chosen
    if (user.role._id !== val._id) {
      user.role = val;

      this.props.dispatch(
        initiateUpdateProfile(user._id, user, this.state.token)
      );
    }
  };

  render() {
    let renderUser = (user) => {
      let access = this.state[user._id]
        ? this.state[user._id].title
        : user.role.title;
      let description = this.state.access[access];
      return (
        <tr key={user._id}>
          <td>{`${user.name.first} ${user.name.last}`}</td>
          <td>{user.email}</td>
          <td>
            <Select
              getOptionLabel={(option) => {
                return option.title;
              }}
              getOptionValue={(option) => {
                return option._id;
              }}
              styles={{ control: (base) => ({ ...base, maxHeight: '50px' }) }}
              name="role"
              options={this.state.roles}
              onChange={this.handleSelectChange.bind(null, user)}
              placeholder="Select Role"
              value={user.role}
              isSearchable={false}
            />
          </td>
          <td>{description}</td>
        </tr>
      );
    };
    return (
      <div className="container">
        <div className="card-panel">
          <h2 className="header center-align">Manage Users</h2>
          <div className="row">
            <div className="col s10 offset-s1 center-align">
              <table className="centered">
                <thead>
                  <tr>
                    <th data-field="id">Name</th>
                    <th data-field="name">Email</th>
                    <th data-field="role">Role</th>
                    <th data-field="role">Access</th>
                  </tr>
                </thead>
                <tbody>{(this.props.users || []).map(renderUser)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps)(UsersAdmin);
