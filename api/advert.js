const api = {
  advertList: '/api/marketing/noAuth/queryAdvertFront',
  project: '/api/marketing/noAuth/queryAdvertProjectFront',
  navList: '/api/marketing/noAuth/queryAdvertProjectFrontBottom',
  click: '/api/marketing/clickAdvertFront'
};
const attach = {
  state: 1,
  flag: 0
};
// data:image/png;base64,
export default axios => ({
  advertList(params) {
    return axios.post(api.advertList, { params: { ...attach, ...params } });
  },
  project(params) {
    return axios.post(api.project, { params: { ...attach, ...params } });
  },
  navList(params = { positionId: 11 }) {
    return axios.post(api.navList, { params: { ...attach, ...params } });
  },
  logos(params = { positionId: 12 }) {
    return axios.post(api.project, { params: { ...attach, ...params } });
  },
  links(params = { positionId: 26 }) {
    return axios.post(api.project, { params: { ...attach, ...params } });
  },
  click(params) {
    return axios.get(api.click, { params });
  }
});
