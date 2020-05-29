<template>
  <div :class="$style.signin" @click.stop="showSelect = false">
    <div :class="$style.title">欢迎登录</div>
    <div :class="$style.formWrap">
      <a-card
        :tab-list="tabList"
        :active-tab-key="noTitleKey"
        :bordered="false"
        style="width:100%"
        @tabChange="key => onTabChange(key, 'noTitleKey')"
      >
        <div>
          <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
          >
            <a-form-item>
              <div
                v-if="noTitleKey === `verification`"
                :class="showSelect ? 'spread' : ''"
                class="select-btn"
                @click.stop="showSelect = true"
              >
                {{ countryCode }}
                <a-icon type="right" />
              </div>
              <div v-if="showSelect" class="select-menu-wrap">
                <div class="select-menu-content">
                  <ul>
                    <li
                      v-for="(item, index) in countryListData"
                      :key="index"
                      :class="item.countryCode == countryCode ? 'active' : ''"
                      @click="changeCountryCode(item.countryCode)"
                    >
                      {{ item.countryNameCn }}+({{ item.countryCode }})
                    </li>
                  </ul>
                </div>
              </div>
              <a-input
                v-decorator="[
                  'phone',
                  {
                    rules: [
                      {
                        validator: function(rule, value, callback) {
                          if (noTitleKey !== 'password') {
                            if (countryCode == 86) {
                              if (
                                !/^(13[0-9]|14[5|7]|15[0-35-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/.test(
                                  value
                                )
                              ) {
                                callback('请输入正确的电话号码');
                                return;
                              }
                            } else {
                              if (!/^\d{5,15}$/.test(value)) {
                                callback('请输入正确的电话号码');
                                return;
                              }
                            }
                          } else {
                            if (!/^\d{5,15}$/.test(value)) {
                              callback('请输入正确的账号');
                              return;
                            }
                          }
                          callback();
                        }
                      }
                    ]
                  }
                ]"
                :class="{ 'pd-53': noTitleKey === 'verification' }"
                placeholder="请输入手机号"
                size="large"
              />
            </a-form-item>
            <!-- 验证码 -->
            <a-form-item v-if="noTitleKey === `verification`">
              <a-input
                v-decorator="[
                  'capcha',
                  {
                    rules: [
                      { required: true, message: '请输入短信验证码' },
                      { pattern: /^\d{6}$/, message: '请输入正确的验证码' }
                    ]
                  }
                ]"
                size="large"
                placeholder="请输入6位数的验证码"
              />
              <div class="new_send_btn">
                <a-button
                  :loading="btnLoading"
                  class="loadingbutton"
                  @click="sendCap(3)"
                >
                  {{ showText }}
                </a-button>
              </div>
            </a-form-item>
            <!-- 密码框 -->
            <a-form-item v-else>
              <a-input
                v-decorator="[
                  'password',
                  { rules: [{ required: true, message: '请输入密码' }] }
                ]"
                size="large"
                type="password"
                placeholder="请输入密码"
              />
            </a-form-item>
            <!-- 协议部分 -->
            <div :class="$style.agreement">
              登录即表示您同意
              <nuxt-link to="/about/service" target="_blank">
                《注册协议》
              </nuxt-link>
              <nuxt-link to="/about/secret" target="_blank">
                《保密协议》
              </nuxt-link>
            </div>
            <a-form-item>
              <a-button
                :loading="submitBtnLoading"
                type="primary"
                size="large"
                block
                html-type="submit"
                class="login-form-button"
              >
                登录
              </a-button>
            </a-form-item>
            <div :class="$style.reset">
              <nuxt-link to="/reset">重置密码</nuxt-link>
            </div>
          </a-form>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
