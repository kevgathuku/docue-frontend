(() => {
  'use strict';

  let React = require('react'),
      ReactDOM = require('react-dom'),
      ReactRouter = require('react-router'),
      IndexRoute = ReactRouter.IndexRoute,
      Route = ReactRouter.Route,
      Router = ReactRouter.Router,
      browserHistory = ReactRouter.browserHistory,
      Dashboard = require('./components/Dashboard/index.jsx'),
      Landing = require('./components/Landing/index.jsx'),
      Main = require('./components/Landing/Main.jsx'),
      Auth = require('./components/Auth/index.jsx');

  ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={Main} >
        <IndexRoute component={Landing} />
        <Route path="/auth" component={Auth} />
        <Route path="/dashboard" component={Dashboard} />
      </Route>
    </Router>), document.getElementById('content'));
})();
