import React from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import { uniqueId } from 'lodash';
import { currentUser } from '../../store/actions';
import { listArticlesRequest } from '../../services/services';
import { ArticleCard } from './ArticleCard';

// / список всех статей. Выводится заголовок заметки, имя автора, дата в формате "создана N дней/часов/минут назад" (см date-fns), список тегов и количество лайков. Можно поставить лайк или убрать. При клике на блок - переход на страницу статьи.

class ArticleList extends React.Component {
    state = {};

    async componentDidMount() {
      const articlesList = [];
      let count = 0;

      const createTicketList = (list) => {
        this.setState({ articles: list });
      };

      async function response() {
        try {
          const responseArticles = await listArticlesRequest();
          const { articles, articlesCount } = responseArticles.data;
          await articlesList.push(...articles);
          count += 1;
          if (count === 1) {
            createTicketList(articlesList);
          }
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

    onChangePgination = (el) => console.log(el)

    render() {
      console.log(this.state);

      const { articles } = this.state;

      if (articles !== undefined) {
        const paginationCount = articles.length;

        return (
          <>
            {articles.map((el) => (<ArticleCard key={uniqueId()} articles={el} />))}

            <Pagination size="small" onChange={this.onChangePgination} total={paginationCount} />
          </>
        );
      }
      return null;
    }
}

const mapStateToProps = (state) => state;
const mapDispathToProps = (dispatch) => ({
  checkCurrentUser: (value) => dispatch(currentUser(value)),
});

export default connect(mapStateToProps, mapDispathToProps)(ArticleList);
