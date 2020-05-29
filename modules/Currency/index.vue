<template>
  <div :class="$style.currency">
    <div v-if="list.length || serverOrClient === 'server'">
      <div :class="$style.survey">
        <div :class="$style.currencyType">
          <span>{{ $t('coin.symbols') }}</span>
          <div :class="$style.radiowrap">
            <a-radio-group v-model="currencyType" @change="chooseCurrencyType">
              <a-radio :value="2">人民币(CNY)</a-radio>
              <a-radio :value="3">美元(USD)</a-radio>
            </a-radio-group>
          </div>
        </div>
        <div v-if="showHeader" :class="$style.amount">
          <p>
            {{ $t('coin.marketCap') }}:
            <span>
              {{ value | money('', 4, true) }}
            </span>
          </p>
          <p>
            {{ $t('coin.vol') }}:
            <span>
              {{ turnover24H | money('', 4, true) }}
            </span>
          </p>
          <p>
            {{ $t('coin.total', { value: pagination.total || 0 }) }}
          </p>
          <div :class="$style.pagation">
            <a-pagination
              :current="pagination.current"
              :default-page-size="pagination.defaultPageSize"
              :total="pagination.total"
              :hide-on-single-page="true"
              simple
              @change="smallpagination"
            />
          </div>
        </div>
      </div>
      <a-table
        :loading="loading"
        :columns="columns"
        :data-source="list"
        :pagination="pagination"
        size="middle"
        @change="handleTableChange"
      >
        <!-- 名称 -->
        <template slot="name" slot-scope="text, item">
          <div :class="$style.name">
            <img
              :key="item.showName"
              v-lazy="item.logo"
              width="88"
              height="88"
              type="crop"
              alt="比特币概念"
            />
            <div>
              <div :class="$style.label">
                <nuxt-link
                  :class="$style.name"
                  :to="
                    localePath({
                      name: 'currency-detail-detail',
                      params: { detail: item.currencyId }
                    })
                  "
                >
                  {{ item.showName + (item.cnName ? '--' + item.cnName : '') }}
                </nuxt-link>
                <span v-if="item.strict" :class="$style.pcikTag">严选</span>
              </div>
            </div>
          </div>
        </template>
        <!-- 索引 -->
        <template slot="index" slot-scope="index">
          <div :class="[index <= 9 ? 'tag' : 'tagother']">
            {{ index + 1 }}
          </div>
        </template>
        <!-- 24h涨跌幅 -->
        <template slot="changeRate24H" slot-scope="val">
          <div
            :class="[
              parseFloat(val) > 0 ? 'rise' : 'fall',
              !val ? 'removeClass' : ''
            ]"
          >
            {{ val ? val.toFixed(2) + '%' : '0%' }}
          </div>
        </template>
        <!-- 24小时成交额 -->
        <template slot="turnover24H" slot-scope="v, item">
          <div v-if="currencyType === 2">
            {{ v | money('¥', 4, true) }}
          </div>
          <div v-else-if="currencyType === 3">
            {{ (v / (item.cnyPrice / item.usdPrice)) | money('$', 4, true) }}
          </div>
        </template>
        <!-- 价格 -->
        <template slot="price" slot-scope="price">
          <div v-if="currencyType === 2">
            {{ price | money('¥', 4) }}
          </div>
          <div v-else-if="currencyType === 3">
            {{ price | money('$', 4) }}
          </div>
        </template>
        <!-- 币值 -->
        <template slot="value" slot-scope="money, item">
          <div v-if="currencyType === 2">
            {{ money | money('¥', 4, true) }}
          </div>
          <div v-else-if="currencyType === 3">
            {{
              (money / (item.cnyPrice / item.usdPrice)) | money('$', 4, true)
            }}
          </div>
        </template>
      </a-table>
    </div>
    <Empty v-if="!list.length && serverOrClient === 'client'" type="search" />
  </div>
