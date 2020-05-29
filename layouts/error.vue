<template>
  <div class="content">
    <div :class="$style.error">
      <img src="~assets/img/404.png" alt="比特币来源" />
      <div>
        <div :class="$style.title">{{ title }}</div>
        <div :class="$style.subtitle">
          {{
            statusCode === 404
              ? '来源链接是否正确？资讯、快讯或活动是否存在？'
              : message
          }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props: {
        error: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            title: '你似乎发现了服务器在外太空挖矿…'
        };
    },
    head() {
        return {
            title: this.title
        };
    },
    computed: {
        statusCode() {
            return (this.error && this.error.statusCode) || 500;
        },
        message() {
            return this.error.message || `<%= messages.client_error %>`;
        }
    }
};
</script>
<style lang="less" module>
.error {
  margin: 16px;
  padding: 60px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    max-width: 340px;
    height: auto;
    display: block;
  }
}
.title {
  color: #f97200;
  font-size: 24px;
  font-weight: 500;
  margin: 16px 0;
}

.subtitle {
  color: #999999;
  font-size: 16px;
}
</style>
