import React from 'react';

import {
  Redirect, Route, Switch, BrowserRouter as Router,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import SignIn from './form/signIn';
import SignUp from './form/signUp';
import Main from './main/main';
// import ArticleList from './articles/ArticleList';
import { Content } from './style';
import HeaderPage from './header/header';
import {
  signUpPage, signInPage, mainPage, addPage, viwerPage, editPage,
} from '../services/routs';
import { currentUser } from '../store/actions';
import { getUserToken } from '../utils/helpers';
import { ArticleCreateNew } from './form/ArticleCreateNew';
import { ArticleEdit } from './form/ArticleEdit';
import ArticleViewer from './articles/ArticleViewer';

const customHistory = createBrowserHistory();
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
      <Router history={customHistory}>
        <Content>
          <HeaderPage />
          <Switch>
            <Route exact path={mainPage} render={({ history }) => <Main history={history} />} />
            <PrivateRoute exact path={signInPage} redirectTo={mainPage} redirect={!this.isAuthenticated()}>
              <SignIn />
            </PrivateRoute>
            <PrivateRoute exact path={signUpPage} redirectTo={mainPage} redirect={!this.isAuthenticated()}>
              <SignUp />
            </PrivateRoute>
            <PrivateRoute exact path={addPage} redirectTo={signInPage} redirect={this.isAuthenticated()}>
              <ArticleCreateNew history={customHistory} />
            </PrivateRoute>
            <Route path={editPage} render={({ match, history }) => <ArticleEdit match={match.params.slug} history={history} />} />
            <Route path={viwerPage} render={({ match, history }) => <ArticleViewer match={match.params.slug} history={history} />} />
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
