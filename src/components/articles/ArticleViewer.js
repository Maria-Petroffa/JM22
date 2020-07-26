import React from 'react';
import {
  Rate, Tag, Modal, Button,
} from 'antd';
import { HeartOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { parseISO, intervalToDuration, formatDuration } from 'date-fns';
import {
  ArticleWrap, ArticleContentFavoritesCount, ArticleContentBody, ArticleCreatedCount, ArticleAutorFoto, ArticleAutorDescription, ArticleAutorName, ArticleContentFavorites, ArticleContent, ArticleAutor, ArticleContentTitle, ArticleContentTag, ArticleContentDescription,
} from './style';

import { getArticleRequest } from '../../services/services';

const { confirm } = Modal;

function showDeleteConfirm() {
  confirm({
    title: 'Are you sure to delete this article?',
    icon: <ExclamationCircleOutlined />,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

export class ArticleViewer extends React.Component {
  constructor(props) {
    super(props)
      .state = 0;
  }

  async componentDidMount() {
    await getArticleRequest('10-1pujsi')
      .then((res) => this.setState(res.data));
  }

createdData = (createdAt) => {
  const start = parseISO(createdAt);
  const end = new Date();

  const { days, hours, minutes } = intervalToDuration({ start, end });

  return `created ${formatDuration({ days, hours, minutes })} ago`;
}

render() {
  if (this.state === 0) { return null; }

  const { article } = this.state;
  const {
    title, favoritesCount, tagList, description, author, createdAt, body,
  } = article;
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
        <ArticleContentBody>{body}</ArticleContentBody>
        <ArticleCreatedCount>{this.createdData(createdAt)}</ArticleCreatedCount>
      </ArticleContent>
      <ArticleAutor>
        <ArticleAutorDescription>
          <ArticleAutorName>{author.username}</ArticleAutorName>
        </ArticleAutorDescription>
        <ArticleAutorFoto src={author.image} />
        <Button onClick={showDeleteConfirm} type="dashed">
          Edit
        </Button>
        <Button onClick={showDeleteConfirm} type="dashed">
          Delete
        </Button>
      </ArticleAutor>
    </ArticleWrap>
  );
}
}
