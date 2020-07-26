import React from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import { uniqueId } from 'lodash';
import { currentUser } from '../../store/actions';
import { listArticlesRequest } from '../../services/services';
import { ArticleCard } from './ArticleCard';

// / список всех статей. Выводится заголовок заметки, имя автора, дата в формате "создана N дней/часов/минут назад" (см date-fns), список тегов и количество лайков. Можно поставить лайк или убрать. При клике на блок - переход на страницу статьи.

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // articles: {
      //   author: {
      //     username: 'John Doe', bio: null, image: 'https://static.productionready.io/images/smiley-cyrus.jpg', following: false,
      //   },
      //   body: 'Ви́рус (лат. virus — яд) — неклеточный инфекционный агент, который может воспроизводиться только внутри клеток[комм. 2]. Вирусы поражают все типы организмов, от растений и животных до бактерий и архей[3] (вирусы бактерий обычно называют бактериофагами). Обнаружены также вирусы, способные реплицироваться только в присутствии других вирусов (вирусы-сателлиты).',
      //   createdAt: '2008-06-24T12:52:14.860Z',
      //   description: 'Вирусы',
      //   favorited: false,
      //   favoritesCount: 38,
      //   slug: 'this-is-the-field-for-the-article-title-o0ijk9',
      //   tagList: ['вирус', 'бактерия', 'клетка'],
      //   title: 'Все про вирусы',
      //   updatedAt: '2020-07-24T12:52:14.860Z',
      // },
    };
  }

  async componentDidMount() {
    const articlesList = [];
    const createTicketList = (list) => {
      this.setState({ articles: list });
    };

    async function response() {
      try {
        const responseArticles = await listArticlesRequest();
        const { articles, articlesCount } = responseArticles.data;
        await articlesList.push(...articles);
        if (articlesList.length >= articlesCount) {
          createTicketList(articlesList);
          return;
        }
        response();
      } catch (err) {
        if (err.name === 'Error') { response(); }
      }
    }
    response();
  }

  render() {
    const { articles } = this.state;

    if (articles !== undefined) {
      return (
        <>
          {articles.map((el) => (<ArticleCard key={uniqueId()} articles={el} />))}

          <Pagination size="small" total={50} />
        </>
      );
    }
    return null;
  }

  // render() {
  //   const { articles } = this.state;
  //   console.log(articles);

  //   return (
  //     <>
  //       <ArticleCard articles={articles} />
  //       <Pagination size="small" total={50} />
  //     </>
  //   );
  // }
}

const mapStateToProps = (state) => state;
const mapDispathToProps = (dispatch) => ({
  checkCurrentUser: (value) => dispatch(currentUser(value)),
});

export default connect(mapStateToProps, mapDispathToProps)(ArticleList);
