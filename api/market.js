const api = {
  hot: '/api/market/index/noAuth/currency',
  exchange: '/api/market/index/noAuth/exchange/price',
  ad: '/api/market/index/noAuth/tradePairs',
  markets: '/api/market/index/noAuth/markets'
};

export default axios => ({
  hot(params) {
    return axios.get(api.hot, { params });
  },
  exchange(params) {
    return axios.get(api.exchange, { params });
  },
  ad(params) {
    return axios.get(api.ad, { params });
  },
  markets(params) {
    return axios.get(api.markets, { params });
  }
});