</template>
<script>
import Empty from '~/components/Empty';
export default {
    name: 'CurrencyTable',
    components: {
        Empty
    },
    props: {
        // 控制 跌幅 涨幅 还是其他
        rate: {
            type: Number,
            default: 3
        },
        dataSources: {
            type: Array,
            default: () => []
        },
        page: {
            type: Number,
            default: 1
        },
        size: {
            type: Number,
            default: 50
        },
        amount: {
            type: Number,
            default: 0
        },
        // 24小时总成交额
        turnover: {
            type: Number,
            default: 0
        },
        // 币种市值
        valueProps: {
            type: Number,
            default: 0
        },
        serverOrClient: {
            type: String,
            default: 'client'
        },
        // 搜索时候不显示币种流通市值 成交额 以及上面的分页控制字段
        showHeader: {
            type: Boolean,
            default: true
        },
        // field 排序字段
        fieldProps: {
            default: 1,
            type: Number
        }
    },
    data() {
        return {
            activeTabKey: 'all',
            currencyType: 2,
            loading: false,
            turnover24H: this.turnover, // 24小时成交额
            value: this.valueProps, // 币种总市值
            list: this.dataSources,
            tabList: [
                {
                    tab: '所有',
                    key: 'all'
                },
                // {
                //   tab: '概念行情',
                //   key: 'ETH'
                // },
                {
                    tab: '涨幅榜',
                    key: 'EOS'
                },
                {
                    tab: '跌幅榜',
                    key: 'TV'
                }
            ],
            pagination: {
                size: 'size',
                defaultPageSize: this.size,
                current: this.page,
                total: this.amount,
                hideOnSinglePage: true
            },
            columns: [
                {
                    title: '#',
                    dataIndex: 'index',
                    width: 50,
                    scopedSlots: { customRender: 'index' }
                },
                {
                    title: this.$t('coin.table.symbol'),
                    scopedSlots: { customRender: 'name' },
                    width: 200
                },
                {
                    title: this.$t('coin.table.total'),
                    dataIndex: 'release',
                    width: 150
                },
                {
                    title: this.$t('coin.table.value'),
                    dataIndex: 'value',
                    width: 150,
                    scopedSlots: { customRender: 'value' }
                },
                {
                    title: this.$t('coin.table.price'),
                    dataIndex: 'cnyPrice',
                    width: 150,
                    scopedSlots: { customRender: 'price' }
                },
                {
                    title: this.$t('coin.table.turnover'),
                    dataIndex: 'turnover24H',
                    sorter: true,
                    scopedSlots: { customRender: 'turnover24H' },
                    width: 140
                },
                {
                    title: this.$t('coin.table.change'),
                    dataIndex: 'changeRate24H',
                    align: 'center',
                    width: 140,
                    scopedSlots: { customRender: 'changeRate24H' }
                },
                {
                    title: this.$t('coin.table.platform'),
                    dataIndex: 'exchanges',
                    align: 'center',
                    width: 80
                }
            ],
            sort: 'desc',
            field: this.fieldProps
        };
    },
    watch: {
        // 分页改变的时候通知父组件获取数据
        pagination: {
            handler: function(newV, oldV) {
                console.log(newV, oldV);
                this.fetch();
            },
            deep: false
        }
    },
    created() {
        if (this.serverOrClient === 'server') return;
        this.fetch();
    },
    methods: {
        chooseCurrencyType() {
            if (this.currencyType === 2) {
                // 人民币
                this.columns.splice(4, 1, {
                    title: '价格',
                    dataIndex: 'cnyPrice',
                    width: 150,
                    scopedSlots: { customRender: 'price' }
                });
            } else if (this.currencyType === 3) {
                // 美元
                this.columns.splice(4, 1, {
                    title: '价格',
                    dataIndex: 'usdPrice',
                    width: 150,
                    scopedSlots: { customRender: 'price' }
                });
            }
        },
        // 分页
        handleTableChange(pagination, filters, sorter) {
            this.inintOrder();
            if (!(JSON.stringify(sorter) === '{}')) {
                this.sorter(sorter);
            }
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;
        },
        // 排序
        sorter({ columnKey, order }) {
            this.order = order === 'ascend' ? 'asc' : 'desc';
            if (columnKey === 'turnover24H') {
                this.field = 4; // 24h排行榜 字段
            }
        },
        inintOrder() {
            this.order = 'desc';
            this.field = this.fieldProps;
        },
        smallpagination(current) {
            this.pagination = {
                ...this.pagination,
                current
            };
        },
        fetch() {
            // field：0后台设置的币种 1市值，2人民币价格，3美元价格，4 24小时成交额 5 24小时涨跌幅 6交易所数量
            const { keyword } = this.$route.query;
            this.loading = true;
            const { current, defaultPageSize } = this.pagination;
            const { rate } = this;
            let params = {
                field: this.field,
                origin: 1,
                size: defaultPageSize,
                page: current,
                sort: this.order,
                keyword
            };
            // 判断是否是涨幅榜 跌幅榜
            if ([0, 1].includes(rate)) {
                params = {
                    ...params,
                    rate
                };
            }
            this.$currency
                .list(params)
                .then(({ data: { dataList: { total, list }, turnover24H, value } }) => {
                    this.loading = false;
                    this.total = this.pagination.total = total;
                    this.list = list.map((item, index) => ({
                        ...item,
                        index: index + (current - 1) * defaultPageSize
                    }));
                    this.turnover24H = turnover24H;
                    this.value = value;
                })
                .catch(() => {
                    this.loading = false;
                });
        },
        onSearch() {
            this.pagination.current = 1;
            this.fetch();
        },
        error(item) {
            this.$set(item);
        }
    }
};
</script>

