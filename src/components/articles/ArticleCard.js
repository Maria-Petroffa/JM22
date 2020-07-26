import React from 'react';
import { Rate, Tag } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { parseISO, intervalToDuration, formatDuration } from 'date-fns';
import {
  ArticleWrap, ArticleContentFavoritesCount, ArticleCreatedCount, ArticleAutorFoto, ArticleAutorDescription, ArticleAutorName, ArticleContentFavorites, ArticleContent, ArticleAutor, ArticleContentTitle, ArticleContentTag, ArticleContentDescription,
} from './style';

export class ArticleCard extends React.Component {
  createdData = (createdAt) => {
    const start = parseISO(createdAt);
    const end = new Date();

    const { days, hours, minutes } = intervalToDuration({ start, end });

    return `created ${formatDuration({ days, hours, minutes })} ago`;
  }

  render() {
    const { articles } = this.props;
    const {
      title, favoritesCount, tagList, description, author, createdAt,
    } = articles;
    return (

      <ArticleWrap>
        <ArticleContent>
          <ArticleContentTitle>{title}</ArticleContentTitle>
          <ArticleContentFavorites>
            <Rate style={{ color: '#eb2f96' }} character={<HeartOutlined />} count="1" />
            <ArticleContentFavoritesCount>{favoritesCount}</ArticleContentFavoritesCount>
          </ArticleContentFavorites>
          <ArticleContentTag>
            {tagList.map((el) => <Tag key={el} color="default">{el}</Tag>)}
          </ArticleContentTag>
          <ArticleContentDescription>{description}</ArticleContentDescription>
          <ArticleCreatedCount>{this.createdData(createdAt)}</ArticleCreatedCount>
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
