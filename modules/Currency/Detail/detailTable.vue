<template>
  <div ref="scrollToView" :class="$style.exchangeDetail">
    <a-card
      :bordered="false"
      :active-tab-key="activeTabKey"
      :tab-list="tabList"
      :title="$t('coin.detail.pairs')"
      @tabChange="handleTabChange"
    >
      <span slot="extra" :class="$style.come">
        {{ $t('coin.detail.from') }}:aicoin
      </span>
      <a-table
        :columns="columns"
        :data-source="data"
        :pagination="false"
        size="middle"
      >
        <template slot="name" slot-scope="text, item">
          <div :class="$style.name">
            <img v-lazy="item.logo" width="88" height="88" type="crop" alt="Bitcoin infomation" />
            <div :class="$style.trade">
              <div :class="$style.label">{{ item.marketEnName }}</div>
              <div>{{ item.name }}/{{ item.currency }}</div>
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
            v-if="!item.select"
            :class="[$style.operate, $style.link]"
            @click="add(item, item.tradePairsKey, item.market)"
          >
            <icon-font type="icon-jia" />
          </a>
          <a
            v-else
            :class="[$style.operate, $style.link]"
            @click="remove(item, item.tradePairsKey, item.market)"
          >
            <icon-font type="icon-shanchu" />
          </a>
        </template>
        <!-- 成交额占比 -->
        <template slot="turnover24HProportion" slot-scope="text, item">
          {{ (item.turnover24HProportion * 100).toFixed(2) + '%' }}
        </template>
        <!-- 24小时成交额 -->
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
        <!-- 价格 -->
        <template slot="price" slot-scope="value">
          <div v-if="activeTabKey === 'CNY'">
            {{ value | money('¥', 4) }}
          </div>
          <div v-else-if="activeTabKey === 'USDT'">
            {{ value | money('$', 4) }}
          </div>
        </template>
      </a-table>
      <a-button v-if="hvaeMore" block @click="loadMore">
        {{ data.length > 10 ? '收起更多' : '展开更多' }}
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
                    title: this.$t('coin.detail.tab.exchange'),
                    width: 160,
                    scopedSlots: { customRender: 'name' }
                },
                {
                    title: this.$t('coin.detail.tab.price'),
                    dataIndex: 'cnyPrice',
                    sorter: (a, b) => {
                        return b.cnyPrice - a.cnyPrice;
                    },
                    scopedSlots: { customRender: 'price' },
                    width: 120
                },
                {
                    title: this.$t('coin.detail.tab.vol'),
                    dataIndex: 'vol24H',
                    sorter: (a, b) => {
                        return -a.vol24H + b.vol24H;
                    },
                    scopedSlots: { customRender: 'vol24H' },
                    width: 130
                },
                {
                    title: this.$t('coin.detail.tab.turnover'),
                    dataIndex: 'turnover24H',
                    scopedSlots: { customRender: 'turnover24H' },
                    sorter: (a, b) => {
                        return -a.turnover24H + b.turnover24H;
                    },
                    width: 140
                },
                {
                    title: this.$t('coin.detail.tab.ratio'),
                    width: 110,
                    scopedSlots: { customRender: 'turnover24HProportion' }
                },
                {
                    title: this.$t('coin.detail.tab.operation'),
                    width: 60,
                    scopedSlots: { customRender: 'operate' }
                }
            ],
            data: this.dataSources.slice(0, 10),
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
                    .then(() => {
                        this.$message.success('移除自选成功', 1);
                        this.$set(item, 'select', false);
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
                    .then(() => {
                        this.$message.success('添加自选成功', 1);
                        this.$set(item, 'select', true);
                    });
            }
        };
    },
    computed: {
        ...mapGetters(['loggedUser']),
        hvaeMore() {
            return this.dataSources.length > 10;
        }
    },
    methods: {
        handleTabChange(key) {
            this.activeTabKey = key;
            if (key === 'CNY') {
                this.columns.splice(1, 1, {
                    title: '价格',
                    dataIndex: 'cnyPrice',
                    sorter: (a, b) => {
                        return b.cnyPrice - a.cnyPrice;
                    },
                    scopedSlots: { customRender: 'price' },
                    width: 120
                });
            }

            if (key === 'USDT') {
                this.columns.splice(1, 1, {
                    title: '价格',
                    dataIndex: 'usdPrice',
                    sorter: (a, b) => {
                        return b.usdPrice - a.usdPrice;
                    },
                    scopedSlots: { customRender: 'price' },
                    width: 120
                });
            }
        },
        loadMore() {
            if (this.data.length > 10) {
                this.data = this.dataSources.slice(0, 10);
                this.$nextTick(() => {
                    this.$refs.scrollToView.scrollIntoView();
                });
            } else {
                this.data = [...this.dataSources];
            }
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
    > img {
      width: 24px;
      height: 24px;
    }
    .trade {
      margin-left: 6px;
      div {
        font-size: 12px;
      }
      .label {
        color: #333;
        font-size: 16px;
        font-weight: 600;
      }
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
        margin-left: 5px;
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
