/*
 * @Author: 陈康
 * @Date: 2019-01-10 09:35:19
 * @Last Modified by: Quansen
 * @Last Modified time: 2019-01-20 16:42:22
 *  @desc  全局的公共接口
 */

const api = {
  queryStrictPlatform: '/api/marketing/noAuth/queryStrictPlatform', // 获取严选交易所
  queryStrictProject: '/api/marketing/noAuth/queryStrictProject', // 严选项目
  queryStrictMedia: '/api/marketing/noAuth/queryStrictMedia', // 严选媒体
  queryStrictCommunity: '/api/marketing/noAuth/queryStrictCommunity', // 严选社群
  queryStrictIndustry: '/api/marketing/noAuth/queryStrictIndustry', // 严选KOL
  queryStrictPlatformAndProject:
    '/api/marketing/noAuth/queryStrictPlatformAndProject' // 交易所和数字货币
};
const attach = {
  published: 1,
  flag: 0
};
export default axios => ({
  queryStrictPlatform(params) {
    return axios.post(api.queryStrictPlatform, {
      params: { ...attach, ...params }
    });
  },
  queryStrictProject(params) {
    return axios.post(api.queryStrictProject, {
      params: { ...attach, ...params }
    });
  },
  queryStrictMedia(params) {
    return axios.post(api.queryStrictMedia, {
      params: { ...attach, ...params }
    });
  },
  queryStrictCommunity(params) {
    return axios.post(api.queryStrictCommunity, {
      params: { ...attach, ...params }
    });
  },
  queryStrictIndustry(params) {
    return axios.post(api.queryStrictIndustry, {
      params: { ...attach, ...params }
    });
  },
  queryStrictPlatformAndProject(params) {
    return axios.post(api.queryStrictPlatformAndProject, {
      params: { ...attach, ...params }
    });
  }
});
