/*
 * @Author: baiyafeng
 * @Date: 2019-01-16 10:00:00
 * @Last Modified by: baiyafeng
 * @Last Modified time: 2019-01-16 13:52:17
 * @desc  个人中心接口
 */

const api = {
  findUserWalletByUserId: '/api/finance/userWallet/findUserWalletByUserId', // 我的收益
  userBillPageListByParam:
    '/api/finance/userWalletBill/userWalletBill/userBillPageListByParam', // 我的收益列表
  pageByArticleCollect: '/api/content/pageByArticleCollect', // 查询用户收藏并分页
  deleteByArticleCollect: '/api/content/deleteByArticleCollect', // 批量取消收藏
  findArticleComment: '/api/content/findArticleComment', // 个人文章评论列表
  deleteComment: '/api/content/deleteComment', // 个人文章评论列表
  noAuthList: '/api/market/optional/noAuth/list', // 获取用户自选列表
  deleteOptional: '/api/market/optional/delete', // 删除用户自选
  update: '/api/user/update', // 更新用户信息
  bindEmail: '/api/user/security/bindEmail', // 更新用户信息
  updateByPwd: '/api/user/pwd/updateByPwd', // 修改密码
  fileUpload: '/api/library/noAuth/fileupload', // 上传文件
  uploadBase64: '/api/library/noAuth/fileupload/base64', // 上传base64文件
  saveIdentityInfo: '/api/user/saveIdentityInfo'
};

export default axios => ({
  findUserWalletByUserId(params) {
    return axios.get(api.findUserWalletByUserId, { params });
  },
  userBillPageListByParam(params) {
    return axios.get(api.userBillPageListByParam, { params });
  },
  pageByArticleCollect(params) {
    return axios.get(api.pageByArticleCollect, { params });
  },
  deleteByArticleCollect(params) {
    return axios.post(api.deleteByArticleCollect, params);
  },
  findArticleComment(params) {
    return axios.get(api.findArticleComment, { params });
  },
  deleteComment(params) {
    return axios.post(api.deleteComment + '?commentId=' + params.commentId);
  },
  noAuthList(params) {
    return axios.get(api.noAuthList, { params });
  },
  deleteOptional(params) {
    return axios.post(api.deleteOptional, params);
  },
  updateInfo(params) {
    return axios.post(api.update, params);
  },
  bindEmail(params) {
    return axios.post(api.bindEmail, params);
  },
  updateByPwd(params) {
    return axios.post(api.updateByPwd, { params });
  },
  fileUpload(params) {
    return axios.post(api.fileUpload, { params });
  },
  uploadBase64(params) {
    return axios.post(api.uploadBase64, params);
  },
  saveIdentityInfo(params) {
    return axios.post(api.saveIdentityInfo, params);
  }
});
