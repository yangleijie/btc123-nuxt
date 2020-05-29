<template>
  <div :class="$style.signin" @click.stop="showSelect = false">
    <div :class="$style.title">重置密码</div>
    <div :class="$style.formWrap">
      <a-card :bordered="false" style="width:100%">
        <div>
          <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
          >
            <a-form-item>
              <div
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
                          callback();
                        }
                      }
                    ]
                  }
                ]"
                class="pd-53"
                placeholder="请输入手机号"
                size="large"
              />
            </a-form-item>
            <!-- 验证码 -->
            <a-form-item>
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
                  @click="sendCap(2)"
                >
                  {{ showText }}
                </a-button>
              </div>
            </a-form-item>
            <!-- 密码框 -->
            <a-form-item>
              <a-input
                v-decorator="[
                  'password',
                  {
                    rules: [
                      { required: true, message: '请输入密码' },
                      {
                        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/,
                        message: '请输入8-18位字母数字组合的密码'
                      },
                      { validator: validateToNextPassword }
                    ]
                  }
                ]"
                size="large"
                type="password"
                placeholder="请输入密码"
              />
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="[
                  'secondpassword',
                  {
                    rules: [
                      { required: true, message: '请输入确认密码' },
                      {
                        validator: compareToFirstPassword
                      }
                    ]
                  }
                ]"
                size="large"
                type="password"
                placeholder="请输入密码"
                @blur="handleConfirmBlur"
              />
            </a-form-item>
            <a-form-item>
              <a-button
                :loading="submitBtnLoading"
                type="primary"
                size="large"
                block
                html-type="submit"
                class="login-form-button"
              >
                提交
              </a-button>
            </a-form-item>
            <div :class="$style.reset">
              <nuxt-link to="/signin">前往登录</nuxt-link>
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
            confirmDirty: false,
            console: console,
            form: this.$form.createForm(this),
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
                if (!err) {
                    this.submitBtnLoading = true;
                    this.resetPassword(value);
                }
            });
        },
        resetPassword({ phone, password, capcha: smsCode }) {
            this.$user
                .forget({
                    typeCode: 'zh-cn',
                    loginPassword: this.$md5(password),
                    areaCode: this.countryCode,
                    origin: 1,
                    phone,
                    smsType: 2,
                    smsCode
                })
                .then(({ success }) => {
                    this.submitBtnLoading = false;
                    if (success) {
                        this.$router.push('/signin');
                    }
                })
                .catch(() => {
                    this.submitBtnLoading = false;
                });
        },
        handleConfirmBlur(e) {
            const value = e.target.value;
            this.confirmDirty = this.confirmDirty || !!value;
        },
        compareToFirstPassword(rule, value, callback) {
            const form = this.form;
            if (value && value !== form.getFieldValue('password')) {
                callback(new Error('两次密码不一致'));
            } else {
                callback();
            }
        },
        validateToNextPassword(rule, value, callback) {
            const form = this.form;
            if (value && this.confirmDirty) {
                form.validateFields(['secondpassword'], { force: true });
            }
            callback();
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
  }
  .reset {
    text-align: center;
    > a {
      color: #666666;
    }
  }
}
</style>
