import React from 'react';
import {
  Rate, Tag, Modal, Button,
} from 'antd';
import { HeartOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { parseISO, intervalToDuration, formatDuration } from 'date-fns';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  ArticleWrap, ArticleContentFavoritesCount, ArticleContentBody, ArticleCreatedCount, ArticleAutorFoto, ArticleAutorButtons, ArticleAutorDescription, ArticleAutorName, ArticleContentFavorites, ArticleContent, ArticleAutor, ArticleContentTitle, ArticleContentTag, ArticleContentDescription,
} from './style';
import {
  getArticleViewerRequest, deleteArticleRequest, favoriteArticleRequest, unfavoriteArticleRequest,
} from '../../services/services';

const { confirm } = Modal;
class ArticleViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = 0;
  }

  async componentDidMount() {
    await getArticleViewerRequest(this.props.match)
      .then((res) => this.setState(res.data));
  }

showDeleteConfirm =(el) => {
  const deletedArticle = (el) => {
    const { history: { push } } = this.props;
    deleteArticleRequest(el);
    push('/');
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
    onCancel() {
      console.log('Cancel');
    },
  });
}

showEditeConfirm =() => {
  this.props.history.push(`/articles/${this.state.article.slug}/edit`);
}

createdData = (createdAt) => {
  const start = parseISO(createdAt);
  const end = new Date();
  const { days, hours, minutes } = intervalToDuration({ start, end });

  return `created ${formatDuration({ days, hours, minutes })} ago`;
}

favoriteArticleChange = () => {
  const { slug, favorited } = this.state.article;
  const resp = async (func) => (
    await func(slug)
      .then((res) => this.setState(res.data)));

  return favorited ? resp(unfavoriteArticleRequest) : resp(favoriteArticleRequest);
}

renderArticleButton = () => {
  const { currentUser } = this.props;
  const { article: { slug } } = this.state;
  if (currentUser === 0) { return null; }
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
  const { article } = this.state;
  const {
    favoritesCount, favorited,
  } = article;

  const disabled = currentUser === 0;
  const value = () => (favorited ? 1 : 0);

  return (
    <ArticleContentFavorites>
      <Rate disabled={disabled} value={value()} onChange={this.favoriteArticleChange} style={{ color: '#eb2f96' }} character={<HeartOutlined />} count="1" />
      <ArticleContentFavoritesCount>{favoritesCount}</ArticleContentFavoritesCount>
    </ArticleContentFavorites>
  );
}

render() {
  if (this.state === 0) { return null; }
  console.log(this.state);

  const { article } = this.state;
  const {
    title, tagList, description, author, createdAt, body,
  } = article;
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
        <ArticleCreatedCount>{this.createdData(createdAt)}</ArticleCreatedCount>
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
