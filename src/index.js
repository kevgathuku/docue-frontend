import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './stores/reducer';
import * as serviceWorker from './serviceWorker';

import Auth from './components/Auth/Auth.jsx';
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

import 'normalize.css/normalize.css';
import './styles/style.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <DefaultLayout exact path="/" component={Landing} />
        <DefaultLayout path="/auth" component={Auth} />
        <DefaultLayout exact path="/admin" component={Admin} />
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
