import './App.css';
import React, { useEffect } from 'react';
import { Route, Switch, withRouter, Redirect, Link } from 'react-router-dom';
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
  const routesAuthenticated = (
    <Switch>
      <Route path="/" exact component={foodies} />
    </Switch>
  );
  const routesNonAuthenticated = (
    <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/signin"}>Sign in</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/signup"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="outer">
        <div className="inner">
          <Switch>
            <Route path="/" exact component={login} />
            <Route path="/signin" exact component={login} />
            <Route path="/signup" component={signup} />
          </Switch>
        </div>
      </div>
    </>
  );

  return (
    <div className="App">
      {props.isAuthenticated ? routesAuthenticated : routesNonAuthenticated}
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
