<template>
  <div :class="$style.currency">
    <div :class="$style.survey">
      <div :class="$style.currencyType">
        <span>数字货币列表</span>
        <div :class="$style.radiowrap">
          <a-radio-group
            v-model="currencyType"
            @change="chooseCurrencyType">
            <a-radio :value="1">人民币(CNY)</a-radio>
            <a-radio :value="2">美元(USD)</a-radio>
          </a-radio-group>
        </div>
      </div>
      <div :class="$style.amount">
        <p>
          币种流通总市值(亿)
          <span>
            34590.89
          </span>
        </p>
        <p>
          24H交易总额(亿)
          <span>
            34590.89
          </span>
        </p>
        <p>
          共1374个币种
        </p>
        <div :class="$style.pagation">
          <a-pagination
            :current="pagination.current"
            :default-page-size="pagination.defaultPageSize"
            :total="100"
            simple
            @change="smallpagination" />
        </div>
      </div>
    </div>
    <a-table
      :loading="loading"
      :columns="columns"
      :data-source="data"
      :pagination="pagination"
      size="middle"
      @change="handleTableChange">
      <!-- 名称 -->
      <template
        slot="name"
        slot-scope="text, item">
        <div :class="$style.name">
          <a-avatar
            size="small"
            src="https://btc123.oss-cn-beijing.aliyuncs.com/0f06ef87981a4344ae9f87334f159ef3.png" />
          <div>
            <div :class="$style.label">
              <nuxt-link
                :class="$style.name"
                :to="`/currency/${item.index}`">{{ item.name }}</nuxt-link >
              <span
                v-if="item.ext"
                :class="$style.pcikTag">严选</span>
            </div>
          </div>
        </div>
      </template>
      <!-- 索引 -->
      <template
        slot="index"
        slot-scope="index">
        <div :class="[index<=9 ? 'tag':'tagother']">
          {{ index+1 }}
        </div>
      </template>
      <!-- 24h涨跌幅 -->
      <template
        slot="low"
        slot-scope="value">
        <div :class="[ parseFloat(value) > 0 ? 'rise':'fall' ]">
          {{ value }}
        </div>
      </template>
    </a-table>
  </div>

</template>
<script>
export default {
    data() {
        const data = Array.from({ length: 100 }).map((i, k) => ({
            index: k,
            ext: k % 11 === 0,
            name: `货币全球站货币全球站货币全球站货币全球站-${k}`,
            done: 5678374,
            liutongliang: k,
            rate: k % 100,
            price: k * 10,
            coinPrice: k * 10,
            high: k / 10,
            amount: k / 100,
            low: k % 2 === 0 ? `${k + 20}%` : `${k - 110}%`,
            platform: k / 2
        }));
        return {
            activeTabKey: 'all',
            currencyType: '1',
            loading: false,
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
                defaultPageSize: 35,
                current: 1,
                total: 0
            },
            columns: [
                {
                    title: '#',
                    dataIndex: 'index',
                    width: 65,
                    scopedSlots: { customRender: 'index' }
                },
                {
                    title: '币种',
                    dataIndex: 'name',
                    scopedSlots: { customRender: 'name' },
                    sorter: true,
                    width: 200
                },
                {
                    title: '总发行量',
                    dataIndex: 'done',
                    sorter: true,
                    width: 150
                },
                {
                    title: '流通量',
                    dataIndex: 'liutongliang',
                    sorter: true,
                    width: 130
                },
                {
                    title: '流通占比',
                    dataIndex: 'rate',
                    sorter: true,
                    width: 150
                },
                {
                    title: '币值',
                    dataIndex: 'high',
                    sorter: true,
                    width: 100
                },
                {
                    title: '价格',
                    dataIndex: 'coinPrice',
                    sorter: true,
                    width: 100
                },
                {
                    title: '24h成交额',
                    dataIndex: 'amount',
                    sorter: function(a, b) {
                        return -a.amount + b.amount;
                    },
                    width: 160
                },
                {
                    title: '24h涨跌幅',
                    dataIndex: 'low',
                    sorter: true,
                    width: 160,
                    scopedSlots: { customRender: 'low' }
                },
                {
                    title: '交易所',
                    dataIndex: 'platform',
                    sorter: true,
                    width: 125
                }
            ],
            data
        };
    },
    methods: {
        chooseCurrencyType(e) {
            console.log(e.target.value);
        },
        // 分页
        handleTableChange(pagination, filters, sorter) {
            console.log(pagination, filters, sorter);
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;
        },
        smallpagination(current, pagesize) {
            console.log(current, pagesize);
            this.pagination = {
                ...this.pagination,
                current
            };
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
    display: inline-block;
    font-size: 12px;
    margin-left: 3px;
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
        margin-right: 30px;
        color: #999;
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
    .label {
      display: flex;
      align-items: center;
      > .name {
        color: #333333;
        width: 100px;
        display: block;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
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
        margin-left: 5px;
      }
    }
    .rise {
      color: #6cb45f;
    }
    .fall {
      color: #e76653;
    }
  }
}
</style>
