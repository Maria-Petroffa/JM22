import React from 'react';
import { connect } from 'react-redux';
import { Pagination, Spin } from 'antd';
import { uniqueId } from 'lodash';
import { listArticlesRequest } from '../../services/services';
import ArticleCard from './ArticleCard';
import { PaginatorWrap, SpinnerWrap } from './style';

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
    this.getArticleList(offset);
  }

  spinner = () => <SpinnerWrap><Spin tip="Loading..." /></SpinnerWrap> ;

  getArticleList = async (offset) => {
    this.setState({ articles: [] });
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
      if (err.name === 'Error') { this.getArticleList(); }
    }
  }

  onChangePgination = (currentPage) => {
    this.setState({ currentPage });
    const offset = (currentPage - 1) * 10;
    this.getArticleList(offset);
  }

  onChangeFavorites = () => {
    const { currentPage } = this.state;
    const offset = (currentPage - 1) * 10;
    this.getArticleList(offset);
  }

renderArticleList = () => {
  const { articles } = this.state;
  return articles.map((el) => <ArticleCard articles={el} key={uniqueId()} onChangeFavorites={this.onChangeFavorites} />);
}

renderPaginator = () => {
  const { articlesCount, currentPage } = this.state;

  return (
    <PaginatorWrap>
      <Pagination
        current={currentPage}
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
  if (this.state.articles.length === 0) { return this.spinner(); }
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
