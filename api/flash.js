const api = {
  list: '/api/content/selectPageFlashNews',
  btc123List: '/api/content/pageExclusiveFlashNews' // 独家快讯
};
// data:image/png;base64,
export default axios => ({
  list(params) {
    params = { ...params, sourceId: 1 };
    return axios.get(api.list, { params });
  },
  btc123List(params = { pageSize: 10, sourceId: 1 }) {
    return axios.get(api.btc123List, { params });
  }
});
