import React from 'react';

import {
  Redirect, Route, Switch, BrowserRouter as Router,
} from 'react-router-dom';
import { connect } from 'react-redux';
import SignIn from './form/signIn';
import SignUp from './form/signUp';
import Main from './main/main';
import { Content } from './style';
import HeaderPage from './header/header';
import { signUpPage, signInPage, mainPage } from '../services/routs';
import { currentUser } from '../store/actions';
import { getUserToken } from '../utils/helpers';

const PrivateRoute = ({ children, redirect, redirectTo }) => (
  <Route
    render={() => (redirect ? (children) : (<Redirect to={redirectTo} />))}
  />
);

class App extends React.Component {
  componentDidMount() {
    if (getUserToken() !== null) {
      this.props.checkCurrentUser();
    }
  }

  isAuthenticated = () => {
    const { currentUser } = this.props;
    if (currentUser === 0) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <Router>
        <Content>
          <HeaderPage />
          <Switch>
            <PrivateRoute exact path={mainPage} redirectTo={signInPage} redirect={this.isAuthenticated()}>
              <Main />
            </PrivateRoute>
            <PrivateRoute exact path={signInPage} redirectTo={mainPage} redirect={!this.isAuthenticated()}>
              <SignIn />
            </PrivateRoute>
            <PrivateRoute exact path={signUpPage} redirectTo={mainPage} redirect={!this.isAuthenticated()}>
              <SignUp />
            </PrivateRoute>
            <Redirect from="/" to={mainPage} />
          </Switch>
        </Content>
      </Router>
    );
  }
}

const mapStateToProps = (state) => state;
const mapDispathToProps = (dispatch) => ({
  checkCurrentUser: (value) => dispatch(currentUser(value)),
});

export default connect(mapStateToProps, mapDispathToProps)(App);
