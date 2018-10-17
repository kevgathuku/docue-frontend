import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
} from 'react-router-dom';
import Auth from './components/Auth/index.jsx';
import Admin from './components/Admin/Admin.jsx';
import CreateDocument from './components/CreateDocument/index.jsx';
import CreateRole from './components/CreateRole/CreateRole.jsx';
import DocumentPage from './components/DocumentPage/index.jsx';
import Dashboard from './components/Dashboard/index.jsx';
import Landing from './components/Landing/Landing.jsx';
import Profile from './components/Profile/Profile.jsx';
import { DefaultLayout } from './components/Landing/Main.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import RolesAdmin from './components/RolesAdmin/RolesAdmin.jsx';
import UsersAdmin from './components/UsersAdmin/UsersAdmin.jsx';
import Provider from './components/Landing/Provider';
import userStore from './stores/UserStore';

import 'normalize.css/normalize.css';
import 'react-select/dist/react-select.css';
import './styles/style.css';

ReactDOM.render(
  <Provider userStore={userStore}>
    <Router>
      <Switch>
        <DefaultLayout exact path="/" component={Landing} />
        <DefaultLayout path="/auth" component={Auth} />
        <DefaultLayout path="/admin" component={Admin} />
        <DefaultLayout path="/admin/roles" component={RolesAdmin} />
        <DefaultLayout path="/admin/users" component={UsersAdmin} />
        <DefaultLayout path="/admin/roles/create" component={CreateRole} />
        <DefaultLayout path="/dashboard" component={Dashboard} />
        <DefaultLayout path="/documents/create" component={CreateDocument} />
        <DefaultLayout path="/documents/:id" component={DocumentPage} />
        <DefaultLayout path="/profile" component={Profile} />
        <DefaultLayout path="/404" component={NotFound} />
        <Redirect path="*" to="404" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('content')
);
