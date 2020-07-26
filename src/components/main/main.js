import React from 'react';
import { connect } from 'react-redux';
// import { MainWrap } from './style';
import { currentUser } from '../../store/actions';
// import ArticleList from '../articles/ArticleList';
// import { ArticleCreateNew } from '../articles/ArticleCreateNew';
// import { ArticleEdit } from '../articles/ArticleEdit';
import { ArticleViewer } from '../articles/ArticleViewer';

class Main extends React.Component {
  render() {
    return (<ArticleViewer />);
  }
}

const mapStateToProps = (state) => state;
const mapDispathToProps = (dispatch) => ({
  checkCurrentUser: (value) => dispatch(currentUser(value)),
});

export default connect(mapStateToProps, mapDispathToProps)(Main);
