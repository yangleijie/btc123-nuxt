<template>
  <div :class="$style.signin">
    <div :class="$style.title">设置密码</div>
    <div :class="$style.formWrap">
      <a-card :bordered="false" style="width:100%">
        <div>
          <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
          >
            <div :class="$style.notice">
              <span>为确保账户安全，需要验证当前手机有效性</span>
              <div>
                当前绑定手机号：
                <span>
                  {{ initPhone.replace(/^(\d{3})\d{1,4}(\d{4})$/, `$1****$2`) }}
                </span>
              </div>
            </div>
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
                placeholder="请输入确认密码"
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
            form: this.$form.createForm(this),
            // 模拟的下拉
            countryCode: 86,
            initPhone: '18383376972',
            initAreaCode: 86,
            // 验证码的控制
            countDownNumber: 60,
            showText: '获取验证码',
            // 提交按钮
            submitBtnLoading: false
        };
    },
    methods: {
        // 发送验证码
        sendCap(type) {
            this.btnLoading = true;
            this.initGeetest(window.initGeetest, {
                smsType: type,
                phone: this.initPhone,
                areaCode: this.initAreaCode,
                done: () => {
                    this.countDwon();
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
                    this.setPassword(value);
                }
            });
        },
        setPassword({ capcha: smsCode, password: loginPassword }) {
            this.$user
                .setPwd({
                    smsCode,
                    loginPassword: this.$md5(loginPassword),
                    typeCode: 'zh-cn',
                    smsType: 2,
                    origin: 1,
                    phone: this.initPhone,
                    areaCode: this.initAreaCode
                })
                .then(({ success }) => {
                    this.submitBtnLoading = false;
                    if (success) {
                        this.$message.success('设置成功');
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
            if (value && this.confirmDirty && form.getFieldValue('secondpassword')) {
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
  .notice {
    text-align: center;
    color: #666666;
    > div {
      margin-top: 3px;
      margin-bottom: 20px;
      span {
        font-size: 16px;
        color: #222222;
      }
    }
  }
}
</style>
