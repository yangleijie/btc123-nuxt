const api = {
  list: '/api/market/exchange/noAuth/getExchangeMarketList',
  detail: '/api/market/exchange/noAuth/getExchangeDetailsInfo',
  detailList: '/api/market/exchange/noAuth/getExchangeDetailsListByPage' // 详情交易对排序
};
export default axios => ({
  list(params) {
    return axios.get(api.list, { params });
  },
  detail(params) {
    return axios.get(api.detail, { params });
  },
  detailList(params) {
    return axios.get(api.detailList, { params });
  }
});