export default {
    layout: 'signin',
    data() {
        return {
            tabList: [
                {
                    key: 'verification',
                    tab: '验证码登录'
                },
                {
                    key: 'password',
                    tab: '密码登录'
                }
            ],
            form: this.$form.createForm(this),
            noTitleKey: 'verification',
            // 模拟的下拉
            countryCode: 86,
            showSelect: false,
            countryListData: [],
            // 验证码的控制
            countDownNumber: 60,
            showText: '获取验证码',
            // 提交按钮
            submitBtnLoading: false
        };
    },
    mounted() {
        this.getCountry();
    },
    methods: {
        getCountry() {
            this.$global.country().then(({ data }) => {
                this.countryListData = data;
            });
        },
        onTabChange(key, type) {
            this[type] = key;
            this.form.resetFields();
            this.countryCode = 86;
        },

        changeCountryCode(countryCode) {
            const form = this.form;
            this.countryCode = countryCode;
            if (form.getFieldValue('phone')) {
                form.validateFields(['phone'], { force: true });
            }
        },
        // 发送验证码
        sendCap(type) {
            this.form.validateFields(['phone'], (err, values) => {
                if (!err) {
                    this.btnLoading = true;
                    this.initGeetest(window.initGeetest, {
                        smsType: type,
                        phone: values.phone,
                        areaCode: this.countryCode,
                        done: () => {
                            this.countDwon();
                        }
                    });
                }
            });
        },
        countDwon() {
            const timer = setInterval(() => {
                this.countDownNumber--;
                if (this.countDownNumber === 0) {
                    clearInterval(timer);
                    this.showText = '获取验证码';
                    this.btnLoading = false;
                } else {
                    this.showText = this.countDownNumber + 'S';
                }
            }, 1000);
            clearInterval(timer);
        },
        // 提交
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, value) => {
                // console.log(this.noTitleKey);
                if (!err) {
                    if (this.noTitleKey === 'verification') {
                        this.quickLogin({
                            validateCode: value.capcha,
                            account: value.phone
                        });
                    } else if (this.noTitleKey === 'password') {
                        this.login(value);
                    }
                }
            });
        },
        // login 登录
        login({ phone: account, password }) {
            // 账号密码登录
            this.submitBtnLoading = true;
            this.$user
                .login({
                    account,
                    origin: 1,
                    typeCode: 'zh-cn',
                    deviceId: Math.random()
                        .toString(36)
                        .substr(2)
                        .concat(new Date().getTime()),
                    password: this.$md5(password)
                })
                .then(({ data, success }) => {
                    this.submitBtnLoading = false;
                    if (success) {
                        this.setUser(data);
                    }
                })
                .catch(() => {
                    this.submitBtnLoading = false;
                });
        },
        // 快速登录
        quickLogin({ validateCode, account }) {
            // 账号密码登录
            this.submitBtnLoading = true;
            this.$user
                .quick({
                    account,
                    validateCode,
                    origin: 1,
                    areaCode: this.countryCode,
                    typeCode: 'zh-cn',
                    deviceId: Math.random()
                        .toString(36)
                        .substr(2)
                        .concat(new Date().getTime())
                })
                .then(({ data, success }) => {
                    this.submitBtnLoading = false;
                    if (success) {
                        this.setUser(data);
                    }
                })
                .catch(() => {
                    this.submitBtnLoading = false;
                });
        },
        setUser(data) {
            const { redirect_uri: redirectUri = '/' } = this.$route.query;
            this.$store.commit('setLoggedUser', data);
            this.$router.replace(redirectUri);
            this.$message.success('登录成功');
        }
    }
};
</script>

<style lang="less" module>
.signin {
  .title {
    font-size: 20px;
    color: #222222;
    text-align: center;
    margin-bottom: 40px;
  }
  .formWrap {
    width: 377px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px 0px rgba(184, 218, 242, 0.4);
    border-radius: 8px;
    .agreement {
      font-size: 12px;
      color: #999;
      margin-bottom: 28px;
      margin-top: -5px;
      > a {
        color: #222;
        text-decoration: none;
      }
    }
    .reset {
      text-align: center;
      > a {
        color: #666666;
      }
    }
  }
}
</style>
