import React from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import { uniqueId } from 'lodash';
import { listArticlesRequest } from '../../services/services';
import ArticleCard from './ArticleCard';
import { PaginatorWrap } from './style';

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      articles: [],
    };
  }

  async componentDidMount() {
    const offset = (this.state.currentPage - 1) * 10;
    this.response(offset);
  }

  response = async (offset) => {
    const createArticleList = (list) => {
      this.setState({ articles: list });
    };

    const createArticleCounnt = (articlesCount) => {
      this.setState({ articlesCount });
    };
    try {
      await listArticlesRequest(offset)
        .then(({ data: { articles, articlesCount } }) => {
          createArticleCounnt(articlesCount);
          createArticleList(articles);
        });
    } catch (err) {
      if (err.name === 'Error') { this.response(); }
    }
  }

  onChangePgination = (currentPage) => {
    this.setState({ currentPage });
    const offset = (currentPage - 1) * 10;
    this.response(offset);
  }

  onChangeFavorites = () => {
    const { currentPage } = this.state;
    const offset = (currentPage - 1) * 10;
    this.response(offset);
  }

renderArticleList = () => {
  const { articles } = this.state;
  return articles.map((el) => <ArticleCard articles={el} key={uniqueId()} onChangeFavorites={this.onChangeFavorites} />);
}

renderPaginator = () => {
  const { articlesCount } = this.state;

  return (
    <PaginatorWrap>
      <Pagination
        showSizeChanger={false}
        pageSize="10"
        size="small"
        onChange={this.onChangePgination}
        total={articlesCount}
      />
    </PaginatorWrap>
  );
}

render() {
  return (
    <>
      {this.renderArticleList()}
      {this.renderPaginator()}
    </>
  );
}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(ArticleList);
