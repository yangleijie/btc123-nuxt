import Vue from 'vue';
import { message as Message } from 'ant-design-vue';
const crypto = require('crypto');

const getLastMd5 = function(str) {
  const str1 = encodeURI(str);
  const sha2 = crypto.createHash('md5'); // 定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
  sha2.update(str1);
  const res = sha2.digest('hex'); // 加密后的值d
  return res;
};
const getMd5 = function(str) {
  const str1 = encodeURI(str);
  const sha1 = crypto.createHash('md5'); // 定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
  sha1.update(str1);
  const res = sha1.digest('hex'); // 加密后的值d
  const moka = 'moka' + res;
  return getLastMd5(moka);
};
// 混入极验 只需要掉方法即可使用
function mixinGt(app) {
  return Vue.mixin({
    data() {
      return {
        btnLoading: false
      };
    },
    methods: {
      initGeetest(initGeetest, options) {
        app.$global.initgt().then(({ data }) => {
          initGeetest(
            {
              // 以下 4 个配置参数为必须，不能缺少
              gt: data.gt,
              challenge: data.challenge,
              offline: !data.success, // 表示用户后台检测极验服务器是否宕机
              product: 'bind', // 产品形式，包括：float，popup
              width: '300px'
              // 更多配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
            },
            captchaObj => {
              this.handler(captchaObj, options);
            }
          );
        });
      },
      initGeetestEmail(initGeetest, options) {
        app.$global.startCaptchaByEmail().then(({ data }) => {
          initGeetest(
            {
              // 以下 4 个配置参数为必须，不能缺少
              gt: data.gt,
              challenge: data.challenge,
              offline: !data.success, // 表示用户后台检测极验服务器是否宕机
              product: 'bind', // 产品形式，包括：float，popup
              width: '300px'
              // 更多配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
            },
            captchaObj => {
              this.handlerEmail(captchaObj, options);
            }
          );
        });
      },
      handler(captchaObj, options) {
        options = {
          areaCode: '86',
          origin: '1',
          ...options
        };
        const self = this;
        captchaObj
          .onReady(function() {
            captchaObj.verify();
          })
          .onSuccess(function() {
            const result = captchaObj.getValidate();
            self.btnLoading = false;
            // 发送验证码的接口
            app.$global
              .verifygt({
                geetest_challenge: result.geetest_challenge,
                geetest_validate: result.geetest_validate,
                geetest_seccode: result.geetest_seccode,
                areaCode: options.areaCode,
                origin: options.origin,
                phone: options.phone,
                smsType: options.smsType
              })
              .then(({ success }) => {
                if (success) {
                  Message.success('验证码发送成功,请查收');
                  typeof options.done === 'function' && options.done(); // 成功的回调
                }
              });
          })
          .onClose(function() {
            self.btnLoading = false;
            Message.warning('请先完成验证');
          })
          .onError(function(e) {
            self.btnLoading = false;
            console.log(e);
          });
      },
      handlerEmail(captchaObj, options) {
        captchaObj
          .onReady(function() {
            captchaObj.verify();
          })
          .onSuccess(function() {
            const result = captchaObj.getValidate();
            // 发送验证码的接口
            app.$global
              .verifyLoginByEmail({
                geetest_challenge: result.geetest_challenge,
                geetest_validate: result.geetest_validate,
                geetest_seccode: result.geetest_seccode,
                typeCode: 'zh-cn',
                operateType: 4,
                origin: 3,
                email: options.email,
                smsType: options.smsType
              })
              .then(({ success }) => {
                if (success) {
                  Message.success('验证码发送成功,请查收');
                  typeof options.done === 'function' && options.done(); // 成功的回调
                }
              });
          })
          .onClose(function() {
            self.btnLoading = false;
            Message.warning('请先完成验证');
          })
          .onError(function(e) {
            self.btnLoading = false;
            console.log(e);
          });
      }
    }
  });
}
export default ({ app }, inject) => {
  mixinGt(app); // 极验验证
  inject('md5', getMd5);
};
