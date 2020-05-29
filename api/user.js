/*
 * @Author: 陈康
 * @Date: 2019-01-10 09:35:19
 * @Last Modified by: 陈康
 * @Last Modified time: 2019-01-11 13:57:28
 *  @desc  用户中心接口
 */

const api = {
  login: '/api/user/noAuth/login', // 登录
  quick: '/api/user/noAuth/login/quick', // 快速登录
  forget: '/api/user/noAuth/pwd/forget', // 重置密码
  update: '/api/user/pwd/updateByPwd', // 修改密码
  setPwd: '/api/user/pwd/update' // 设置登录密码
};

export default axios => ({
  login(params) {
    return axios.post(api.login, params);
  },
  quick(params) {
    return axios.post(api.quick, params);
  },
  forget(params) {
    return axios.post(api.forget, params);
  },
  update(params) {
    return axios.post(api.update, { params });
  },
  setPwd(params) {
    return axios.post(api.setPwd, params);
  }
});
