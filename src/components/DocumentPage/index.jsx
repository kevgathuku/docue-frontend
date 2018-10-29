import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import swal from 'sweetalert';
import DocEdit from './DocEdit.jsx';
import DocActions from '../../actions/DocActions';
import DocStore from '../../stores/DocStore';
import RoleActions from '../../actions/RoleActions';
import RoleStore from '../../stores/RoleStore';

import 'sweetalert/dist/sweetalert.css';

class DocumentPage extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      doc: null,
      parsedDate: null,
      roles: null,
      token: localStorage.getItem('user'),
      user: JSON.parse(localStorage.getItem('userInfo')),
    };
  }

  componentDidMount() {
    DocActions.fetchDoc(this.props.match.params.id, this.state.token);
    RoleActions.getRoles(this.state.token);
    DocStore.addChangeListener(this.handleDeleteResult);
    DocStore.addChangeListener(this.handleDocumentFetch, 'getDoc');
    RoleStore.addChangeListener(this.handleRolesResult);
  }

  componentWillUnmount() {
    DocStore.removeChangeListener(this.handleDeleteResult);
    DocStore.removeChangeListener(this.handleDocumentFetch, 'getDoc');
    RoleStore.removeChangeListener(this.handleRolesResult);
  }

  handleDocumentFetch = () => {
    let result = DocStore.getDoc();
    this.setState({
      doc: result,
    });
    let m = moment(new Date(this.state.doc.dateCreated));
    this.setState({
      parsedDate: m.fromNow(),
    });
  };

  handleDocumentDelete = (doc, event) => {
    // Prevent the default action for clicking on a link
    event.preventDefault();
    swal(
      {
        title: 'Are you sure?',
        text: 'You will not be able to recover this document!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, delete it!',
        closeOnConfirm: false,
      },
      () => {
        DocActions.deleteDoc(doc._id, this.state.token);
      }
    );
  };

  handleDeleteResult = () => {
    let result = DocStore.getDocDeleteResult();
    if (result && result.statusCode === 204) {
      swal('Deleted!', 'Your document has been deleted.', 'success');
      this.props.history.push('/dashboard');
    }
  };

  handleDocumentEdit = (doc, event) => {
    // Prevent the default action for clicking on a link
    event.preventDefault();
    // Get the id of the <a> tag that triggered the modal
    let id = `#${event.currentTarget.getAttribute('href')}`;
    // Open the specific modal when the link is clicked
    window.$(id).openModal();
  };

  handleRolesResult = () => {
    let roles = RoleStore.getRoles();
    this.setState({ roles: roles });
  };

  onEditUpdate = (doc) => {
    this.setState({
      doc: doc,
    });
  };

  render() {
    var owner;
    if (this.state.user && this.state.doc) {
      owner = this.state.user._id === this.state.doc.ownerId._id ? true : false;
    }
    let ownerName = this.state.doc
      ? `${this.state.doc.ownerId.name.first} ${
          this.state.doc.ownerId.name.last
        }`
      : 'User';
    let docEdit =
      this.state.doc && this.state.roles && this.state.roles.length > 1 ? (
        <div id={`edit-modal-${this.state.doc._id}`} className="modal">
          <DocEdit
            doc={this.state.doc}
            roles={this.state.roles}
            updateDoc={this.onEditUpdate}
          />
        </div>
      ) : null;
    return (
      <div className="container">
        <div className="card-panel">
          <div className="row">
            <h2 className="header center-align">
              {' '}
              {this.state.doc ? this.state.doc.title : 'title'}{' '}
            </h2>
            <h6 className="center">
              {this.state.parsedDate
                ? `${this.state.parsedDate} by ${ownerName}`
                : 'today'}
            </h6>
          </div>
          <div className="row">
            <div className="col s10 offset-s1">
              {this.state.doc ? this.state.doc.content : 'Loading...'}
            </div>
          </div>
        </div>
        {docEdit}
        <div className="fixed-action-btn" style={{ bottom: 45, right: 24 }}>
          <a className="btn-floating btn-large pink">
            <i className="material-icons">toc</i>
          </a>
          <ul>
            {/* If this user is the owner, display the delete button */
            owner ? (
              <li>
                <button
                  className="btn-floating tooltipped red"
                  data-position="left"
                  data-delay="50"
                  data-tooltip="Delete"
                  onClick={this.handleDocumentDelete.bind(this, this.state.doc)}
                >
                  <i className="material-icons">delete</i>
                </button>
              </li>
            ) : null}
            <li>
              {this.state.doc ? (
                <a
                  className="btn-floating tooltipped blue"
                  data-position="left"
                  data-delay="50"
                  data-tooltip="Edit"
                  href={`edit-modal-${this.state.doc._id}`}
                  onClick={this.handleDocumentEdit.bind(this, this.state.doc)}
                >
                  <i className="material-icons">edit</i>
                </a>
              ) : null}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default DocumentPage;
