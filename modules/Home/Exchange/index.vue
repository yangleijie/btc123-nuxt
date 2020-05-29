<template>
  <a-card :bordered="false">
    <a-tabs>
      <a-tab-pane v-for="n in data" :key="n.currency" :tab="n.currency">
        <div>
          <a-table
            v-if="n.type === 'exchange'"
            :columns="columns2"
            :data-source="n.exchangeList"
            :pagination="false"
            :row-class-name="handleRowClassName"
            size="middle"
          >
            <template slot="name" slot-scope="logo, item">
              <a
                :class="$style.name"
                :href="item.url"
                target="_blank"
                rel="nofollow"
              >
                <div :class="$style.img">
                  <img
                    :key="item.chartKey"
                    v-lazy="item.logo"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURUxpcU3H2DoAAAABdFJOUwBA5thmAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg=="
                    width="88"
                    height="88"
                    type="crop"
                    alt="比特币涨跌"
                  />
                </div>
                <div style="margin-left: 8px;">
                  <div :class="$style.label">
                    {{ item.tradeType }}/{{ item.currency }}
                  </div>
                  <div>
                    {{ n.currency }}
                  </div>
                </div>
              </a>
            </template>
          </a-table>
          <a-table
            v-else
            :columns="columns"
            :data-source="n.exchangeList"
            :pagination="false"
            :row-class-name="handleRowClassName"
            size="middle"
          >
            <template slot="name" slot-scope="logo, item">
              <div :class="$style.name">
                <div :class="$style.img">
                  <img
                    :key="item.chartKey"
                    v-lazy="item.logo"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURUxpcU3H2DoAAAABdFJOUwBA5thmAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg=="
                    width="88"
                    height="88"
                    type="crop"
                    alt="比特币涨跌"
                  />
                </div>
                <div style="margin-left: 8px;">
                  <div :class="$style.label">
                    {{ item.marketCnName || item.marketEnName }}
                  </div>
                  <div>{{ item.name }}/{{ item.currency }}</div>
                </div>
              </div>
            </template>
          </a-table>
        </div>
      </a-tab-pane>
      <nuxt-link
        slot="tabBarExtraContent"
        :to="localePath({ name: 'currency-index' })"
        :class="$style.more"
      >
        {{ $t('text.more') }}
      </nuxt-link>
    </a-tabs>
  </a-card>
</template>
<script>
export default {
    props: {
        dataSource: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            columns2: [
                {
                    title: this.$t('exchange.detail.pairs'),
                    dataIndex: 'logo',
                    scopedSlots: { customRender: 'name' }
                },
                {
                    title: `￥${this.$t('exchange.detail.table.price')}`,
                    dataIndex: 'cnyPrice',
                    align: 'center',
                    customRender: value => {
                        return (
              <div class={this.$style.color}>
                <span>{value}</span>
                <a-icon type="arrow-up" style="display:none;" />
                <a-icon type="arrow-down" style="display:none;" />
              </div>
                        );
                    }
                },
                {
                    title: `24H ${this.$t('exchange.detail.table.vol')}`,
                    dataIndex: 'vol24H',
                    align: 'center'
                },
                {
                    title: `24H ${this.$t('coin.detail.high')}`,
                    dataIndex: 'cnyHigh24H',
                    align: 'center'
                },
                {
                    title: `24H ${this.$t('coin.detail.low')}`,
                    dataIndex: 'cnyLow24H',
                    align: 'center'
                },
                {
                    title: this.$t('coin.table.change'),
                    dataIndex: 'change24H',
                    align: 'center',
                    customRender: value => {
                        return <span>{value}%</span>;
                    }
                }
            ],
            columns: [
                {
                    title: this.$t('home.platform.name'),
                    dataIndex: 'name',
                    scopedSlots: { customRender: 'name' }
                },
                {
                    title: `${this.$t('home.platform.lastPrice')}￥`,
                    dataIndex: 'cnyPrice',
                    align: 'center',
                    width: 130,
                    customRender: value => {
                        return (
              <div class={this.$style.color}>
                <span>{value}</span>
                <a-icon type="arrow-up" style="display:none;" />
                <a-icon type="arrow-down" style="display:none;" />
              </div>
                        );
                    }
                },
                {
                    title: this.$t('home.platform.change'),
                    dataIndex: 'changeRate5Min',
                    align: 'center',
                    width: 130,
                    customRender: value => {
                        return <span>{value}%</span>;
                    }
                },
                {
                    title: this.$t('home.platform.change24H'),
                    dataIndex: 'changeRate24H',
                    align: 'center',
                    width: 120,
                    customRender: value => {
                        return <span>{value}%</span>;
                    }
                },
                {
                    title: this.$t('home.platform.turnover'),
                    dataIndex: 'turnover24H',
                    align: 'center',
                    minWidth: 120,
                    customRender: value => {
                        return <span>{this.$money(value, '')}</span>;
                    }
                },
                {
                    title: this.$t('home.platform.vol'),
                    dataIndex: 'vol24H',
                    align: 'center',
                    width: 120,
                    customRender: value => {
                        return <span>{this.$money(value, '', 0)}</span>;
                    }
                }
                // {
                //   title: 'K线',
                //   width: 60,
                //   align: 'center',
                //   scopedSlots: { customRender: 'link' }
                // }
            ],
            data: this.dataSource
        };
    },
    watch: {
        dataSource(newValue, oldValue) {
            newValue.map((n, i) => {
                if (n.exchangeList) {
                    n.exchangeList.map((item, index) => {
                        const list = oldValue[i] && oldValue[i].exchangeList;
                        const data = list && list[index];
                        if (data) {
                            if (item.cnyPrice > data.cnyPrice) {
                                item.className = this.$style.up;
                            } else if (item.cnyPrice < data.cnyPrice) {
                                item.className = this.$style.down;
                            } else {
                                item.className = data.className;
                            }
                        }
                    });
                }
            });
            this.data = newValue;
        }
    },
    methods: {
        handleRowClassName({ className }) {
            return [className, this.$style.rowname];
        }
    }
};
</script>

<style lang="less" module>
.rowname {
  td {
    padding: 6px 8px !important;
  }
}
.more {
  color: #999999;
  display: block;
  margin-top: 8px;
}
.link {
  color: #666666;
  font-size: 20px;
}
.name {
  display: flex;
  align-items: center;
  font-size: 12px;
  .label {
    color: #333333;
    font-size: 16px;
    font-weight: 600;
  }
  div {
    color: #999999;
  }
}
.color {
  text-align: center;
}
.up {
  &:hover {
    :global {
      td {
        background-color: #f2faf2 !important;
      }
    }
  }
  .color {
    color: #6cb45f;
  }
  :global {
    .anticon-arrow-up {
      margin-left: 8px;
      display: inline-block !important;
    }
  }
}
.down {
  &:hover {
    :global {
      td {
        background-color: #fff6f5 !important;
      }
    }
  }
  .color {
    color: #e76653;
  }
  :global {
    .anticon-arrow-down {
      margin-left: 8px;
      display: inline-block !important;
    }
  }
}
.img {
  width: 24px;
  height: 24px;
  overflow: hidden;
  border-radius: 12px;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
