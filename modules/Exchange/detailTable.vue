<template>
  <div ref="scrollToView" :class="$style.exchangeDetail">
    <a-card
      :bordered="false"
      :active-tab-key="activeTabKey"
      :tab-list="tabList"
      :title="$t('exchange.detail.pairs')"
      @tabChange="handleTabChange"
    >
      <span slot="extra" :class="$style.come">
        {{ $t('exchange.detail.from') }}:aicoin
      </span>
      <a-table
        :columns="columns"
        :data-source="data"
        :pagination="false"
        :loading="loading"
        size="middle"
        @change="handleTableChange"
      >
        <template slot="name" slot-scope="text, item">
          <div :class="$style.name">
            <img
              v-lazy="item.currencyFlagLogo"
              width="88"
              height="88"
              type="crop"
              alt="比特币（Bitcoin）的概念"
            />
            <div>
              <div :class="$style.label">
                {{ item.tradeCurrency + '/' + item.buyCurrency }}
              </div>
              <div>{{ name }}</div>
            </div>
          </div>
        </template>
        <template slot="operate" slot-scope="item">
          <!-- <a
            :class="$style.link"
            href="#"
            target="_blank">
            <icon-font type="icon-hangqing" />
          </a> -->
          <a
            v-if="!!!item.selfFlag"
            :class="[$style.operate, $style.link]"
            @click="add(item, item.tradePairsConkey, item.exchangeConkey)"
          >
            <icon-font type="icon-jia" />
          </a>
          <a
            v-else
            :class="[$style.operate, $style.link]"
            @click="remove(item, item.tradePairsConkey, item.exchangeConkey)"
          >
            <icon-font type="icon-shanchu" />
          </a>
        </template>

        <!-- 价格 -->
        <template slot="cnyPrice" slot-scope="value, item">
          <div v-if="activeTabKey === 'CNY'">
            {{ value | money('¥', 4, true) }}
          </div>
          <div v-else-if="activeTabKey === 'USDT'">
            {{
              (value / (item.cnyPrice / item.usdPrice)) | money('$', 4, true)
            }}
          </div>
        </template>

        <!-- 成交量 -->
        <template slot="vol24H" slot-scope="value, item">
          <div v-if="activeTabKey === 'CNY'">
            {{ value | money('¥', 4, true) }}
          </div>
          <div v-else-if="activeTabKey === 'USDT'">
            {{
              (value / (item.cnyPrice / item.usdPrice)) | money('$', 4, true)
            }}
          </div>
        </template>

        <!-- 24h成交额 -->
        <template slot="turnover24H" slot-scope="value, item">
          <div v-if="activeTabKey === 'CNY'">
            {{ value | money('¥', 4, true) }}
          </div>
          <div v-else-if="activeTabKey === 'USDT'">
            {{
              (value / (item.cnyPrice / item.usdPrice)) | money('$', 4, true)
            }}
          </div>
        </template>
        <!-- 成交额占比 -->
        <template slot="turnover24HRadio" slot-scope="value">
          {{ (value * 100).toFixed(2) + '%' }}
        </template>
      </a-table>
      <a-button v-if="!!data.length" block @click="loadMore">
        {{ hvaeMore ? $t('text.more') : $t('text.nomore') }}
      </a-button>
    </a-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    props: {
        dataSources: {
            type: Array,
            default: () => []
        },
        name: {
            type: String,
            default: '--'
        },
        total: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            activeTabKey: 'CNY',
            tabList: [
                {
                    tab: '人民币（CNY）',
                    key: 'CNY'
                },
                {
                    tab: '美元（USD）',
                    key: 'USDT'
                }
            ],
            columns: [
                {
                    title: this.$t('exchange.detail.table.pairs'),
                    dataIndex: 'name',
                    width: 120,
                    scopedSlots: { customRender: 'name' }
                },
                {
                    title: this.$t('exchange.detail.table.price'),
                    dataIndex: 'cnyPrice',
                    width: 140,
                    scopedSlots: { customRender: 'cnyPrice' }
                },
                {
                    title: this.$t('exchange.detail.table.vol'),
                    dataIndex: 'vol24H',
                    scopedSlots: { customRender: 'vol24H' },
                    width: 130
                },
                {
                    title: this.$t('exchange.detail.table.turnover'),
                    dataIndex: 'turnover24H',
                    scopedSlots: { customRender: 'turnover24H' },
                    sorter: true,
                    width: 140
                },
                {
                    title: this.$t('exchange.detail.table.ratio'),
                    width: 110,
                    dataIndex: 'turnover24HRadio',
                    scopedSlots: { customRender: 'turnover24HRadio' }
                },
                {
                    title: this.$t('exchange.detail.table.operation'),
                    width: 60,
                    scopedSlots: { customRender: 'operate' }
                }
            ],
            data: [...this.dataSources],
            remove: (item, tradePairsKey, markeyKey) => {
                if (!this.loggedUser) {
                    this.$message.error('请先登录再移除自选');
                    return;
                }
                this.$currency
                    .delete({
                        tradePairsKey,
                        markeyKey
                    })
                    .then(({ data }) => {
                        if (data) {
                            this.$message.success('移除自选成功', 1);
                            this.$set(item, 'selfFlag', false);
                        } else {
                            this.$message.error('移除自选失败', 1);
                        }
                    });
            },
            add(item, tradePairsKey, markeyKey) {
                if (!this.loggedUser) {
                    this.$message.error('请先登录再添加自选');
                    return;
                }
                this.$currency
                    .add({
                        tradePairsKey,
                        markeyKey
                    })
                    .then(({ data }) => {
                        if (data) {
                            this.$message.success('添加自选成功', 1);
                            this.$set(item, 'selfFlag', true);
                        } else {
                            this.$message.error('添加自选失败', 1);
                        }
                    });
            },
            pageNumber: 1,
            sort: 'desc',
            loading: false
        };
    },
    computed: {
        ...mapGetters(['loggedUser']),
        hvaeMore() {
            return this.data.length !== this.total;
        }
    },
    methods: {
        handleTabChange(key) {
            this.activeTabKey = key;
        },
        loadMore() {
            if (!this.hvaeMore) return;
            this.pageNumber++;
            this.fetch();
        },
        handleTableChange(pagination, filters, sorter) {
            this.pageNumber = 1;
            this.data = [];
            if (JSON.stringify(sorter) !== '{}') {
                const { order } = sorter;
                this.sort = order.replace(/end$/, '');
            }
            this.fetch();
        },
        fetch() {
            const { detail: exchangeConkey } = this.$route.params;
            const { sort } = this;
            this.loading = true;
            this.$exchange
                .detailList({
                    exchangeConkey,
                    pageSize: 10,
                    pageNum: this.pageNumber,
                    sort
                })
                .then(({ data: { list } }) => {
                    this.loading = false;
                    this.data = [...this.data, ...list];
                })
                .catch(() => {
                    this.loading = false;
                });
        }
    }
};
</script>

