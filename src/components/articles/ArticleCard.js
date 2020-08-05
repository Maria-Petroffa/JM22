import React from 'react';
import { Rate, Tag } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { parseISO, intervalToDuration, formatDuration } from 'date-fns';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  ArticleWrap, ArticleContentFavoritesCount, ArticleCreatedCount, ArticleAutorFoto, ArticleAutorDescription, ArticleAutorName, ArticleContentFavorites, ArticleContent, ArticleAutor, ArticleContentTitle, ArticleContentTag, ArticleContentDescription,
} from './style';
import {
  favoriteArticleRequest, unfavoriteArticleRequest,
} from '../../services/services';

class ArticleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.articles;
  }

  createdData = (createdAt) => {
    const start = parseISO(createdAt);
    const end = new Date();
    const { days, hours, minutes } = intervalToDuration({ start, end });

    return `created ${formatDuration({ days, hours, minutes })} ago`;
  }

  favoriteArticleChange = () => {
    const { slug, favorited } = this.state;
    const { onChangeFavorites } = this.props;
    const resp = async (func) => (
      await func(slug)
        .then((res) => this.setState(res.data))
        .then(() => onChangeFavorites()));
    return favorited ? resp(unfavoriteArticleRequest) : resp(favoriteArticleRequest);
  }

  renderArticleFavorites = () => {
    const { currentUser } = this.props;
    const {
      favoritesCount, favorited,
    } = this.state;

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
    const { articles } = this.props;
    const {
      title, tagList, description, author, createdAt, slug,
    } = articles;
    return (
      <ArticleWrap id={slug}>
        <ArticleContent>
          <ArticleContentTitle>{title}</ArticleContentTitle>
          {this.renderArticleFavorites()}
          <ArticleContentTag>
            {tagList.map((el) => <Tag key={el} color="default">{el}</Tag>)}
          </ArticleContentTag>
          <Link to={`/articles/${slug}`}>
            <ArticleContentDescription>{description}</ArticleContentDescription>
            <ArticleCreatedCount>{this.createdData(createdAt)}</ArticleCreatedCount>
          </Link>
        </ArticleContent>
        <ArticleAutor>
          <ArticleAutorDescription>
            <ArticleAutorName>{author.username}</ArticleAutorName>
          </ArticleAutorDescription>
          <ArticleAutorFoto src={author.image} />
        </ArticleAutor>
      </ArticleWrap>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(ArticleCard);
