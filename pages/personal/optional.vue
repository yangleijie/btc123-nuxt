<template>
  <section :class="$style.service">
    <PersonalLeft :tab-index="3" />
    <div :class="$style.right">
      <div :class="$style.title">{{ $t('user.optional') }}</div>
      <Empty v-if="!data.length" type="empty" />
      <a-table
        v-if="data.length"
        :columns="columns"
        :data-source="data"
        :loading="loading"
        :pagination="pagination"
        style="margin-top: 20px;"
      >
        <a-list-item slot="id" slot-scope="item, index, i">
          {{ i + 1 }}
        </a-list-item>
        <a-list-item slot="tradePairsKey" slot-scope="item">
          <img :src="item.logo" width="28" height="28" alt="比特币诞生" />
          <div style="margin-left: 10px; margin-top: -8px;">
            <div style="font-size: 16px; color: #333; font-weight: bold;">
              {{ item.currency + '/' + item.coinType }}
            </div>
            <div style="font-size: 12px; color: #999;">
              {{
                item.exhcangeCnName ? item.exhcangeCnName : item.exchangeEnName
              }}
            </div>
          </div>
        </a-list-item>
        <a-list-item slot="cnyPrice" slot-scope="item">
          {{ '￥' + item.cnyPrice }}
        </a-list-item>
        <a-list-item slot="vol24H" slot-scope="item">
          {{ (item.vol24H / 10000).toFixed(4) + '万' }}
        </a-list-item>
        <a-list-item slot="turnover24H" slot-scope="item">
          {{ '￥' + (item.turnover24H / 10000).toFixed(4) + '万' }}
        </a-list-item>
        <a-list-item slot="changeRate24H" slot-scope="item">
          {{ item.changeRate24H + '%' }}
        </a-list-item>
        <template slot="operate" slot-scope="operate, item">
          <icon-font
            type="icon-yichu"
            title="删除"
            @click="deleteOptional(item)"
          />
        </template>
      </a-table>
    </div>
  </section>
</template>
<script>
import PersonalLeft from '~/components/PersonalLeft';
import Empty from '~/components/Empty';
export default {
    components: { PersonalLeft, Empty },
    data() {
        return {
            data: [],
            columns: [
                {
                    title: '#',
                    scopedSlots: { customRender: 'id' }
                },
                {
                    title: this.$t('user.pairs'),
                    scopedSlots: { customRender: 'tradePairsKey' }
                },
                {
                    title: this.$t('user.price'),
                    scopedSlots: { customRender: 'cnyPrice' },
                    sorter: true,
                    align: 'center'
                },
                {
                    title: this.$t('user.vol'),
                    scopedSlots: { customRender: 'vol24H' },
                    sorter: true,
                    align: 'center'
                },
                {
                    title: this.$t('user.turnover'),
                    scopedSlots: { customRender: 'turnover24H' },
                    sorter: true
                },
                {
                    title: this.$t('user.change'),
                    scopedSlots: { customRender: 'changeRate24H' },
                    sorter: true
                },
                {
                    title: this.$t('user.operation'),
                    dataIndex: 'operate',
                    scopedSlots: { customRender: 'operate' }
                }
            ],
            busy: false,
            loading: false,
            tabs: ['资讯', '币种', '交易所'],
            pagination: {
                defaultCurrent: 1,
                defaultPageSize: 8
            },
            current: 1,
            total: 1,
            size: 10,
            tabsIndex: '0'
        };
    },
    created() {
        this.getInfo();
    },
    methods: {
        getInfo: function() {
            const params = {
                page: this.current,
                size: this.size
            };
            this.$personal.noAuthList(params).then(
                res => {
                    if (res.success) {
                        this.data = res.data.list;
                        this.total = res.data.total;
                    }
                },
                err => {
                    console.log(err.errorMessage);
                }
            );
        },
        deleteOptional: function(item) {
            const _this = this;
            this.$confirm({
                title: '删除自选',
                content: '你确定要删除自选' + item.market + '吗？',
                okText: '确定',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                    _this.$personal
                        .deleteOptional({
                            markeyKey: item.market,
                            tradePairsKey: item.tradePairsKey
                        })
                        .then(res => {
                            if (res.success) {
                                _this.getInfo();
                                _this.$message.success('删除成功！');
                            }
                        });
                },
                onCancel() {
                    console.log('Cancel');
                }
            });
        }
    }
};
</script>
<style lang="less" module>
.service {
  width: 1280px;
  margin: 20px auto;
  .right {
    width: 1000px;
    height: 1100px;
    background-color: #fff;
    margin-left: 20px;
    display: inline-block;
    vertical-align: top;
    padding: 44px;
    color: #333;
    .title {
      font-size: 20px;
      font-weight: bold;
      position: relative;
    }
    .line {
      width: 100%;
      height: 1px;
      background-color: #eee;
      margin-top: 10px;
    }
  }
}
i {
  cursor: pointer;
  &:hover {
    color: #f79522;
  }
}
</style>