<style lang="less" module>
.exchangeDetail {
  .link {
    color: #666666;
    font-size: 16px;
    transition: color 0.3s;
    &:hover {
      color: #f79522;
    }
  }
  .come {
    margin-top: 18px;
    display: inline-block;
  }
  .operate {
    margin-left: 10px;
  }
  .name {
    display: flex;
    align-items: center;
    color: #999999;
    font-size: 12px;
    > img {
      width: 24px;
      height: 24px;
    }
    > div {
      margin-left: 5px;
      font-size: 12px;
    }
    .label {
      color: #333333;
      font-size: 16px;
      font-weight: 600;
    }
  }
  :global {
    .ant-table-tbody {
      td {
        color: #333;
      }
    }
    .ant-card-head-wrapper {
      padding-bottom: 6px;
      .ant-card-head-title {
        padding-top: 20px;
      }
    }
    // 表格的排序按钮
    .ant-table-column-sorters {
      display: flex;
      align-items: center;
      > .ant-table-column-sorter {
        position: relative;
        margin-top: 0px;
        margin-left: 10px;
      }
    }
    .ant-tabs .ant-tabs-large-bar .ant-tabs-tab {
      padding: 10px 0px;
    }
    // 加载更多
    .ant-btn-default {
      box-shadow: none;
      border: none;
      height: 40px;
      border-top: 1px solid #eee;
    }
    button[ant-click-animating-without-extra-node]:after {
      border: 0 none;
      opacity: 0;
      animation: none 0 ease 0 1 normal;
    }
  }
}
</style>
