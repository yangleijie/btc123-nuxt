<template>
  <div :class="$style.currency">
    <a-table
      :loading="loading"
      :columns="columns"
      :data-source="data"
      :pagination="false"
      :scroll="{ y: 680 }"
      size="middle"
    >
      <!-- 名称 -->
      <template slot="name" slot-scope="text, item">
        <div :class="$style.name">
          <a-avatar
            size="small"
            src="https://btc123.oss-cn-beijing.aliyuncs.com/0f06ef87981a4344ae9f87334f159ef3.png"
          />
          <div>
            <div :class="$style.label">
              <nuxt-link :class="$style.name" to="currency/currencyDetail">
                {{ item.name }}
              </nuxt-link>
              <span v-if="item.ext" :class="$style.pcikTag">严选</span>
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
      <template slot="low" slot-scope="value">
        <div :class="[parseFloat(value) > 0 ? 'rise' : 'fall']">
          {{ value }}
        </div>
      </template>
    </a-table>

    <!-- </a-card> -->
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
            loading: false,
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
                    title: '24h涨跌幅',
                    dataIndex: 'low',
                    sorter: true,
                    width: 160,
                    scopedSlots: { customRender: 'low' }
                },
                {
                    title: '流通占比',
                    dataIndex: 'rate',
                    sorter: true,
                    width: 150
                },
                {
                    title: '价格',
                    dataIndex: 'price',
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
                }
            ],
            data
        };
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
    .ant-table-header {
      margin-bottom: 0px !important;
      overflow: hidden !important;
    }
  }
}
</style>