<style lang="less" module>
.currency {
  .textExtra {
    color: #e76653;
  }
  .pcikTag {
    width: 40px;
    height: 18px;
    background: #f79522;
    border-radius: 10px;
    color: #fff;
    text-align: center;
    line-height: 18px;
    font-weight: 300;
    display: inline-block;
    font-size: 12px;
    margin-left: 4px;
  }
  .survey {
    height: 63px;
    line-height: 63px;
    display: flex;
    justify-content: space-between;
    .currencyType {
      display: flex;
      color: #333;
      .radiowrap {
        margin-left: 30px;
      }
    }
    .amount {
      display: flex;
      > p {
        // margin-right: 30px;
        color: #999;
        & + p {
          margin-left: 24px;
        }
        > span {
          color: #666;
        }
      }
      > .pagation {
        display: flex;
        align-items: center;
      }
    }
  }
  .link {
    color: #666666;
    font-size: 16px;
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
    .label {
      display: flex;
      align-items: center;
      > .name {
        color: #333333;
        max-width: 160px;
        display: block;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
        margin-left: 5px;
      }
    }
  }
  :global {
    .ant-table-column-sorters {
      display: flex;
      align-items: center;
      > .ant-table-column-sorter {
        position: relative;
        margin-top: 0px;
        margin-left: 8px;
      }
    }
    .rise {
      color: #6cb45f;
    }
    .fall {
      color: #e76653;
    }
    .tag,
    .tagother {
      background: #d5d7d7;
      display: inline-block;
      padding: 0px 4px;
      height: 15px;
      font-size: 10px;
      color: #fff;
      text-align: center;
      line-height: 15px;
    }
    .ant-table-row {
      &:nth-of-type(1) {
        .tag {
          background: #ff6f2b;
        }
      }
      &:nth-of-type(2) {
        .tag {
          background: #fbb234;
        }
      }
      &:nth-of-type(3) {
        .tag {
          background: #7dd85b;
        }
      }
      &:nth-of-type(n + 4) {
        .tag {
          background: #97cbdc;
        }
      }
      &:nth-of-type(n + 10) {
        .tag {
          background: #d5d7d7;
        }
      }
    }
    .ant-table-tbody {
      td {
        color: #333;
      }
    }
  }
}
</style>
