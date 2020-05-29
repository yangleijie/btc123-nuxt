const api = {
  category: '/api/content/selectCategory',
  list: '/api/content/findArticleByCategoryId',
  hot: '/api/content/findHostArticle',
  recommend: '/api/content/findArticleRecommend',
  recommendByArticleId: '/api/content/findArticleDetailRecommend',
  detail: '/api/content/findArticleDetailById',
  comment: '/api/content/pageArticleComment',
  addComment: '/api/content/addArticleComment',
  browseReward: '/api/content/articleBrowseAward',
  favorite: '/api/content/addArticleCollect',
  action: '/api/content/findUserArticleDetail'
};

export default axios => ({
  category(params) {
    return axios.get(api.category, { params });
  },
  list(params) {
    return axios.get(api.list, { params });
  },
  detail(params) {
    return axios.get(api.detail, { params });
  },
  hot(params) {
    return axios.get(api.hot, { params });
  },
  recommend(params) {
    return axios.get(api.recommend, { params });
  },
  recommendByArticleId(params) {
    return axios.get(api.recommendByArticleId, { params });
  },
  comment(params) {
    return axios.get(api.comment, { params });
  },
  addComment(data) {
    return axios.post(api.addComment, data);
  },
  browseReward(data) {
    return axios.post(api.browseReward, data);
  },
  favorite(data) {
    return axios.post(api.favorite, data);
  },
  action(params) {
    return axios.get(api.action, { params });
  }
});
