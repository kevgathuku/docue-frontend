import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import DocActions from '../../actions/DocActions';
import DocStore from '../../stores/DocStore';
import RoleActions from '../../actions/RoleActions';
import RoleStore from '../../stores/RoleStore';
import { handleFieldChange } from '../../utils/componentHelpers';

class CreateDocument extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('user'),
      title: '',
      content: '',
      role: null,
      roles: [],
    };
  }

  componentDidMount() {
    RoleActions.getRoles(this.state.token);
    DocStore.addChangeListener(this.handleDocumentCreateResult);
    RoleStore.addChangeListener(this.handleRolesResult);
  }

  componentWillUnmount() {
    DocStore.removeChangeListener(this.handleDocumentCreateResult);
    RoleStore.removeChangeListener(this.handleRolesResult);
  }

  handleDocumentCreateResult = () => {
    let data = DocStore.getDocCreateResult();
    if (data) {
      if (data.error) {
        window.Materialize.toast(data.error, 2000, 'error-toast');
      } else {
        window.Materialize.toast(
          'Document created successfully!',
          2000,
          'success-toast'
        );
        this.props.history.push('/dashboard');
      }
    }
  };

  handleRolesResult = () => {
    const roles = RoleStore.getRoles();
    this.setState({ roles });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.role) {
      window.Materialize.toast('Please Select a Role', 2000, 'error-toast');
      return;
    }
    let documentPayload = {
      title: this.state.title,
      content: this.state.content,
      role: this.state.role.title,
    };
    DocActions.createDoc(documentPayload, this.state.token);
  };

  handleFieldChange = (event) => {
    let stateObject = handleFieldChange(event);
    this.setState(stateObject);
  };

  handleSelectChange = (val) => {
    this.setState({
      role: val,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <h2 className="header center-align">Create Document</h2>
        </div>
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="input-field col s12 m6">
              <input
                className="validate"
                id="title"
                name="title"
                value={this.state.title}
                onChange={this.handleFieldChange}
                type="text"
              />
              <label className="active" htmlFor="title">
                Title
              </label>
            </div>
            <div className="input-field col s12 m6">
              <Select
                getOptionLabel={(option) => {
                  return option.title;
                }}
                getOptionValue={(option) => {
                  return option._id;
                }}
                styles={{
                  control: (base) => ({
                    ...base,
                    color: 'white',
                    maxHeight: '50px',
                  }),
                }}
                name="role"
                options={this.state.roles}
                onChange={this.handleSelectChange}
                placeholder="Select Role"
                value={this.state.role}
                isSearchable={false}
              />
            </div>
            <div className="input-field col s12">
              <textarea
                className="validate materialize-textarea"
                id="content"
                name="content"
                value={this.state.content}
                onChange={this.handleFieldChange}
              />
              <label className="active" htmlFor="content">
                Content
              </label>
            </div>
            <div className="col s12">
              <div className="container center">
                <button
                  className="btn waves-effect header-btn blue"
                  name="action"
                  type="submit"
                >
                  {' '}
                  submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateDocument;
