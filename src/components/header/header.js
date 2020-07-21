import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Header, HeaderItem, HeaderSignIn, HeaderSignUp,
} from './style';

import {
  logOutUser,
} from '../../store/actions';
import { signInPage } from '../../services/routs';
import { deleteUserToken } from '../../utils/helpers';

class HeaderPage extends React.Component {
  signInHeader = () => {
    const { currentUser, logOut } = this.props;
    if (currentUser !== 0) {
      return (
        <HeaderItem>
          <HeaderSignIn>{currentUser.username}</HeaderSignIn>
          <HeaderSignUp>
            <Link onClick={logOut} to={signInPage}>
              Log Out
            </Link>
          </HeaderSignUp>
        </HeaderItem>
      );
    }
    return null;
  };

  render() {
    return (
      <Header>
        <HeaderItem>Realworld Blog</HeaderItem>
        {this.signInHeader()}
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
