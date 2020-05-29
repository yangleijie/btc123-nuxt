<template>
  <a-card
    :bordered="false"
    :head-style="{ borderTop: '2px solid #F79522' }"
    :title="$t('home.hot.title')"
  >
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="false"
      :row-class-name="handleRowClassName"
      size="small"
    />
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
            pagination: {},
            columns: [
                {
                    title: this.$t('home.hot.symbol'),
                    dataIndex: 'currency',
                    customRender: (text, row, i) => {
                        return (
              <a
                href={row.url}
                target="_blank"
                class={this.$style.logo}
                rel="nofollow"
              >
                <img
                  v-lazy={row.logo}
                  width={88}
                  height={88}
                  key={text + '_' + i}
                  alt="btc123交易"
                />
                <span>{text}</span>
              </a>
                        );
                    }
                },
                {
                    title: `${this.$t('home.hot.price')}￥`,
                    dataIndex: 'cnyPrice',
                    align: 'right',
                    customRender: value => {
                        return <span>{this.$money(value, '', 5)}</span>;
                    }
                },
                {
                    title: this.$t('home.hot.change'),
                    dataIndex: 'changeRate',
                    align: 'right',
                    customRender: value => {
                        return <span class={this.$style.color}>{value}%</span>;
                    }
                }
            ]
        };
    },
    methods: {
        handleRowClassName({ changeRate5Min }) {
            const value = changeRate5Min;
            let cls = '';
            if (/^-\d+(.\d+)?$/.test(value)) {
                cls = this.$style.down;
            }
            if (/^\+\d+(.\d+)?$/.test(value)) {
                cls = this.$style.up;
            }
            return cls;
        }
    }
};
</script>
<style lang="less" module>
.logo {
  display: flex;
  align-items: center;
  img {
    width: 16px;
    height: 16px;
    margin-right: 4px;
    border-radius: 8px;
  }
  span {
    color: #101010;
    font-weight: 500;
  }
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
}
</style>
