import React from 'react';
import {
  Rate, Tag, Modal, Button, Spin,
} from 'antd';
import { HeartOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  ArticleWrap, ArticleContentFavoritesCount, ArticleContentBody, ArticleCreatedCount, ArticleAutorFoto, ArticleAutorButtons, ArticleAutorDescription, ArticleAutorName, ArticleContentFavorites, ArticleContent, ArticleAutor, ArticleContentTitle, ArticleContentTag, ArticleContentDescription,
} from './style';
import {
  getArticleViewerRequest, deleteArticleRequest, favoriteArticleRequest, unfavoriteArticleRequest,
} from '../../services/services';
import { mainPage } from '../../services/routs';
import { createdData } from '../../utils/helpers';

const { confirm } = Modal;
class ArticleViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  async componentDidMount() {
    await getArticleViewerRequest(this.props.match)
      .then((res) => this.setState(res.data));
  }

  spinner = () => <Spin tip="Loading..." />;

showDeleteConfirm =(el) => {
  const deletedArticle = (el) => {
    const { history } = this.props;
    deleteArticleRequest(el);
    history.replace(mainPage);
  };
  confirm({
    title: 'Are you sure to delete this article?',
    icon: <ExclamationCircleOutlined />,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      deletedArticle(el);
    },
    onCancel() {},
  });
}

favoriteArticleChange = () => {
  const { slug, favorited } = this.state.article;
  const changeFavorite = async (func) => (
    await func(slug)
      .then((res) => this.setState(res.data)));

  return favorited ? changeFavorite(unfavoriteArticleRequest) : changeFavorite(favoriteArticleRequest);
}

renderArticleButton = () => {
  const { currentUser } = this.props;
  const { article: { slug } } = this.state;
  if (currentUser === null) { return null; }
  if (currentUser.username !== this.state.article.author.username) { return null; }
  return (
    <ArticleAutorButtons>
      <Button type="dashed">
        <Link to={`/articles/${slug}/edit`}>
          Edit
        </Link>
      </Button>
      <Button onClick={() => this.showDeleteConfirm(this.state.article.slug)} type="dashed">
        Delete
      </Button>
    </ArticleAutorButtons>
  );
}

renderArticleFavorites = () => {
  const { currentUser } = this.props;
  const { favoritesCount, favorited } = this.state.article;
  const disabled = currentUser === null;
  const value = () => (favorited ? 1 : 0);

  return (
    <ArticleContentFavorites>
      <Rate disabled={disabled} value={value()} onChange={this.favoriteArticleChange} style={{ color: '#eb2f96' }} character={<HeartOutlined />} count="1" />
      <ArticleContentFavoritesCount>{favoritesCount}</ArticleContentFavoritesCount>
    </ArticleContentFavorites>
  );
}

render() {
  if (this.state === null) { return this.spinner; }

  const {
    title, tagList, description, author, createdAt, body,
  } = this.state.article;
  return (
    <ArticleWrap>
      <ArticleContent>
        <ArticleContentTitle>{title}</ArticleContentTitle>
        {this.renderArticleFavorites()}
        <ArticleContentTag>
          {tagList.map((el) => <Tag key={el} color="default">{el}</Tag>)}
        </ArticleContentTag>
        <ArticleContentDescription>{description}</ArticleContentDescription>
        <ArticleContentBody>{body}</ArticleContentBody>
        <ArticleCreatedCount>{createdData(createdAt)}</ArticleCreatedCount>
      </ArticleContent>
      <ArticleAutor>
        <ArticleAutorDescription>
          <ArticleAutorName>{author.username}</ArticleAutorName>
          <ArticleAutorFoto src={author.image} />
        </ArticleAutorDescription>
        {this.renderArticleButton()}
      </ArticleAutor>
    </ArticleWrap>
  );
}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(ArticleViewer);
