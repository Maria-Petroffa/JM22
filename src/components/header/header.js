import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Header, HeaderItem, HeaderSignIn, LogOutButton, CreateArticleButton, SingInButton, SingUpButton,
} from './style';

import {
  logOutUser,
} from '../../store/actions';
import { signInPage, addPage, signUpPage } from '../../services/routs';
import { deleteUserToken } from '../../utils/helpers';

class HeaderPage extends React.Component {
  isSignInHeader = () => {
    const { currentUser, logOut } = this.props;
    if (currentUser !== 0) {
      return (
        <HeaderItem>
          <CreateArticleButton className="header-create-article">
            <Link to={addPage} style={{ color: '#52C41A' }}>
              Create article
            </Link>
          </CreateArticleButton>
          <HeaderSignIn>{currentUser.username}</HeaderSignIn>
          <LogOutButton>
            <Link onClick={logOut} to={signInPage} style={{ color: '#4d4d4d' }}>
              Log Out
            </Link>
          </LogOutButton>
        </HeaderItem>
      );
    }

    return (
      <HeaderItem>
        <SingInButton className="header-create-article">
          <Link to={signInPage} style={{ color: '#4d4d4d' }}>
            Sing In
          </Link>
        </SingInButton>
        <SingUpButton>
          <Link to={signUpPage} style={{ color: '#52C41A' }}>
            Sing Up
          </Link>
        </SingUpButton>
      </HeaderItem>
    );
  };

  render() {
    return (
      <Header>
        <HeaderItem>Realworld Blog</HeaderItem>
        {this.isSignInHeader()}
      </Header>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispathToProps = (dispatch) => ({
  logOut: () => {
    deleteUserToken();
    dispatch(logOutUser());
  },
});

export default connect(mapStateToProps, mapDispathToProps)(HeaderPage);
