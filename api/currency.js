const api = {
  detail: '/api/market/currency/noAuth/detail', // id 查询币种的详情
  list: '/api/market/ranking/noAuth', // 根据参数获取涨幅榜 跌幅榜
  add: '/api/market/optional/add', // 添加自选
  delete: '/api/market/optional/delete' // 删除自选
};
// data:image/png;base64,
export default axios => ({
  detail(params) {
    return axios.get(api.detail, { params });
  },
  list(params) {
    return axios.post(api.list, params);
  },
  add(params) {
    return axios.post(api.add, params);
  },
  delete(params) {
    return axios.post(api.delete, params);
  }
});
