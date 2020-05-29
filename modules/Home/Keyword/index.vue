<template>
  <a-card
    :bordered="false"
    :head-style="{ borderTop: '2px solid #F79522' }"
    :title="$t('home.keyword')"
  >
    <nuxt-link
      v-for="n in data"
      :key="n.id"
      :class="$style.btn"
      :to="localePath({ name: 'search', query: { keyword: n.keyWord } })"
      class="ant-btn ant-btn-default"
    >
      {{ n.keyWord }}
    </nuxt-link>
  </a-card>
</template>
<script>
export default {
    props: {
        data: {
            type: Array,
            default() {
                return [];
            }
        }
    }
};
</script>

<style lang="less" module>
.btn {
  margin-top: 8px;
  margin-bottom: 8px;
  margin-right: 16px;
  border-color: #cccccc !important;
  color: #666666 !important;
  border-radius: 16px;
  &:hover {
    color: #f79522 !important;
    border-color: #f79522 !important;
  }
}
</style>
