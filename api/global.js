/*
 * @Author: 陈康
 * @Date: 2019-01-10 09:35:19
 * @Last Modified by: Quansen
 * @Last Modified time: 2019-01-20 13:54:34
 *  @desc  全局的公共接口
 */

const api = {
  feedback: '/api/user/feedback/noAuth/add', // 意见反馈
  country: '/api/commons/area/country/list', // 获取国家列表
  initgt: '/api/user/commons/noAuth/geetest/startCaptcha', // 初始化极验
  verifygt: '/api/user/commons/noAuth/geetest/verifyLogin', // 发送验证码
  startCaptchaByEmail: '/api/user/geetest/startCaptchaByEmail', // 邮箱绑定初始化极验
  verifyLoginByEmail: '/api/user/geetest/verifyLoginByEmail', // 发送邮箱验证码
  keyword: '/api/marketing/noAuth/queryKeyWordFront'
};

export default axios => ({
  feedback(params) {
    return axios.post(api.feedback, params);
  },
  country(params) {
    return axios.get(api.country, params);
  },
  initgt(params) {
    return axios.get(api.initgt, params);
  },
  startCaptchaByEmail(params) {
    return axios.get(api.startCaptchaByEmail, params);
  },
  verifygt(params) {
    return axios.post(api.verifygt, params);
  },
  verifyLoginByEmail(params) {
    return axios.post(api.verifyLoginByEmail, params);
  },
  keyword(params = { positionId: 8 }) {
    return axios.get(api.keyword, { params });
  }
});
