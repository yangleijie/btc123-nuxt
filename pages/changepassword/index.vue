<template>
  <div :class="$style.signin">
    <div :class="$style.title">修改密码</div>
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
            <a-form-item>
              <a-input
                v-decorator="[
                  'oldpassword',
                  { rules: [{ required: true, message: '请输入原始密码' }] }
                ]"
                size="large"
                type="password"
                placeholder="请输入原始密码"
                @blur="handleConfirmBlur"
              />
            </a-form-item>
            <!-- 密码框 -->
            <a-form-item>
              <a-input
                v-decorator="[
                  'password',
                  {
                    rules: [
                      { required: true, message: '请输入新密码' },
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
            initPhone: '18383376972',
            form: this.$form.createForm(this),
            // 提交按钮
            submitBtnLoading: false
        };
    },

    methods: {
        // 提交
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, value) => {
                if (!err) {
                    this.submitBtnLoading = true;
                    this.update(value);
                }
            });
        },
        update({ oldpassword: oldpwd, secondpassword: newPwd }) {
            this.$user
                .update({
                    oldPwd: this.$md5(oldpwd),
                    newPwd: this.$md5(newPwd)
                })
                .then(({ success }) => {
                    this.submitBtnLoading = false;
                    if (success) {
                        this.$message.success('密码修改成功');
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
