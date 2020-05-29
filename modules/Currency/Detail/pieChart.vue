<template>
  <div :class="$style.pie360">
    <a-card
      :head-style="{ borderTop: '2px solid #F79522' }"
      :bordered="false"
      :title="title"
    >
      <Pie :hover-title="hoverTitle" :value="value" />
    </a-card>
  </div>
</template>

<script>
import Pie from '~/components/EchartsPie/pieAll';
export default {
    components: {
        Pie
    },
    props: {
        title: {
            default() {
                return this.$t('coin.detail.txRatio');
            },
            type: String
        },
        hoverTitle: {
            default() {
                return this.$t('coin.detail.txRatio');
            },
            type: String
        },
        value: {
            type: Array,
            default: () => [
                { value: 335, name: '香港FUBT(富比特）' },
                { value: 310, name: '比特亚洲BitAsiaEx' },
                { value: 234, name: 'HB.top汇币网' },
                { value: 135, name: '视频广告' },
                { value: 1548, name: '邮件营销' }
            ]
        }
    }
};
</script>

<style lang="less" module>
.pie360 {
  margin-bottom: 20px;
}
</style>
