import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Redirect, Route, Router, browserHistory} from 'react-router';
import Auth from './components/Auth/index.jsx';
import Admin from './components/Admin/Admin.jsx';
import CreateDocument from './components/CreateDocument/index.jsx';
import CreateRole from './components/CreateRole/index.jsx';
import DocumentPage from './components/DocumentPage/index.jsx';
import Dashboard from './components/Dashboard/index.jsx';
import Landing from './components/Landing/index.jsx';
import Profile from './components/Profile/Profile.jsx';
import Main from './components/Landing/Main.jsx';
import NotFound from './components/NotFound/index.jsx';
import RolesAdmin from './components/RolesAdmin/index.jsx';
import UsersAdmin from './components/UsersAdmin/UsersAdmin.jsx';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Main} >
      <IndexRoute component={Landing} />
      <Route path="auth" component={Auth} />
      <Route path="admin" component={Admin} />
      <Route path="admin/roles" component={RolesAdmin} />
      <Route path="admin/users" component={UsersAdmin} />
      <Route path="admin/roles/create" component={CreateRole} />
      <Route path="dashboard" component={Dashboard} />
      <Route path="documents/create" component={CreateDocument} />
      <Route path="documents/:id" component={DocumentPage} />
      <Route path="profile" component={Profile} />
      <Route path="404" component={NotFound} />
      <Redirect from="*" to="404" />
    </Route>
  </Router>), document.getElementById('content'));
