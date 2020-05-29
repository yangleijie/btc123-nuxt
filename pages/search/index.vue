<template>
  <div class="content">
    <div :class="$style.search">
      <div :class="$style.form">
        <a-input-search
          v-model="keyword"
          :placeholder="$t('search.input')"
          :enter-button="$t('search.submit')"
          @search="onSearch"
        />
        <div v-if="keywords.length">
          <nuxt-link
            v-for="n in keywords"
            :key="n.id"
            :class="$style.tag"
            :to="
              localePath({
                name: 'search',
                query: { ...$route.query, keyword: n.keyWord }
              })
            "
            replace
          >
            {{ n.keyWord }}
          </nuxt-link>
        </div>
      </div>
      <a-tabs
        v-if="loaded"
        :active-key="type"
        :animated="false"
        @change="handleTabChange"
      >
        <a-tab-pane v-for="(n, key) in category" :key="key" :tab="n.name">
          <component :is="n.component" :ref="key" v-bind="n.props" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
import NewsList from '~/modules/NewsList';
import Exchange from '~/modules/Exchange';
import Currency from '~/modules/Currency';
import BigFlash from '~/components/Flash/BigFlash';
const category = {
    news: {
        name: '资讯',
        component: 'NewsList',
        trigger: 'onSearch',
        props: {
            showHeader: false,
            pagination: true
        }
    },
    currency: {
        name: '币种',
        component: 'Currency',
        trigger: 'onSearch',
        props: { showHeader: false, serverOrClient: 'client' }
    },
    exchange: {
        name: '交易平台',
        component: 'Exchange',
        trigger: 'onSearch',
        props: {
            serverOrClient: 'client'
        }
    },
    flash: {
        name: '快讯',
        component: 'BigFlash',
        trigger: 'onSearch',
        props: { isServer: false }
    }
};
const fns = {
    currency: () => {},
    exchange: () => {},
    news: ({ app, query }) => {
        const { keyword } = query;
        if (keyword) {
            return app.$article
                .list({ title: keyword })
                .then(({ data: { total, list } }) => {
                    const props = {
                        data: [{ name: '资讯', loading: false, id: '', list, total }]
                    };
                    return props;
                });
        }
    },
    flash: () => {}
};
export default {
    components: { NewsList, Exchange, Currency, BigFlash },
    data() {
        return {
            keywords: [],
            keyword: ''
        };
    },
    head() {
        return {
            title: '币搜索|BTC123',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: '币搜索,btc123'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content:
                        'BTC123是全球领先的区块链信息服务平台, 提供比特币，以太坊行情数据、区块讯分析、创业孵化、行业峰会、技术扶持等多元产品和优质服务，致力于为区块链创业者以及数字货币爱好者提供最好的产品和服务。'
                }
            ]
        };
    },
    watch: {
        $route({ query }) {
            const { type = 'news', keyword } = query;
            this.type = type;
            this.loaded = true;
            this.keyword = keyword;
            const ref = this.$refs[type] ? this.$refs[type][0] : '';
            const trigger = this.category[type].trigger;
            if (ref && trigger) {
                ref[trigger]();
            }
        }
    },
    asyncData({ app, query, error }) {
        const { type = 'news', keyword } = query;
        category.news.name = app.i18n.t('search.tab.news');
        category.exchange.name = app.i18n.t('search.tab.exchange');
        category.currency.name = app.i18n.t('search.tab.currency');
        category.flash.name = app.i18n.t('search.tab.flash');
        return Promise.all([app.$global.keyword(), fns[type]({ app, query })])
            .then(([keywordData, props = {}]) => {
                category[type].props = {
                    ...category[type].props,
                    ...props
                };
                return {
                    loaded: !!keyword,
                    category,
                    type,
                    keyword,
                    keywords: keywordData.data
                };
            })
            .catch(err => {
                const { message, response = {} } = err;
                return error({ statusCode: response.status, message });
            });
    },
    methods: {
        onSearch(value) {
            if (value) {
                this.change();
            }
        },
        handleTabChange(type) {
            this.type = type;
            this.change();
        },
        change() {
            this.$router.replace({
                name: this.$route.name,
                query: this.$pickBy({
                    ...this.$route.query,
                    keyword: this.keyword,
                    type: this.type
                })
            });
        }
    }
};
</script>
<style lang="less" module>
.search {
  padding: 20px;
  background-color: #fff;
  margin: 20px 0;
  min-height: 500px;
  :global {
    .ant-card {
      margin-top: 0 !important;
      &-body {
        padding: 0 !important;
      }
    }
    // 快讯
    .searchWrap {
      padding: 0px 40px 0px;
      .ant-timeline {
        margin-top: 20px;
      }
    }
    // 交易平台列表
    .search-style {
      .ant-card-head {
        padding: 0px !important;
      }
      .ant-card-head-title {
        flex: 0.6;
      }
    }
  }
}
.form {
  width: 800px;
  margin: 40px auto;
  :global {
    .ant-input {
      padding: 8px 16px;
      height: 60px;
      border-radius: 30px;
      font-size: 16px;
      padding-right: 140px !important;
    }
    .ant-btn {
      height: 60px;
      font-size: 16px;
      border-radius: 30px !important;
      padding-left: 32px;
      padding-right: 32px;
    }
  }
}
.tag {
  margin-top: 8px;
  color: #666666;
  font-size: 14px;
  transition: all 0.5s;
  display: inline-block;
  margin-left: 18px;
  &:hover {
    color: #f79522;
  }
}
</style>
