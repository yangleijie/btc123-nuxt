<template>
  <div :class="$style.feedback">
    <Banner title="意见反馈" sub-title="FEEDBACK">
      <div :class="$style.content">
        <p :class="$style.notice">{{ $t('feedback.desc') }}</p>
        <a-form
          :class="$style.form"
          :form="form"
          layout="vertical"
          @submit="handleSubmit"
        >
          <a-form-item>
            <p :class="$style.label">
              <img src="~assets/img/abouttext.png" alt="比特币反馈" />
              {{ $t('feedback.content') }}
            </p>
            <a-textarea
              v-decorator="[
                'content',
                {
                  rules: [
                    { required: true, message: '请输入反馈内容' },
                    { min: 1, max: 500, message: '请输入500字以内的反馈内容' }
                  ]
                }
              ]"
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder="请输入反馈内容"
            />
          </a-form-item>
          <a-form-item>
            <p :class="$style.label">
              <img src="~assets/img/aboutemail.png" alt="比特币意见" />
              {{ $t('feedback.email') }}
            </p>
            <a-input
              v-decorator="[
                'email',
                {
                  rules: [
                    { required: true, message: '请输入邮箱地址' },
                    { type: 'email', message: '请输入正确格式的邮箱' }
                  ]
                }
              ]"
              placeholder="请输入邮箱地址"
            />
          </a-form-item>
          <a-form-item>
            <div class="feedback_submit">
              <a-button
                :loading="loading"
                type="primary"
                size="large"
                html-type="submit"
              >
                {{ $t('feedback.submit') }}
              </a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </Banner>
  </div>
</template>
<script>
import Banner from '~/components/About/banner';
export default {
    components: {
        Banner
    },
    head() {
        return {
            title: '意见反馈|BTC123',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: '意见反馈,BTC123'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content:
                        'BTC123是全球领先的区块链信息服务平台, 提供比特币，以太坊行情资讯数据、区块讯分析、创业孵化、行业峰会、技术等多元产品与服务，致力于为区块链创业者以及数字货币爱好者提供最好的产品和服务。'
                }
            ]
        };
    },
    data() {
        return {
            loading: false
        };
    },
    beforeCreate() {
        this.form = this.$form.createForm(this);
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.loading = true;
                    this.$global
                        .feedback({
                            content: values.content,
                            email: values.email,
                            origin: 0
                        })
                        .then(({ success }) => {
                            this.loading = false;
                            if (success) {
                                this.form.resetFields();
                                this.$message.success('反馈成功，谢谢您的反馈');
                            }
                        });
                }
            });
        }
    }
};
</script>

<style lang="less" module>
.feedback {
  .content {
    width: 480px;
    margin: 0 auto;
    .notice {
      color: #4a4a44;
      font-size: 16px;
      line-height: 22px;
    }
    .form {
      width: 100%;
      margin-top: 40px;
      .label {
        font-size: 16px;
        color: #4a4a4a;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        > img {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
      }
    }
  }
  :global {
    .feedback_submit {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
