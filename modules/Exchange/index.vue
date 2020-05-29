<template>
  <div :class="[$style.exchange, 'search-style']">
    <div v-if="data.length || serverOrClient === 'server'">
      <a-card :bordered="false" :title="$t('exchange.title')">
        <div slot="extra" :class="$style.select">
          <a-select
            v-model="query.countryCode"
            size="large"
            style="width: 180px"
            dropdown-class-name="beauty-scroll"
            @change="handleChange"
          >
            <a-select-option
              v-for="(item, index) in countryListData"
              :key="index"
              :value="item.alpha2"
            >
              {{ item.countryNameCn }}
            </a-select-option>
          </a-select>
        </div>
        <a-table
          :loading="loading"
          :columns="columns"
          :data-source="data"
          :pagination="pagination"
          size="middle"
          @change="handleTableChange"
        >
          <template slot="name" slot-scope="text, item">
            <nuxt-link :class="$style.name" :to="`/exchange/${item.key}`">
              <img
                :key="item.englishName"
                v-lazy="item.flagLogo"
                width="88"
                height="88"
                type="crop"
                alt="比特币网络"
              />
              <div>
                <div :class="$style.label">
                  {{ item.englishName }}
                  <span v-if="item.ext" :class="$style.pickTag">严选</span>
                </div>
              </div>
            </nuxt-link>
          </template>
          <template slot="index" slot-scope="value">
            <div :class="[value <= 10 ? 'tag' : 'tagother']">
              {{ value + 1 }}
            </div>
          </template>

          <template slot="amount" slot-scope="text">
            <span :class="$style.textExtra">
              {{ text | money('¥', 4, true) }}
            </span>
          </template>
          <!-- 交易类型 -->
          <template slot="labelList" slot-scope="value">
            <div>
              {{ value && value.length ? value.slice(0, 3).join(',') : '--' }}
            </div>
          </template>
        </a-table>
      </a-card>
    </div>
    <Empty v-if="!data.length && serverOrClient === 'client'" type="search" />
  </div>
</template>
<script>
import Empty from '~/components/Empty';

export default {
    components: {
        Empty
    },
    props: {
        dataSource: {
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
        total: {
            type: Number,
            default: 0
        },
        serverOrClient: {
            type: String,
            default: 'server'
        }
    },
    data() {
        return {
            loading: false,
            pagination: {
                size: 'size',
                total: this.total,
                current: this.page,
                hideOnSinglePage: true,
                defaultPageSize: this.size
            },
            columns: [
                {
                    title: '#',
                    dataIndex: 'index',
                    width: 60,
                    scopedSlots: { customRender: 'index' }
                },
                {
                    title: this.$t('exchange.table.platform'),
                    dataIndex: 'englishName',
                    scopedSlots: { customRender: 'name' },
                    width: 150
                },
                {
                    title: this.$t('exchange.table.turnover'),
                    dataIndex: 'cnyTurnover24H',
                    align: 'left',
                    sorter: true,
                    width: 140,
                    scopedSlots: { customRender: 'amount' }
                },
                {
                    title: this.$t('exchange.table.type'),
                    dataIndex: 'labelList',
                    align: 'left',
                    width: 150,
                    scopedSlots: { customRender: 'labelList' }
                },
                {
                    title: this.$t('exchange.table.pairs'),
                    dataIndex: 'tradePairs',
                    align: 'center',
                    width: 60
                },
                {
                    title: this.$t('exchange.table.nation'),
                    dataIndex: 'countryNameCn',
                    align: 'center',
                    width: 140
                }
            ],
            data: this.dataSource,
            query: {
                countryCode: 'allcoin',
                sort: 'desc'
            },
            countryListData: [
                {
                    countryNameCn: this.$t('exchange.table.global'),
                    alpha2: 'allcoin'
                }
            ]
        };
    },
    mounted() {
        this.getCountry();
        if (this.serverOrClient === 'server') return;
        this.fetch();
    },
    methods: {
        fetch() {
            this.loading = true;
            const { keyword } = this.$route.query;
            const { defaultPageSize, current } = this.pagination;
            const { countryCode, sort } = this.query;
            const params = {
                pageNum: current,
                pageSize: defaultPageSize,
                countryCode: countryCode === 'allcoin' ? '' : countryCode,
                keyword,
                sort
            };
            this.$exchange
                .list(params)
                .then(({ data: { list, total } }) => {
                    this.loading = false;
                    this.data = list.map((item, index) => ({
                        ...item,
                        index: index + (current - 1) * defaultPageSize
                    }));
                    this.pagination.total = total;
                })
                .catch(() => {
                    this.loading = false;
                });
        },
        getCountry() {
            this.$global.country().then(({ data }) => {
                this.countryListData = [...this.countryListData, ...data];
            });
        },
        handleTableChange(pagination, filter, sorter) {
            if (JSON.stringify(sorter) !== '{}') {
                const { order } = sorter;
                this.query.sort = order.replace(/end$/, '');
            }
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;
            this.fetch();
        },
        handleChange() {
            this.pagination.current = 1; // 切换国家分页置换为1
            this.fetch();
        },
        onSearch() {
            this.pagination.current = 1;
            this.query.countryCode = 'allcoin';
            this.fetch();
        }
    }
};
</script>

<style lang="less" module>
.exchange {
  .more {
    position: absolute;
    top: 20px;
    right: 20px;
    color: #999999;
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
      color: #333333;
      font-size: 14px;
      margin-left: 4px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .textExtra {
    color: #e76653;
  }
  .pickTag {
    width: 40px;
    height: 18px;
    background: #f79522;
    border-radius: 10px;
    color: #fff;
    text-align: center;
    line-height: 18px;
    display: inline-block;
    font-size: 12px;
    font-weight: 300;
    margin-left: 3px;
  }
  :global {
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
    .ant-card-head-title {
      flex: 0 0 auto;
    }
    // 下拉框
    .ant-card-extra {
      flex: 1 1 auto;
      .ant-select {
        float: left;
      }
    }
  }
  :global {
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
    .ant-select-selection {
      display: flex;
      margin-top: 3px;
      align-items: center;
    }
    .ant-select-arrow {
      position: static;
      margin-top: 0px;
      margin-left: -10px;
      margin-top: 3px;
      font-size: 14px;
    }
    .ant-select-selection-selected-value {
      padding-right: 10px;
      color: #333;
      font-size: 16px;
    }
    .ant-select-selection--single {
      border: none;
    }
    .ant-select-open .ant-select-selection {
      box-shadow: none;
    }
    .ant-select-focused .ant-select-selection,
    .ant-select-selection:focus,
    .ant-select-selection:active {
      box-shadow: none;
    }
  }
}
// 美化下拉框的滚动条
:global {
  .beauty-scroll {
    border-radius: 0px;
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      // border-radius: 10px;
      box-shadow: inset 0 0 5px #999999;
      background: #535353;
    }
    ::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px #eeeeee;
      // border-radius: 10px;
      background: #ededed;
    }
  }
}
</style>
