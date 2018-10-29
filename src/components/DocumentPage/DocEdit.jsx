import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import DocActions from '../../actions/DocActions';
import DocStore from '../../stores/DocStore';
import { handleFieldChange } from '../../utils/componentHelpers';

class DocEdit extends React.Component {
  static propTypes = {
    doc: PropTypes.object,
    roles: PropTypes.arrayOf(PropTypes.object),
    updateDoc: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      token: localStorage.getItem('user'),
      title: this.props.doc.title,
      content: this.props.doc.content,
      role: this.props.doc.role,
      options: [],
    };
  }

  componentDidMount() {
    DocStore.addChangeListener(this.handleEditResult, 'editDoc');
  }

  componentWillUnmount() {
    DocStore.removeChangeListener(this.handleEditResult, 'editDoc');
  }

  handleFieldChange = (event) => {
    let stateObject = handleFieldChange(event);
    this.setState(stateObject);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let documentPayload = {
      title: this.state.title,
      content: this.state.content,
      role: this.state.role,
    };
    DocActions.editDoc(this.props.doc._id, documentPayload, this.state.token);
  };

  handleEditResult = () => {
    let result = DocStore.getDocEditResult();
    if (result && result.data._id === this.props.doc._id) {
      if (result.statusCode === 200) {
        this.props.updateDoc(result.data);
        window.Materialize.toast('Document Updated!', 4000);
      } else {
        window.Materialize.toast(result.error, 2000, 'error-toast');
      }
    }
  };

  handleSelectChange = (val) => {
    this.setState({
      role: val,
    });
  };

  render() {
    return (
      <div>
        <div className="modal-content">
          <h4 className="center-align">Edit Document</h4>
          <div className="row">
            <form className="col s12">
              <div className="input-field col s6">
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
              <div className="input-field col s6">
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
                  options={this.props.roles}
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
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <div className="container">
            <button
              className="btn modal-action modal-close waves-effect blue right"
              onClick={this.handleSubmit}
            >
              update
            </button>
            <button className="btn modal-action modal-close waves-effect red accent-2 left">
              cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DocEdit;
