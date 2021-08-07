import './App.css';
import React, { useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import login from './Containers/login';
import signup from './Containers/signup';
import foodies from './Containers/foodies';

const App = (props) => {
  const { onTryAutoSignup } = props;
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/" exact component={login} />
      <Route path="/signup" component={signup} />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (<Switch>  <Route path="/" exact component={foodies} /></Switch>);
  } return (
    <div className="App">
      {routes}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
